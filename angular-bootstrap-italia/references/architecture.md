# Architecture and integration

This reference defines how an Angular wrapper may use Bootstrap Italia while keeping the framework read-only.

## Source of truth

Bootstrap Italia is a Bootstrap 5 theme and design-system implementation. The official documentation is the contract for markup, classes, attributes, component behavior, and examples:

- https://italia.github.io/bootstrap-italia/
- https://github.com/italia/bootstrap-italia/

The documentation currently identifies v2.18.3 and Bootstrap 5.2.3. Treat that as a current reference, not a permanent compatibility promise. Always inspect the application's installed version.

## Installation and global assets

Use the project's package manager and its existing Angular configuration. Do not prescribe a second installation path when the project already has one.

Typical integration concerns are:

- Bootstrap Italia CSS/SCSS must be loaded globally, not in a component stylesheet when the component depends on global framework selectors.
- Bootstrap Italia's JavaScript bundle must be loaded according to the project's documented build setup before data attributes or public constructors are used.
- If the project uses SSR or hydration, avoid touching `window` or `document` during server rendering. Defer browser-only behavior to an appropriate Angular lifecycle hook and guard it with the project's platform utilities.
- Do not duplicate the framework bundle in multiple Angular components.

## Wrapper shape

A wrapper should usually contain:

1. typed inputs for the application-facing state;
2. outputs for events the application needs;
3. a template whose DOM follows the official Bootstrap Italia example;
4. stable IDs and ARIA relationships;
5. minimal lifecycle code only when declarative attributes cannot express the requirement.

Use content projection for labels, headings, body content, and action areas when the official component allows arbitrary content. Do not turn the wrapper into a second design system.

## Styling boundary

Allowed:

- documented Bootstrap Italia classes;
- documented utility classes;
- CSS custom properties or Sass variables explicitly supported by the installed version;
- application-level selectors in external SCSS;
- a wrapper host class that scopes application-specific visual changes.

Not allowed:

- editing `node_modules/bootstrap-italia`;
- copying and modifying Bootstrap Italia source files;
- relying on private generated selectors or DOM nodes not shown in official docs;
- using `::ng-deep` as a permanent integration mechanism;
- changing component behavior through undocumented CSS side effects.

## Decision rule

If the requested result can be expressed with documented markup, public options, supported data attributes, or external CSS, implement it. If it requires changing the framework implementation, stop and ask.

