# Bootstrap Italia integration

Official sources:

- https://italia.github.io/bootstrap-italia/
- https://github.com/italia/bootstrap-italia/
- https://angular.dev/

Bootstrap Italia is read-only. Read documentation, typings, public exports, JavaScript, and SCSS when needed, but never modify them.

## Initialization

Choose exactly one strategy per component instance:

1. documented `data-bs-*` initialization, or
2. documented public JavaScript initialization.

Do not combine both on the same element. Programmatic initialization must happen after the DOM exists, retain the instance when required, avoid duplicate listeners, and dispose it before Angular destroys the view.

Load global CSS/JS once using the project's existing Angular build configuration. Do not initialize in a constructor and do not access browser globals during SSR.

## Public API rule

Use only documented constructors, methods, events, options, data attributes, classes, and public exports for the installed version. A private file path, generated selector, internal object, or source implementation is research material, never an extension point.

## Routing

Use Angular Router for internal navigation. Keep links as links and actions as buttons. Preserve Bootstrap Italia navigation markup and styling.

