# Contributing

Keep the skill Angular-first and Bootstrap Italia-based. Changes belong in this repository, unlike the upstream Angular Skills project's own contribution routing. Preserve user scope, installed-version awareness, the read-only dependency boundary and the six-part STOP rule.

## Source evidence

For each changed component contract, record the exact official Bootstrap Italia page, installed/tested version and relevant public exports/typings. Read source/SCSS only for analysis. A type declaration or underscore field does not prove a public runtime API. Mark source observations separately from documented promises. Do not paste third-party implementations into the skill.

Examples must contain complete, strictly typed Angular modules, an explicit version baseline and their integration limitations. Use public APIs and external styling. Update the catalog and references only where the change actually affects their guidance; keep detailed examples out of `SKILL.md`.

## Reproducible checks

From the repository root, with a supported Node.js version (the audit used Node 24.12.0):

```bash
npm --prefix validation ci --ignore-scripts
npm --prefix validation run check
npm --prefix validation run build
```

The build extracts TypeScript directly from the six example Markdown files and runs Angular `ngc` with strict TypeScript and template checking. It bundles a browser fixture; no Angular library is generated. `skipLibCheck` excludes third-party declaration internals, not the example modules. The small esbuild fixture loads the Angular compiler for partially compiled Angular dependencies instead of implementing the Angular CLI linker.

Install Playwright's Chromium if a compatible browser is not already available, then run the browser checks:

```bash
npm --prefix validation exec -- playwright install chromium
npm --prefix validation test
```

Alternatively, on Windows with Edge installed:

```powershell
$env:BROWSER_CHANNEL = 'msedge'
npm --prefix validation test
```

Generated bundles, screenshots and the axe report stay in ignored `validation/.generated/`. The test server binds only to loopback and closes after testing. Neither validation packages nor generated artifacts are installed with the skill.

Check external links when network access is available:

```bash
npm --prefix validation run check -- --links
```

Check actual CLI discovery without installation:

```bash
npx skills@1.7.0 add . --list
npx skills@1.7.0 add https://github.com/ErmesDiPrisco/angular-boostrap-italia --list
```

For an installation smoke test use an isolated test project, not a personal/global skills directory. Install the local checkout with `--skill angular-bootstrap-italia --agent codex --copy --yes`, run `skills list`, compare the installed files, then remove only that test installation. Do not interpret a remote test of an older pushed commit as validation of unpushed changes.

## Review before publishing

Run the checks affected by the change, inspect the Markdown and update [CHANGELOG.md](CHANGELOG.md). Record versions, executed checks and remaining application-specific validation in [AUDIT.md](AUDIT.md). Browser-only success does not establish SSR/hydration support or full screen-reader compatibility. Avoid claiming those were tested unless they were.

The [Agent Skills specification](https://agentskills.io/specification) allows `compatibility` in frontmatter. Older validators may omit that field from their allowlist; do not remove a valid field merely to satisfy an outdated validator. The repository validator and actual CLI parsing are the reproducible checks here.
