# Mapping documented markup into Angular

Use the [component catalog](component-catalog.md) to find a real Bootstrap Italia page. Preserve structural markup, then add Angular bindings only to fields owned by Angular. A documented HTML fragment does not by itself prove dynamic Angular lifecycle support.

## Accordion structural contract

Source: [official Accordion page](https://italia.github.io/bootstrap-italia/docs/componenti/accordion/) and [versioned documentation](https://github.com/italia/bootstrap-italia/blob/v2.18.3/docs/componenti/accordion.md).

This is a static structural fragment, not a complete Angular wrapper. IDs are for one occurrence only and must be supplied uniquely by the consuming wrapper.

```html
<div class="accordion" id="services-accordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id="services-heading">
      <button class="accordion-button collapsed" type="button"
        data-bs-toggle="collapse" data-bs-target="#services-panel"
        aria-expanded="false" aria-controls="services-panel">Servizi disponibili</button>
    </h2>
    <div id="services-panel" class="accordion-collapse collapse"
      data-bs-parent="#services-accordion" role="region" aria-labelledby="services-heading">
      <div class="accordion-body">Consulta i servizi offerti dal Comune.</div>
    </div>
  </div>
</div>
```

For an initially open panel, the official contract uses `show`, an uncollapsed button and `aria-expanded="true"`. Those are initial attributes, not permission to bind Angular state over a running Collapse instance. When Angular controls opening, call the public API and reconcile completion events. Derive every target/ARIA relationship from stable IDs; do not render this literal ID set twice.

The Accordion keyboard integration is distinct from Collapse, and its public/data interaction must be checked for the installed version. `data-bs-parent` governs exclusive opening. Documented visual modifiers such as `accordion-background-active` go on the accordion container. See [accessibility](accessibility.md) and [lifecycle](javascript.md).

## Adaptation rules

- Verify each class, attribute, constructor, option and event against the exact Bootstrap Italia page and installed package. Upstream Bootstrap examples are not primary evidence.
- Keep library structural classes intact. Use individual class bindings for Angular-owned variants instead of replacing the whole class attribute.
- Use projection/typed templates within documented content slots, without introducing invalid nesting or hiding required labels.
- Do not infer data-attribute scanning will process later Angular views. Resolve initialization and cleanup for that particular component.
- Use the complete [button](../examples/simple-wrapper.md), [dropdown](../examples/interactive-wrapper.md), [Carousel](../examples/carousel.md), [Modal](../examples/modal.md) and [form](../examples/forms.md) examples as versioned implementation references.
