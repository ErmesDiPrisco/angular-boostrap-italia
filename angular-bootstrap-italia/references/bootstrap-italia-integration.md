# Bootstrap Italia integration

## Version and asset inspection

Read the application's package manifest, lockfile, Angular build configuration and global styles before changing anything. Establish exactly how Bootstrap Italia CSS, fonts, sprite and JavaScript are loaded. The maintainer test fixture's pinned versions are not an application dependency prescription.

Use [official introduction](https://italia.github.io/bootstrap-italia/docs/come-iniziare/introduzione/) and [official customization](https://italia.github.io/bootstrap-italia/docs/come-iniziare/personalizzazione-della-libreria/), then verify against the installed package.

## Global styles and assets

Load compiled Bootstrap Italia CSS once globally, or compile one application-owned Sass entry point. Do not put the whole framework stylesheet into an encapsulated component. Version 2.18.3 publishes `dist/css/bootstrap-italia.min.css` and `src/scss/bootstrap-italia.scss`; resolve these through the project's existing Angular builder rather than guessing a new build layout.

Public Sass configuration is set before importing the library from the application-owned entry point. Bootstrap Italia documents `$primary-h`, `$primary-s`, `$primary-b` for the primary color, not just an arbitrary `$primary` replacement. Verify import order and Sass/toolchain support before giving a concrete import path. Reading or importing the dependency's Sass is allowed; editing/copying its internal implementation is forbidden. Runtime CSS variables only work where the installed stylesheet exposes and consumes them.

Keep fonts and SVG sprite URLs valid under the application's base URL, asset-copy rules and deployment path. The fixture uses browser fallback fonts and no sprite icons; it does not verify a host application's asset deployment. Do not add remote font or icon services merely to complete a wrapper.

## JavaScript loading

The 2.18.3 package metadata points to `dist/bootstrap-italia.esm.js` for module consumers and a bundled entry for non-module loading. Its root exports and declarations are not perfectly identical; verify the requested symbol in both. Use a public package entry, not `src/js/plugins/...` or private helper imports. The source path is a research location, not an integration recipe.

Choose the existing application's bundle or module strategy; do not load both. If using the script bundle, confirm its actual global namespace and add a narrowly typed application adapter. If using module imports, account for browser-dependent module evaluation and side effects. See [JavaScript](javascript.md) for browser-only loading, delegated interaction and teardown.

Data attributes can configure a component without auto-initializing it; a manual constructor can still need delegated keyboard attributes. Establish one instance owner, not a blanket ban on all attributes beside programmatic code. The [Dropdown](../examples/interactive-wrapper.md) and [Carousel](../examples/carousel.md) examples illustrate different verified contracts.
