# Simple wrapper: Accordion item

Source: https://italia.github.io/bootstrap-italia/docs/componenti/accordion/

Use a simple wrapper when Bootstrap Italia supplies the behavior through documented markup and attributes. Preserve the documented `.accordion-item`, heading, button, collapse panel, `role="region"`, and ARIA relationships. Angular may own the content and stable IDs; it must not replace the collapse behavior with an invented state machine.

Use the verified Accordion markup in `references/components.md` as the template contract. Generate unique IDs per instance and test repeated instances.

