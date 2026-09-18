# Source research and evidence

## Procedure

1. Read `package.json`, lockfile and the resolved installed package. Record Angular, TypeScript and Bootstrap Italia versions, and relevant transitive versions (e.g. Splide). Do not equate a dependency range with the resolved version.
2. Open the exact official Bootstrap Italia component page. If the live site differs from the installation, read the corresponding tag's documentation and release notes. Installed-version behavior governs; do not upgrade automatically.
3. Inspect the package's typings for signatures, options, events and cleanup. Typings can be incomplete, stale or expose private members.
4. Check the package metadata and actual public runtime exports. A declaration without a runtime export is not a usable API. Do not fix such mismatches with private imports or `any` casts.
5. Read official/installed JavaScript source only to resolve behavior, option precedence, initialization timing and teardown. Source visibility does not make internal methods public. Source-backed DOM configuration must be identified as such rather than falsely attributed to documentation.
6. Read relevant official/installed SCSS only to understand documented layout and public variables. Distinguish exported configuration from internal implementation details.
7. Use only the verified public integration contract. Never depend on private APIs, copy internals, patch the package, or substitute generic Bootstrap behavior. For a documented third-party integration such as `data-splide`, verify the bridge in Bootstrap Italia before consulting that dependency's official API.
8. Validate the result through typing, rendered behavior and cleanup. If a necessary public contract remains uncertain after these checks, STOP with evidence and alternatives using the [customization policy](customization-policy.md).

## Evidence to retain

For each implementation record the installed version, official page, versioned source/typings/exports inspected, public API actually used, and tested behavior. Distinguish documentation claims, source observations, inferences and executed tests. Date snapshots; do not write “current/latest” as a timeless compatibility promise.

## Audited baseline

The examples were checked against Bootstrap Italia **2.18.3**, Angular **20.3.0**, TypeScript **5.9.2** and Splide **4.1.4**. These are reproducible example versions, not the only supported application versions.

- [Bootstrap Italia package metadata](https://github.com/italia/bootstrap-italia/blob/v2.18.3/package.json).
- [Public TypeScript index](https://github.com/italia/bootstrap-italia/blob/v2.18.3/types/index.d.ts); compare with the installed `dist/bootstrap-italia.esm.js`, not just this index.
- [Carousel implementation](https://github.com/italia/bootstrap-italia/blob/v2.18.3/src/js/plugins/carousel.js) and [typings](https://github.com/italia/bootstrap-italia/blob/v2.18.3/types/plugins/carousel.d.ts).
- [Modal implementation](https://github.com/italia/bootstrap-italia/blob/v2.18.3/src/js/plugins/modal.js) and [Dropdown implementation](https://github.com/italia/bootstrap-italia/blob/v2.18.3/src/js/plugins/dropdown.js).
- [Splide JSON option merging](https://github.com/Splidejs/splide/blob/v4.1.4/src/js/core/Splide/Splide.ts).

In this baseline, Carousel exposes no second constructor argument and no public Splide instance accessor. `_splide` appears in the declarations but is still private. The package also has declaration/runtime export differences (for example historical `Form` declarations); verify symbols individually rather than assuming every type-index entry exists at runtime.
