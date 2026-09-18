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
angular-bootstrap-italia-skill/
├── README.md
└── angular-bootstrap-italia/
    ├── SKILL.md
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

## Using Agent Skills

Agent Skills are reusable instruction sets loaded by compatible coding agents when a task matches the skill description. The format is supported by tools such as GitHub Copilot and other agentic coding environments. The `skills` CLI can discover a repository containing one or more `SKILL.md` files and install the selected skill into the agent's project or user scope.

### Install from GitHub

After publishing this repository, replace `<OWNER>` with the GitHub account or organization that owns it:

```bash
npx skills add https://github.com/<OWNER>/angular-bootstrap-italia-skill
```

The CLI discovers `angular-bootstrap-italia/SKILL.md` as the skill. To inspect the skills available in the repository without installing them:

```bash
npx skills add https://github.com/<OWNER>/angular-bootstrap-italia-skill --list
```

To install only this skill by name:

```bash
npx skills add https://github.com/<OWNER>/angular-bootstrap-italia-skill --skill angular-bootstrap-italia
```

To target a particular supported agent, pass its CLI identifier, for example:

```bash
npx skills add https://github.com/<OWNER>/angular-bootstrap-italia-skill --skill angular-bootstrap-italia --agent codex
```

The default installation is project-scoped. Use `-g`/`--global` when the skill should be available across projects. Use `--copy` when symlinks are not suitable for the environment.

### Use without installing

The CLI can resolve a skill and generate a prompt without installing it:

```bash
npx skills use https://github.com/<OWNER>/angular-bootstrap-italia-skill --skill angular-bootstrap-italia
```

To start a supported agent directly with the generated prompt, add the relevant `--agent` option documented by the CLI.

### List installed skills

```bash
npx skills list
```

Use `npx skills ls -g` for global skills, or `npx skills ls -a <agent>` to filter by agent.

### Update the skill

After changes are pushed to the repository, update an installed copy with:

```bash
npx skills update angular-bootstrap-italia
```

Use `npx skills update -g` for global installations, `npx skills update -p` for project installations, or `npx skills update -y` to skip the scope prompt using the CLI's automatic scope detection.

### Remove the skill

```bash
npx skills remove angular-bootstrap-italia
```

Use `npx skills remove --global angular-bootstrap-italia` for a global installation, or add `--agent <agent>` to remove it only from selected agents. The CLI also supports the `rm` alias.

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

Confirm that the repository is public and that the pushed tree contains:

```text
angular-bootstrap-italia/SKILL.md
```

The file must begin with valid YAML frontmatter containing `name: angular-bootstrap-italia` and a `description`. Run:

```bash
npx skills add https://github.com/<OWNER>/angular-bootstrap-italia-skill --list
```

If the repository has not been pushed yet, test the local folder instead:

```bash
npx skills add ./angular-bootstrap-italia-skill --list
```

### The skill name is not accepted

Use the exact name `angular-bootstrap-italia`, not the repository name. The repository is a container; the nested directory and its `SKILL.md` define the skill name.

### The skill is installed but not used

Check the agent's supported skill directory and run:

```bash
npx skills list
```

Then start a task that explicitly mentions Angular and Bootstrap Italia, or ask the agent to use `angular-bootstrap-italia`. If the skill was installed for a different agent, repeat installation with `--agent <agent>`.

### Updates are not visible

Push the new commit, then run:

```bash
npx skills update angular-bootstrap-italia
```

For a global installation use `-g`; for a project installation use `-p`. If a symlink points to an old local checkout, remove and reinstall or use `--copy`.

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

