# Testing and review

For every relevant wrapper verify Angular compilation, strict TypeScript, unit behavior, creation and destruction, recreation, cleanup, unique IDs, ARIA references, documented events, and initialization strategy. Run the project's formatter, lint, tests, and production build when available.

Browser smoke tests must cover keyboard use, accessible names/states, repeated instances, narrow/wide layouts, conditional rendering, and SSR/hydration where applicable.

For Carousel additionally verify item counts, non-divisible counts, few items, dynamic items, responsive breakpoints, navigation, indicators, resize, drag/swipe when documented, keyboard, accessibility, and destruction. A visual two-item layout with an engine still calculating three items is a bug and must not be shipped.

