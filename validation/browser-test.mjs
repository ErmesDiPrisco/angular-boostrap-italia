import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));
const root = resolve('.generated/browser');
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const path = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const content = await readFile(path);
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[extname(path)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime }); res.end(content);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {});
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => { errors.push(error.message); console.error('Browser error:', error.message); });
  page.on('console', message => { if (message.type() === 'error') console.error('Browser console:', message.text()); });
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.waitForFunction(() => window.audit && document.querySelector('#services.is-initialized') && !document.querySelector('#navigation').disabled);
  await page.locator('app-bi-button').first().click();
  assert.equal(await page.locator('#clicks').textContent(), '1');
  await page.evaluate(() => window.audit.disabled.set(true));
  await page.waitForFunction(() => document.querySelector('app-bi-button button').disabled);
  assert.equal(await page.locator('app-bi-actions button').last().isDisabled(), true);

  await page.locator('#navigation').focus();
  await page.keyboard.press('ArrowDown');
  await page.waitForFunction(() => document.activeElement?.textContent?.includes('Servizio'));
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#navigation').getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator('#dropdown-events').textContent(), '2');

  await page.locator('#launch').click();
  await page.waitForSelector('#details.show');
  assert.equal(await page.locator('#details').getAttribute('role'), 'dialog');
  assert.equal(await page.locator('#details').getAttribute('aria-modal'), 'true');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !window.audit.opened() && !document.body.classList.contains('modal-open'));
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'launch');
  assert.equal(await page.locator('.modal-backdrop').count(), 0);

  await page.locator('#name').fill('Ada');
  await page.locator('#name').blur();
  assert.deepEqual(await page.evaluate(() => [window.audit.name.value, window.audit.name.dirty, window.audit.name.touched]), ['Ada', true, true]);
  await page.evaluate(() => { window.audit.name.reset(); window.audit.name.markAsTouched(); });
  await page.waitForSelector('#name-error');
  assert.equal(await page.locator('#name').getAttribute('aria-describedby'), 'name-help name-error');
  await page.evaluate(() => window.audit.name.disable());
  await page.waitForFunction(() => document.querySelector('#name').disabled);
  await page.evaluate(() => { window.audit.name.enable(); window.audit.name.setValue('Grace'); });
  await page.waitForFunction(() => document.querySelector('#name').value === 'Grace');

  const widths = [[1280, 2], [900, 2], [600, 1], [1280, 2]];
  for (const [width, expected] of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await page.waitForFunction(expected => {
      const root = document.querySelector('#services');
      return root.querySelectorAll('.splide__slide.is-visible').length === expected;
    }, expected);
    const geometry = await page.locator('#services').evaluate(root => {
      const track = root.querySelector('.splide__track').getBoundingClientRect();
      return [...root.querySelectorAll('.splide__slide.is-visible')].map(slide => {
        const box = slide.getBoundingClientRect();
        return box.left >= track.left - 1 && box.right <= track.right + 1;
      });
    });
    assert.ok(geometry.every(Boolean), `visible slides fit at ${width}`);
  }
  await page.locator('#services .splide__arrow--next').click();
  await page.waitForFunction(() => document.querySelectorAll('#services .splide__slide')[1].classList.contains('is-active'));
  assert.ok(await page.locator('#services .splide__pagination__page').count() > 1);
  await page.locator('#services .splide__pagination__page').first().click();
  await page.waitForFunction(() => document.querySelector('#services .splide__slide').classList.contains('is-active'));
  const box = await page.locator('#services .splide__track').boundingBox();
  await page.mouse.move(box.x + box.width * .8, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * .2, box.y + box.height / 2, { steps: 20 });
  await page.mouse.up();
  await page.waitForFunction(() => !document.querySelector('#services .splide__slide').classList.contains('is-active'));

  for (const count of [0, 1, 2, 3, 5, 6]) {
    await page.evaluate(count => window.audit.items.set(window.audit.makeItems(count)), count);
    await page.waitForFunction(count => count === 0 ? !document.querySelector('#services') :
      document.querySelector('#services.is-initialized')?.querySelectorAll('.splide__slide').length === count, count);
    if (count) assert.equal(await page.locator('#services .splide__arrows').count(), 1);
  }

  for (let cycle = 0; cycle < 3; cycle++) {
    await page.locator('#launch').click();
    await page.waitForSelector('#details.show');
    await page.evaluate(() => window.audit.mounted.set(false));
    await page.waitForFunction(() => !document.querySelector('#details') && !document.querySelector('#services'));
    assert.equal(await page.locator('.modal-backdrop').count(), 0);
    assert.equal(await page.evaluate(() => document.body.classList.contains('modal-open')), false);
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    await page.evaluate(() => { window.audit.opened.set(false); window.audit.mounted.set(true); });
    await page.waitForSelector('#services.is-initialized');
    const before = Number(await page.locator('#dropdown-events').textContent());
    await page.locator('#navigation').click();
    await page.keyboard.press('Escape');
    await page.waitForFunction(expected => Number(document.querySelector('#dropdown-events').textContent) === expected, before + 2);
    assert.equal(Number(await page.locator('#dropdown-events').textContent()), before + 2);
  }
  const relationships = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
    const missing = [];
    for (const el of document.querySelectorAll('[aria-controls],[aria-labelledby],[aria-describedby],label[for]')) {
      for (const attr of ['aria-controls', 'aria-labelledby', 'aria-describedby', 'for']) {
        for (const id of (el.getAttribute(attr) || '').split(/\s+/).filter(Boolean)) {
          if (!document.getElementById(id)) missing.push(id);
        }
      }
    }
    return { duplicates: ids.filter((id, index) => ids.indexOf(id) !== index), missing };
  });
  assert.deepEqual(relationships, { duplicates: [], missing: [] });
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  await page.screenshot({ path: '.generated/wrappers.png', fullPage: true });
  await import('node:fs/promises').then(fs => fs.writeFile('.generated/axe.json', JSON.stringify(axe.violations, null, 2)));
  assert.deepEqual(axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), []);
  assert.deepEqual(errors, []);
  console.log('PASS: real Angular wrappers, button/disabled, Router dropdown keyboard/events, modal Escape/focus/open destruction, CVA, carousel counts/resize/navigation/drag/dynamic data, three recreation cycles, IDs/ARIA, axe');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
