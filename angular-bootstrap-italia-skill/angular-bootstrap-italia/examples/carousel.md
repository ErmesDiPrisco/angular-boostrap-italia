# Carousel wrapper

Source: https://italia.github.io/bootstrap-italia/docs/componenti/carousel/

Carousel is version-sensitive and must be verified against the installed package before implementation. Bootstrap Italia documents Carousel as Splide-backed and exposes public configuration through the documented integration. Do not implement the requirement “show two items” by forcing a slide width alone.

The Angular wrapper must first verify the public configuration for items per page, breakpoints, movement, navigation, pagination, drag, keyboard, and lifecycle. If two items cannot be represented through documented public configuration, stop and report the limitation rather than modifying Splide/Bootstrap Italia internals or replacing the carousel engine.

