# Technical and structural audit

Audit date: 2026-09-18. Repository: [ErmesDiPrisco/angular-boostrap-italia](https://github.com/ErmesDiPrisco/angular-boostrap-italia). Skill: `angular-bootstrap-italia`, version 1.1.0.

## Initial findings

The starting tree contained README, SKILL.md, ten references and seven example documents inside an extra `angular-bootstrap-italia-skill/` directory. It had no LICENSE, CONTRIBUTING or CHANGELOG. The skill declared MIT without a license file. The catalog was a paragraph listing components, and the example files were mostly integration advice rather than executable Angular modules.

The previous Accordion mapping bound Angular's `show`/`collapsed` state while also delegating toggling to Bootstrap Italia. The initialization rules incorrectly banned every combination of data attributes and a retained instance. Version, SSR, asynchronous import cancellation and teardown guidance needed greater precision. Carousel advice did not establish the actual configuration bridge or constructor signature. The README used an unassigned owner and repository name instead of the real published URL.

## Corrections

- Flattened the project to repository-root documentation and `angular-bootstrap-italia/SKILL.md`, following the directory-per-skill model in Angular Skills. The `skills` CLI discovers this layout.
- Replaced owner/repository tokens in installation instructions with the actual GitHub URL. Clarified repository spelling versus skill name, working directory, project/global scope, local discovery, listing, update and removal.
- Strengthened version detection, Angular state ownership, read-only source boundaries, customization order, wrapper/custom-component distinction and the six-part STOP response.
- Replaced six prose-only examples with complete Angular components; rewrote anti-patterns and removed the conflicting Accordion Angular sample.
- Expanded the catalog with real component URLs, categories, activation/API notes, Angular/a11y responsibilities, extension risks and limitations.
- Added source-backed lifecycle details, CVA ownership, Router/projection/TemplateRef/NgModule guidance, conditional DOM and SSR/hydration limits.
- Added license, contribution guide, changelog and isolated repeatable validation tooling. No Bootstrap Italia source or dependency implementation was changed, and no alternative UI library was introduced.

## Source evidence

Primary sources are [Bootstrap Italia documentation](https://italia.github.io/bootstrap-italia/), its [2.18.3 source](https://github.com/italia/bootstrap-italia/tree/v2.18.3), [Angular documentation](https://angular.dev/), [Angular Skills](https://github.com/angular/skills), the [Agent Skills specification](https://agentskills.io/specification) and [skills CLI](https://github.com/vercel-labs/skills). Component-specific evidence is linked in the references/examples.

The installed Bootstrap Italia 2.18.3 package, its exports/types, Carousel/Modal/Dropdown implementations and relevant SCSS were inspected read-only. Splide 4.1.4 source was used only to confirm the documented `data-splide` bridge. It is not imported directly by the wrappers.

The Carousel public import is `Carousel`; its constructor accepts an element, not a configuration object. `data-splide` JSON overrides Splide options passed by the preset, including explicitly supplied breakpoint values. The tested example supports two visible items on desktop/tablet and one on mobile. It uses no slide-width workaround or `_splide` access. Dynamic arrays use dispose-before-DOM-change and reconstruction, with an explicit reset-to-start policy.

Modal `dispose()` is not equivalent to completing hide. The example uses the documented non-animated variant and calls `hide()` before `dispose()`; animated integrations must keep the view alive until the public completion event. Input's `it-bs-static` is explicitly identified as package-source evidence rather than falsely attributed to the Input documentation. Package declaration/runtime export mismatches are recorded as a research caution.

## Executed validation

| Check | Result / scope |
| --- | --- |
| CLI version and help | `skills` 1.7.0; documented add/list/use/update/remove options checked against real help |
| Initial local discovery | Found exactly one skill, `angular-bootstrap-italia` |
| Published GitHub discovery | `npx skills@1.7.0 add https://github.com/ErmesDiPrisco/angular-boostrap-italia --list` succeeded; this verifies the published revision at execution time |
| Isolated local installation/listing | Installed from the checkout into `validation/.installation` with `--skill angular-bootstrap-italia --agent codex --copy --yes`; listing identified the correct name and source |
| Installation content/removal | Final SHA-256 comparison matched all 19 installed skill files, including LICENSE. Named removal without an agent filter succeeded; subsequent listing found no project skills. Agent-filtered removal left the shared copy, now documented in README |
| Angular/TypeScript | Six Markdown modules extracted and compiled using Angular 20.3.0 `ngc`, TypeScript 5.9.2, strict types and strict templates |
| Browser integration | Passed in installed Edge headless through Playwright: button/disabled, dropdown keyboard/output count, Modal Escape/focus/open destruction, CVA value/touched/dirty/reset/disabled, Carousel navigation/pagination/drag/data replacement and three teardown/recreation cycles |
| Carousel responsive/count matrix | 1280 → 900 → 600 → 1280 px; expected visible count and geometry; 0, 1, 2, 3, 5 and 6 items |
| IDs and ARIA | No duplicate IDs or missing ID-reference targets in the rendered fixture |
| Automated accessibility | axe WCAG 2 A/AA and WCAG 2.1 AA rules: no violations in the tested fixture state |
| Visual check | Rendered screenshot inspected; test fixture uses fallback fonts, not a production font deployment |
| Markdown/spec validation | Repository validator passed frontmatter, required files, local links, fences, top-level headings and unfinished-content checks |
| External links | All 78 distinct documentation/source links resolved after correcting the Splide source reference |
| Git whitespace check | `git diff --check` passed; no commit or push was performed by the audit |
| Bundled skill-creator Python helper | Attempted; unavailable because that Python environment lacks PyYAML. Its inspected allowlist also omits the spec-supported `compatibility` field. The repository validator checks the actual specification instead |

The commands and fixture are documented in [CONTRIBUTING.md](CONTRIBUTING.md). Validation dependencies are isolated in `validation/package.json` and its lockfile; users do not need them to install the skill. The fixture loads the Angular compiler for partial Angular dependencies; this is a test harness, not a production Angular CLI application. The Splide source link is pinned to commit `7b29da34200f9e135814672081132b8828d3eb3b`, whose file was compared with installed 4.1.4 and matched after newline normalization; that repository has no `v4.1.4` tag.

## Remaining limits

- The baseline proves these examples on the pinned versions, not every Angular/Bootstrap Italia release. Inspect the consuming application's versions before adaptation.
- Browser-only checks do not establish SSR, hydration or incremental hydration compatibility. Those are explicitly required host-application checks. No full SSR application was created during this skill audit.
- Automated accessibility and keyboard checks do not replace manual screen-reader/device checks. Actual touch hardware, all browsers, production fonts/assets and every catalog component remain host-specific validation.
- Carousel recreation resets position. Preserving in-flight interaction, focus or exact slide position requires a separately verified public strategy; private Splide access remains forbidden.
- An animated Modal requires asynchronous close-before-remove orchestration. The example deliberately exercises the non-animated public variant, without claiming that `dispose()` cancels arbitrary transitions.
- Publication requires committing/pushing the reviewed local changes. A successful remote discovery cannot test unpushed content.

## File inventory relative to the starting tree

All paths below are at the final repository root. The earlier `angular-bootstrap-italia-skill/` container was flattened; content was preserved and corrected.

Modified/moved documents:

- `README.md` and `angular-bootstrap-italia/SKILL.md`.
- References: `accessibility.md`, `angular-wrapper-patterns.md`, `architecture.md`, `bootstrap-italia-integration.md`, `component-catalog.md`, `components.md`, `customization-policy.md`, `javascript.md`, `source-research.md`, `testing.md` under `angular-bootstrap-italia/references/`.
- Examples: `anti-patterns.md`, `carousel.md`, `customizable-wrapper.md`, `forms.md`, `interactive-wrapper.md`, `modal.md`, `simple-wrapper.md` under `angular-bootstrap-italia/examples/`.

Added files:

- Root: `.gitignore`, `LICENSE`, `CONTRIBUTING.md`, `CHANGELOG.md`, `AUDIT.md`.
- `angular-bootstrap-italia/LICENSE`: intentionally bundles the license with the installed skill; its contents are checked against the root license.
- `validation/package.json`, `validation/package-lock.json`, `validation/check.mjs`, `validation/build.mjs`, `validation/fixture.ts`, `validation/browser-test.mjs`.

No content document was removed. The obsolete nested container was removed after confirming it was empty. Generated bundles, test installations, screenshots and dependency directories are ignored and are not publication artifacts. Some intermediate edits were committed by the user during the audit; this inventory describes the entire audit, not only the final Git diff.

```text
angular-boostrap-italia/
|-- README.md, LICENSE, CONTRIBUTING.md, CHANGELOG.md, AUDIT.md
|-- .gitignore
|-- angular-bootstrap-italia/
|   |-- SKILL.md, LICENSE
|   |-- references/ (10 files)
|   `-- examples/ (7 files)
`-- validation/ (6 maintainer files)
```

## Final contract

The skill is Angular-first, Bootstrap Italia-based and version-aware. It treats Bootstrap Italia as read-only, introduces no alternative UI library, uses verified APIs in the executable examples, defines mandatory STOP behavior and covers Carousel, lifecycle, cleanup, forms and accessibility. Installation and the Agent Skills-compatible structure are documented. The examples' limits are explicit rather than represented by unfinished code.
