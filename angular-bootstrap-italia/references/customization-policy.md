# Customization policy

## Extension order

Evaluate these options in order, using only those available in the installed version:

1. Public configuration.
2. Documented data attributes.
3. Public JavaScript API.
4. Documented markup and variants.
5. Documented events bridged into Angular.
6. Documented utilities.
7. Public CSS custom properties / Sass variables.
8. Angular composition of the supported components.
9. Wrapper-local CSS/SCSS in application-owned files.
10. Additional Angular logic that does not replace Bootstrap Italia internals or core behavior.

This is a decision order, not permission to combine incompatible initialization paths. Check the component's geometry, interaction and accessibility at every applicable layer. Application-owned custom properties must be named/documented as application APIs; do not claim they are Bootstrap Italia variables.

## Read-only boundary

CSS/SCSS customization is external to the dependency. Never edit `node_modules/bootstrap-italia`, JS/SCSS internals or generated assets; use monkey patches, `patch-package`, internal forks or copied implementations; override private APIs; or depend on underscore members merely because declarations expose them. Read source and styles only to understand supported behavior.

Do not use `::ng-deep`, private generated selectors, or width overrides to bypass engine calculations. A component that looks right but has incorrect navigation, indicators, hit areas, focus, responsive calculations or screen-reader state is broken. Rewriting the engine is a custom component, not a wrapper.

## Required STOP response

Stop the unsupported part of the implementation and give all six items:

1. Requested behavior and affected component.
2. Installed versions, official pages, public exports/options/events and safe styling checked.
3. Concrete technical limit or unresolved evidence.
4. Why the apparent workaround would break behavior/accessibility or cross the read-only boundary.
5. Feasible alternatives, such as a supported preset, adjusted requirement or explicitly requested custom component design.
6. Ask the user which alternative to pursue.

Do not choose a replacement architecture, patch or alternative UI library on the user's behalf. A permission request is not a substitute for checking available public APIs first. For Carousel, follow the [verified configuration example](../examples/carousel.md) before declaring two-item layouts unsupported.
