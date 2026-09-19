# Angular Bootstrap Italia Skill

An Agent Skill for GitHub Copilot and other coding agents compatible with the Agent Skills format.

`angular-bootstrap-italia` teaches an agent how to build robust, reusable Angular wrapper components on top of [Bootstrap Italia](https://italia.github.io/bootstrap-italia/). Bootstrap Italia remains the UI foundation; Angular provides the application-facing abstraction, state ownership, lifecycle, forms integration, accessibility wiring, and reusable configuration.

This repository contains instructions and references, not a compiled Angular library. It does not ship Angular components, install PrimeNG, Angular Material, or another UI library, and must not modify Bootstrap Italia. Bootstrap Italia is treated as a read-only dependency: application customization is performed through documented markup, public APIs, supported configuration, and external CSS/SCSS.

## Available Skills

### `angular-bootstrap-italia`

Use this skill when an Angular application uses Bootstrap Italia and needs to create, review, refactor, or debug wrapper components. It guides agents through:

- creating native Angular wrappers around documented Bootstrap Italia markup;
- integrating documented Bootstrap Italia JavaScript components;
- choosing declarative data attributes or public programmatic APIs;
- managing Angular lifecycle, initialization, event bridging, and cleanup;
- preserving semantic HTML, ARIA, keyboard behavior, focus, and unique IDs;
- building safe application-level CSS/SCSS variants;
- integrating Angular forms and `ControlValueAccessor` when appropriate;
- handling standalone and NgModule projects, signals, SSR, and version differences;
- analyzing Carousel constraints, responsive behavior, and dynamic items;
- identifying technical limits and stopping before an internal API or framework patch is introduced;
- verifying Angular and Bootstrap Italia versions before generating version-sensitive code.

## Repository layout

```text
angular-boostrap-italia/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── AUDIT.md
├── validation/                  Maintainer-only checks
└── angular-bootstrap-italia/
    ├── SKILL.md
    ├── LICENSE
    ├── references/
    │   ├── accessibility.md
    │   ├── angular-wrapper-patterns.md
    │   ├── architecture.md
    │   ├── bootstrap-italia-integration.md
    │   ├── component-catalog.md
    │   ├── components.md
    │   ├── customization-policy.md
    │   ├── javascript.md
    │   ├── source-research.md
    │   └── testing.md
    └── examples/
        ├── anti-patterns.md
        ├── carousel.md
        ├── customizable-wrapper.md
        ├── forms.md
        ├── interactive-wrapper.md
        ├── modal.md
        └── simple-wrapper.md
```

The nested `SKILL.md` has the required Agent Skills YAML frontmatter (`name` and `description`) and is the installable skill entry point.

## Prerequisites

Install Node.js/npm (with `npx`) and Git, and use an agent supporting Agent Skills. Check `node --version`, `npm --version` and `git --version`. Remote installation requires access to npm and GitHub. Applying the skill requires an Angular application using Bootstrap Italia; installed versions are inspected, not automatically upgraded.

Commands were verified with `skills` 1.7.0. Use `npx skills@1.7.0` for reproducibility. On Windows PowerShell use `npx.cmd` if execution policy blocks `npx.ps1`. Installing the skill does not install Bootstrap Italia into your application. You do not need to install this repository's `validation/` dependencies to use the skill.

## Using Agent Skills

Agent Skills are reusable instruction sets loaded by compatible coding agents when a task matches the skill description. The format is supported by tools such as GitHub Copilot and other agentic coding environments. The `skills` CLI can discover a repository containing one or more `SKILL.md` files and install the selected skill into the agent's project or user scope.

## Installation

### Install from GitHub

Run this from the Angular application project where you want the skill installed. The repository is named `angular-boostrap-italia` (the exact GitHub spelling); the installable skill is `angular-bootstrap-italia`:

```bash
npx skills add https://github.com/ErmesDiPrisco/angular-boostrap-italia
```

The CLI discovers `angular-bootstrap-italia/SKILL.md` as the skill. To inspect the skills available in the repository without installing them:

```bash
npx skills add https://github.com/ErmesDiPrisco/angular-boostrap-italia --list
```

To install only this skill by name:

```bash
npx skills add https://github.com/ErmesDiPrisco/angular-boostrap-italia --skill angular-bootstrap-italia
```

To target a particular supported agent, pass its CLI identifier, for example:

```bash
npx skills add https://github.com/ErmesDiPrisco/angular-boostrap-italia --skill angular-bootstrap-italia --agent codex
```

The default installation is project-scoped. Use `-g`/`--global` when the skill should be available across projects. Use `--copy` when symlinks are not suitable for the environment.

For GitHub Copilot:

```bash
npx skills add https://github.com/ErmesDiPrisco/angular-boostrap-italia --skill angular-bootstrap-italia --agent github-copilot
```

Add `--yes` for a non-interactive installation when intended.

### Use without installing

The CLI can resolve a skill and generate a prompt without installing it:

```bash
npx skills use https://github.com/ErmesDiPrisco/angular-boostrap-italia --skill angular-bootstrap-italia
```

To start a supported agent directly with the generated prompt, add the relevant `--agent` option documented by the CLI.

### Verify installation

```bash
npx skills list
```

Use `npx skills ls -g` for global skills, or `npx skills ls -a codex` to filter by agent.

Run listing commands from the same application directory used for installation. Confirm `angular-bootstrap-italia` appears. Reload the agent session if its inventory is cached and explicitly ask it to use the skill.

### Update the skill

After changes are pushed to the repository, update an installed copy with:

```bash
npx skills update angular-bootstrap-italia --project
```

Use `npx skills update angular-bootstrap-italia --global` for a global installation. Keeping the skill name in the command avoids updating unrelated skills. The project command above explicitly selects project scope.

### Remove the skill

```bash
npx skills remove angular-bootstrap-italia
```

Use `npx skills remove --global angular-bootstrap-italia` for a global installation. The CLI also supports the `rm` alias. Run `npx skills list` afterwards to confirm removal. In the tested CLI 1.7.0, removal filtered with `--agent codex` can leave the shared `.agents/skills` copy visible; use the named removal above to remove the skill from that project, including shared-agent links.

## Usage examples

- “Use angular-bootstrap-italia to create an Angular control with accessible feedback and ControlValueAccessor.”
- “Review this Bootstrap Italia modal for focus return and route teardown.”
- “Show two Carousel items on desktop and one on mobile using verified public configuration.”

## How it works

The agent reads `SKILL.md`, inspects the application's versions and conventions, then loads relevant references/examples and verifies public contracts. The directory-per-skill structure follows [Angular Skills](https://github.com/angular/skills). Examples have an explicit validation baseline; they do not require upgrading the application.

## What the skill enforces

The skill is deliberately opinionated about boundaries:

- Angular owns application state; Bootstrap Italia owns documented UI behavior.
- Bootstrap Italia source, generated assets, private APIs, and installed package files are read-only.
- Undocumented classes, attributes, events, methods, options, and Sass variables must not be invented.
- A wrapper must not silently become a replacement component engine.
- PrimeNG, Angular Material, ng-bootstrap, ngx-bootstrap, Ionic UI components, and other UI libraries are not automatic workarounds.
- If a requirement needs an internal API or a Bootstrap Italia patch, the agent must stop, explain the technical limit, and ask how to proceed.

## Troubleshooting

### The CLI cannot find the skill

Confirm that GitHub is reachable and that the pushed branch contains:

```text
angular-bootstrap-italia/SKILL.md
```

The file must begin with valid YAML frontmatter containing `name: angular-bootstrap-italia` and a `description`. Run:

```bash
npx skills add https://github.com/ErmesDiPrisco/angular-boostrap-italia --list
```

For local changes, run this from the checkout root (the directory containing this README):

```bash
npx skills add . --list
```

### The skill name is not accepted

Use the exact name `angular-bootstrap-italia`, not the repository name. The repository is a container; the nested directory and its `SKILL.md` define the skill name.

### The skill is installed but not used

Check the agent's supported skill directory and run:

```bash
npx skills list
```

Then start a task that explicitly mentions Angular and Bootstrap Italia, or ask the agent to use `angular-bootstrap-italia`. If the skill was installed for a different agent, repeat installation with `--agent codex`.

### Updates are not visible

Push the new commit, then run:

```bash
npx skills update angular-bootstrap-italia --project
```

For a global installation use `-g`; for a project installation use `-p`. Reinstall local-path installations from their checkout; their update provenance differs from GitHub installs. GitHub updates cannot retrieve unpushed edits.

### The agent proposes a generic Bootstrap solution

Ask it to read `angular-bootstrap-italia/references/components.md` and the exact official Bootstrap Italia component page. The skill requires version-first verification and forbids treating generic Bootstrap examples as Bootstrap Italia API evidence.

### A requested customization appears impossible

This is an intentional stop condition. The agent should report the public APIs and supported styling options it checked, identify the internal behavior that would need changing, and ask whether to change the requirement. It must not patch Bootstrap Italia or install another UI library automatically.

## Official sources

- [Bootstrap Italia documentation](https://italia.github.io/bootstrap-italia/)
- [Bootstrap Italia repository](https://github.com/italia/bootstrap-italia/)
- [Angular documentation](https://angular.dev/)
- [Angular Skills repository](https://github.com/angular/skills)
- [skills CLI documentation](https://github.com/vercel-labs/skills)

## Contributing

Keep the skill Angular-first and evidence-based. When adding a component example, verify its markup, classes, attributes, JavaScript API, events, accessibility contract, and version behavior against the official Bootstrap Italia documentation or read-only source. Do not add placeholders or examples copied from generic Bootstrap without verification.


## Maintainer validation

See [CONTRIBUTING.md](CONTRIBUTING.md) for reproducible checks, [CHANGELOG.md](CHANGELOG.md) for changes and [AUDIT.md](AUDIT.md) for evidence and limitations.

## License

MIT; see [LICENSE](LICENSE). Bootstrap Italia and Angular retain their own licenses. Validation dependencies are not distributed inside the skill directory.
