# Verified Bootstrap Italia component patterns

Use the official component page as the final authority for the installed version. These patterns are intentionally limited to structures verified in Bootstrap Italia documentation; they are not generic Bootstrap examples.

## Accordion

Official page: https://italia.github.io/bootstrap-italia/docs/componenti/accordion/

The documented structure is:

```html
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne">
        Titolo
      </button>
    </h2>
    <div
      id="collapseOne"
      class="accordion-collapse collapse show"
      data-bs-parent="#accordionExample"
      role="region"
      aria-labelledby="headingOne">
      <div class="accordion-body">Contenuto</div>
    </div>
  </div>
</div>
```

For closed items, remove `show`, add `collapsed` to the button, and set `aria-expanded="false"`. In an Angular wrapper, generate unique IDs per instance and derive `data-bs-target`, `aria-controls`, `aria-labelledby`, and `data-bs-parent` from those IDs. Bootstrap Italia documents `accordion-background-active` for the active-header background variant.

The documentation states that accordion controls are normally buttons inside a heading, the collapsible region has `role="region"` and `aria-labelledby`, and keyboard behavior is extended according to the WAI-ARIA accordion pattern. Preserve those relationships.

## Other components

Bootstrap Italia documents these component families, among others: Alert, Avatar, Badge, Buttons, Card, Callout, Carousel, Chips, Collapse, Cookiebar, Dimmer, Dropdown, Hero, Modale, Notifiche, Overlay, Paginazione, Popover, Progress Indicators, Rating, Sections, Steppers, Sticky, Tab, Timeline, Tooltip, and Video Player. It also documents navigation and form components.

Official index: https://italia.github.io/bootstrap-italia/

For any component not reproduced above:

1. open its exact official documentation page;
2. copy only the documented structural contract;
3. verify every class, attribute, option, and event against that page and the installed package;
4. do not synthesize an example from plain Bootstrap or another library;
5. if verification is unavailable, describe the integration strategy without inventing code and ask for the version or source reference.

## Angular mapping example

The Angular part may own the content and IDs while preserving the documented DOM:

```ts
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="accordion-item">
      <h2 class="accordion-header" [id]="headingId()">
        <button
          class="accordion-button"
          [class.collapsed]="!expanded()"
          type="button"
          data-bs-toggle="collapse"
          [attr.data-bs-target]="'#' + panelId()"
          [attr.aria-expanded]="expanded()"
          [attr.aria-controls]="panelId()">
          <ng-content select="[accordionTitle]" />
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        [class.show]="expanded()"
        [id]="panelId()"
        role="region"
        [attr.aria-labelledby]="headingId()">
        <div class="accordion-body"><ng-content /></div>
      </div>
    </div>
  `,
})
export class AccordionItemComponent {
  readonly expanded = input(false);
  readonly headingId = input.required<string>();
  readonly panelId = input.required<string>();
}
```

This is a mapping pattern, not permission to change the documented contract. The parent must provide IDs unique in the document and the wrapper must align Angular state with the actual Bootstrap behavior before shipping two-way interaction.

