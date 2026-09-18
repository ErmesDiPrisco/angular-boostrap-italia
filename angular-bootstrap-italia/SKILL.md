---
name: angular-bootstrap-italia
description: Build, review, refactor and debug Angular components that use Bootstrap Italia directly. Use for native Angular wrappers, accessible markup, public Bootstrap Italia JavaScript APIs, data attributes, and external CSS/SCSS customization. Do not use for Angular UI libraries or changes to Bootstrap Italia internals.
license: MIT
compatibility: Angular application using Bootstrap Italia 2.x. Verify the installed Bootstrap Italia version before relying on version-sensitive APIs.
metadata:
  version: "1.0.0"
---

# Angular + Bootstrap Italia

Create production-ready Angular UI on top of Bootstrap Italia without introducing another UI component library.

## Non-negotiable boundaries

- Bootstrap Italia is read-only. Never patch, fork, copy, or edit its source, generated assets, vendor files, or `node_modules`.
- Use only documented Bootstrap Italia markup, classes, `data-*` attributes, configuration objects, and public JavaScript APIs.
- Put application-specific styling in the Angular application or library's external CSS/SCSS. Do not override Bootstrap Italia internals by editing its package.
- Do not invent Bootstrap classes or component APIs. If the installed version and the official documentation disagree, inspect the installed package and stop to ask the user before choosing a version-sensitive solution.
- If the requested behavior needs an undocumented hook, an internal class, a source modification, or a replacement JavaScript implementation of a Bootstrap Italia component, explain the boundary and ask the user whether to change the requirement.
- Do not add Angular Material, PrimeNG, Ionic, ng-bootstrap, ngx-bootstrap, or another UI library as a workaround.

## Working method

1. Inspect the Angular version, standalone/module setup, SSR/hydration mode, Bootstrap Italia version, global styles, and existing wrapper conventions.
2. Identify the exact official Bootstrap Italia component and read the relevant reference in `references/`.
3. Separate responsibilities: Angular owns state, inputs, outputs, content projection, IDs, and lifecycle; Bootstrap Italia owns visual behavior and documented interaction; external SCSS owns application-level appearance.
4. Preserve the documented HTML structure and accessibility contract. Generate stable unique IDs when a component instance creates relationships such as `aria-controls`, `aria-labelledby`, `for`, `id`, or `data-bs-target`.
5. Prefer declarative `data-bs-*` behavior when it is sufficient. Use the public JavaScript API only when Angular state or lifecycle requires explicit control.
6. Keep wrappers small. Do not recreate a whole Bootstrap Italia component in Angular when the documented markup already provides the behavior.
7. Verify with Angular type checking, unit tests, a browser smoke test, keyboard interaction, and an accessibility check proportional to the change.

8. For Carousel, forms, modals, overlays, and other stateful components, read the matching example and testing reference before implementation.

## Wrapper rules

- Use standalone components when the project uses standalone Angular; follow the project's existing convention otherwise.
- Use signal inputs/outputs only when compatible with the project's Angular version; do not upgrade Angular just to use a newer API.
- Expose semantic inputs such as `disabled`, `expanded`, `label`, or `variant`, then map them to verified Bootstrap Italia markup/classes.
- Do not bind `[class]` in a way that removes required Bootstrap Italia classes. Use `[class.foo]` or merge classes safely.
- Do not use `innerHTML` for projected or user-controlled content. Prefer content projection and Angular bindings.
- A wrapper must not hide required accessible names, descriptions, focus behavior, or keyboard behavior.
- For overlays, modals, dropdowns, tooltips, and popovers, account for teardown and focus restoration; do not leave Bootstrap instances attached to destroyed DOM.

## References

- Read [references/architecture.md](references/architecture.md) for project setup, wrapper boundaries, and lifecycle decisions.
- Read [references/angular-wrapper-patterns.md](references/angular-wrapper-patterns.md) for Angular version detection, standalone/NgModule choices, forms, signals, lifecycle, routing, and the wrapper/custom-component boundary.
- Read [references/bootstrap-italia-integration.md](references/bootstrap-italia-integration.md) for initialization and public API rules.
- Read [references/components.md](references/components.md) for verified component markup patterns and the official documentation map.
- Read [references/component-catalog.md](references/component-catalog.md) when selecting or cataloging a component.
- Read [references/javascript.md](references/javascript.md) before using Bootstrap Italia JavaScript or `data-bs-*` behavior.
- Read [references/customization-policy.md](references/customization-policy.md) before changing CSS/SCSS or when a requirement may cross the read-only boundary.
- Read [references/source-research.md](references/source-research.md) whenever documentation or a public API is unclear.
- Read [references/accessibility.md](references/accessibility.md) for ARIA, keyboard, focus, and testing requirements.
- Read [references/testing.md](references/testing.md) before finalizing a wrapper.

## Verified examples

- [examples/simple-wrapper.md](examples/simple-wrapper.md)
- [examples/interactive-wrapper.md](examples/interactive-wrapper.md)
- [examples/customizable-wrapper.md](examples/customizable-wrapper.md)
- [examples/carousel.md](examples/carousel.md)
- [examples/modal.md](examples/modal.md)
- [examples/forms.md](examples/forms.md)
- [examples/anti-patterns.md](examples/anti-patterns.md)

## Required response when blocked

State exactly which requested behavior is not supported by the public API or documented markup, why implementing it would cross the read-only boundary, and ask the user to choose between changing the requirement or explicitly allowing a different integration strategy. Do not silently implement an internal workaround.
