---
name: angular-bootstrap-italia
description: Create, review, refactor and debug Angular wrappers for Bootstrap Italia. Use for accessible components, public JavaScript integration, Angular lifecycle and forms, Carousel constraints, and external CSS/SCSS customization in Angular apps using Bootstrap Italia. Verify installed versions and stop at unsupported public API boundaries. Not for replacing Bootstrap Italia or editing its internals.
license: MIT
compatibility: Angular applications using Bootstrap Italia 2.x; inspect installed Angular, TypeScript and Bootstrap Italia versions. Source verification needs official documentation or the installed package. Examples are validated on Angular 20.3.0 and Bootstrap Italia 2.18.3, not a requirement to upgrade.
metadata:
  version: "1.1.0"
---

# Angular + Bootstrap Italia

Build application-facing Angular wrappers on Bootstrap Italia's public markup, styles and JavaScript. Angular owns application state; Bootstrap Italia remains the UI foundation and interaction engine.

## Mandatory boundaries

- Treat Bootstrap Italia as read-only, including installed files, JavaScript, SCSS and generated assets. No edits to `node_modules/bootstrap-italia`, monkey patches, `patch-package`, internal forks, copied/modified implementations, private overrides or dependencies on private APIs. Reading source is analysis only.
- Use verified public exports, markup, classes, options, events and styling extension points. A member appearing in typings is not automatically public. Never derive API claims solely from generic Bootstrap or Splide knowledge.
- Inspect `package.json`, the lockfile and resolved Angular/TypeScript/Bootstrap Italia versions; standalone versus NgModule; CSS/SCSS loading; SSR/hydration; existing wrappers and tests. Installed versions prevail over latest docs. No automatic dependency upgrades.
- Extend from outside the dependency using the [customization order](references/customization-policy.md). Never accept a visual change that breaks the component's interaction, layout calculations or accessibility.
- Do not add another UI library. If core behavior must be rewritten, the result is a custom Angular component, not a Bootstrap Italia wrapper; STOP before changing architecture.

## Working method

1. Identify the exact component using the [catalog](references/component-catalog.md). Read only the references relevant to the task.
2. Establish the version-specific public contract using [source research](references/source-research.md); record uncertainties instead of inventing code.
3. Separate Angular inputs, outputs, state, IDs, projection, forms and routing from the library's DOM effects. Use Angular bindings instead of document-wide queries or manual class changes for application state.
4. Select one owner of each JavaScript instance and verify its actual activation timing. Delegated event attributes can coexist with a retained instance only when verified to retrieve that same instance. Do not double-toggle or double-construct.
5. Initialize after rendering, cancel stale asynchronous work, bridge documented events, and design closing/cleanup before adding dynamic views. See [JavaScript and lifecycle](references/javascript.md).
6. Preserve semantic HTML, stable unique IDs, keyboard behavior, focus and accessible names. Read [accessibility](references/accessibility.md).
7. Implement and run the applicable [tests](references/testing.md). State exactly which versions/checks were executed and which require the host application.

## Routing

- Project boundaries and state ownership: [architecture](references/architecture.md).
- Inputs/outputs, signals, queries, TemplateRef, projection, NgModule, forms, routing and SSR: [Angular wrapper patterns](references/angular-wrapper-patterns.md).
- CSS/SCSS/assets and import choices: [Bootstrap Italia integration](references/bootstrap-italia-integration.md).
- Selecting and adapting a documented component: [catalog](references/component-catalog.md) and [markup mapping](references/components.md).
- Configuration, external styling and unsupported requirements: [customization policy](references/customization-policy.md).
- Ambiguous or conflicting evidence: [source research](references/source-research.md).

## Executable examples

Examples have an explicit validation baseline, not universal version compatibility. Adapt to the installed application without upgrading it.

- Static button and projection: [simple wrapper](examples/simple-wrapper.md).
- Native events, lifecycle and Router: [interactive dropdown](examples/interactive-wrapper.md).
- Application-owned CSS composition: [customizable wrapper](examples/customizable-wrapper.md).
- Public configuration, responsive counts and dynamic items: [Carousel](examples/carousel.md). Read this and testing before any Carousel change.
- Controlled state, focus and hide-before-dispose: [Modal](examples/modal.md). Read before any dialog integration.
- Forms ownership and CVA: [forms](examples/forms.md).
- Failure cases and their corrections: [anti-patterns](examples/anti-patterns.md).

## Binding STOP rule

If a requirement cannot be supported without private APIs, dependency edits, patches, copied internals or replacement of the core behavior, stop that implementation. Report (1) the request, (2) versions and public contracts checked, (3) the technical limit, (4) why apparent hacks are unsafe, (5) viable alternatives, and (6) ask the user how to proceed. Do not select another architecture or UI library autonomously. Use the same response if a necessary API cannot be verified after checking available evidence.
