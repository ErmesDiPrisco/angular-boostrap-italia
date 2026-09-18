import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));
await mkdir('.generated', { recursive: true });
const examples = ['simple-wrapper', 'customizable-wrapper', 'interactive-wrapper', 'carousel', 'modal', 'forms'];
for (const name of examples) {
  const md = await readFile(`../angular-bootstrap-italia/examples/${name}.md`, 'utf8');
  const blocks = [...md.matchAll(/^```ts\r?\n([\s\S]*?)^```/gm)];
  if (blocks.length !== 1) throw new Error(`${name}: expected one complete TypeScript module`);
  await writeFile(`.generated/${name}.ts`, blocks[0][1]);
}
await copyFile('fixture.ts', '.generated/fixture.ts');
await writeFile('.generated/tsconfig.json', JSON.stringify({
  compilerOptions: {
    target: 'ES2022', module: 'ES2022', moduleResolution: 'bundler',
    lib: ['ES2022', 'DOM'], strict: true, experimentalDecorators: true,
    skipLibCheck: true, outDir: './compiled',
  },
  angularCompilerOptions: { strictTemplates: true, strictInjectionParameters: true },
  files: [...examples.map(name => `${name}.ts`), 'fixture.ts'],
}, null, 2));
execFileSync(process.execPath, ['node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js', '-p', '.generated/tsconfig.json'], { stdio: 'inherit' });
await build({
  entryPoints: ['.generated/compiled/fixture.js'], outdir: '.generated/browser',
  bundle: true, splitting: true, format: 'esm', platform: 'browser', target: 'es2022',
  minify: true, sourcemap: true,
});
await copyFile('node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css', '.generated/browser/bootstrap-italia.css');
await writeFile('.generated/browser/index.html', '<!doctype html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Skill validation</title><link rel="stylesheet" href="bootstrap-italia.css"><style>main{max-width:900px;margin:4rem auto;padding:3rem}app-bi-text-field{display:block;margin-top:3rem}</style></head><body><app-audit></app-audit><script type="module" src="fixture.js"></script></body></html>');
console.log('Six Markdown modules: Angular AOT + strict TypeScript/templates + browser bundle PASS');
