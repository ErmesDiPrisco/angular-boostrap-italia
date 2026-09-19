import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import yaml from 'js-yaml';

const root = fileURLToPath(new URL('..', import.meta.url));
const skill = resolve(root, 'angular-bootstrap-italia');
assert.equal(await readFile(resolve(root, 'LICENSE'), 'utf8'), await readFile(resolve(skill, 'LICENSE'), 'utf8'), 'installed license matches root license');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = await Promise.all(entries.filter(e => !['node_modules', '.git', '.generated', '.installation'].includes(e.name)).map(e =>
    e.isDirectory() ? walk(resolve(dir, e.name)) : [resolve(dir, e.name)]));
  return results.flat();
}
const files = (await walk(root)).filter(p => p.endsWith('.md'));
const entry = await readFile(resolve(skill, 'SKILL.md'), 'utf8');
const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(entry);
assert.ok(frontmatter, 'YAML frontmatter starts the skill');
const metadata = yaml.load(frontmatter[1]);
assert.ok(metadata && typeof metadata === 'object' && !Array.isArray(metadata));
assert.equal(metadata.name, basename(skill));
assert.match(metadata.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
assert.ok(metadata.name.length <= 64);
assert.ok(typeof metadata.description === 'string' && metadata.description.length > 0 && metadata.description.length <= 1024);
assert.ok(typeof metadata.compatibility === 'string' && metadata.compatibility.length <= 500);
assert.ok(Object.values(metadata.metadata).every(v => typeof v === 'string'));
const allowed = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
assert.ok(Object.keys(metadata).every(k => allowed.has(k)), 'spec-compatible frontmatter fields');
const external = new Set();
let linkCount = 0;
for (const file of files) {
  const content = await readFile(file, 'utf8');
  assert.ok(!content.includes('\uFFFD'), `${file}: UTF-8 replacement characters`);
  assert.ok(!/\b(?:TODO|TBD|FIXME)\b|<OWNER>|<owner>|future work|example\.com/i.test(content), `${file}: unfinished content`);
  let fence = false;
  let headings = [];
  for (const line of content.split(/\r?\n/)) {
    if (/^```/.test(line)) { fence = !fence; continue; }
    if (!fence && /^#{1,6} /.test(line)) headings.push(line);
  }
  assert.equal(fence, false, `${file}: closed code fences`);
  assert.equal(headings.filter(h => /^# /.test(h)).length, 1, `${file}: one top-level heading`);
  for (const match of content.matchAll(/\[[^\]\n]*\]\(([^\s)]+)\)/g)) {
    const link = match[1];
    if (/^https?:/.test(link)) { external.add(link); continue; }
    if (link.startsWith('#')) continue;
    const target = resolve(dirname(file), decodeURIComponent(link.split('#')[0]));
    assert.ok((await stat(target).catch(() => null))?.isFile(), `${relative(root, file)}: missing ${link}`);
    ++linkCount;
  }
}
for (const path of ['LICENSE', 'README.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'AUDIT.md']) {
  assert.ok((await stat(resolve(root, path))).isFile(), `required distribution document: ${path}`);
}
console.log(`PASS: frontmatter/spec, ${files.length} Markdown files, ${linkCount} local links, fences, headings and unfinished-content scan`);
if (process.argv.includes('--links')) {
  const queue = [...external];
  const failures = [];
  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      try {
        const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(25000) });
        await response.body?.cancel();
        if (!response.ok) failures.push(`${response.status} ${url}`);
      } catch (error) { failures.push(`${error.message} ${url}`); }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  assert.deepEqual(failures, [], 'External links must resolve; check network restrictions separately');
  console.log(`PASS: ${external.size} external source/documentation links`);
}
