# JavaScript and lifecycle

Bootstrap Italia documents both declarative activation through `data-*` attributes and programmatic activation through public JavaScript APIs. Choose the smallest supported mechanism.

## Declarative first

Use documented attributes such as `data-bs-toggle`, `data-bs-target`, and component-specific options when the interaction is naturally driven by user input. Keep the required classes and ARIA attributes in the template.

Do not add arbitrary `data-*` attributes and do not assume an attribute from upstream Bootstrap exists in Bootstrap Italia without verification.

## Programmatic API

When explicit control is required, import the documented public component API from the installed package and use its documented constructor, methods, events, and options. Do not import private files, internal helpers, or source paths.

The project documentation notes that Bootstrap Italia JavaScript can be imported modularly, provides TypeScript typings, and distinguishes automatic data-attribute initialization from manual initialization. The Carousel documentation uses Splide-backed behavior; current Bootstrap Italia identifies the public component as `Carousel`, not the historical `CarouselBI`. Verify the installed version before writing a Carousel integration.

## Angular lifecycle rules

- Create browser-only instances after the DOM exists.
- Keep a reference to every instance created by the wrapper.
- Subscribe only to documented events and remove listeners on destroy.
- Dispose/destroy instances using the documented public method before Angular removes their DOM.
- Do not initialize the same element both declaratively and manually unless the documentation explicitly supports that combination.
- Do not query the whole document when a `ViewChild`/element reference can scope the operation.
- Ensure changes from Bootstrap Italia are reflected into Angular state without causing feedback loops.

## SSR and hydration

Do not evaluate browser globals in module top-level code. Defer imports or initialization when required by the build and use Angular's platform-aware facilities. Hydrated DOM must match the server-rendered initial state; avoid immediately toggling a component during hydration unless that behavior is explicitly intended and tested.

