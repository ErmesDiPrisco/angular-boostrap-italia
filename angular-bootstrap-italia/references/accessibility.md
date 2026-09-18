# Accessibility contracts

Sources: [Bootstrap Italia Accordion](https://italia.github.io/bootstrap-italia/docs/componenti/accordion/), [Modale](https://italia.github.io/bootstrap-italia/docs/componenti/modale/), [Carousel](https://italia.github.io/bootstrap-italia/docs/componenti/carousel/), [Dropdown](https://italia.github.io/bootstrap-italia/docs/componenti/dropdown/), [Input](https://italia.github.io/bootstrap-italia/docs/form/input/) and [Angular accessibility](https://angular.dev/best-practices/a11y). Recheck the installed-version contract; examples in documentation can themselves contain mistakes.

## Shared requirements

Use semantic HTML: real buttons for actions, links for navigation, logical headings, lists and native form controls. Every interactive control needs an accessible name. Do not use ARIA to compensate for avoidable semantic errors or remove visible focus styling.

Use page-unique stable IDs. Only ID-reference attributes such as `aria-labelledby`, `aria-describedby` and `aria-controls` must resolve to element IDs; not every `aria-*` value is an ID. Prefer visible labels with `for`/`id`. `aria-labelledby` supplies a name; `aria-describedby` connects supplementary help/error text; `aria-controls` identifies controlled content but does not itself announce expanded state. Do not add all attributes indiscriminately.

IDs must survive SSR/hydration deterministically and remain unique across repeated wrappers and cloned content. Remove references when their target disappears. Disable native controls semantically; `aria-disabled` alone does not prevent interaction on custom controls. Decorative icons use `aria-hidden="true"`; meaningful standalone icons need an accessible name.

Test keyboard order, visible focus, zoom/reflow, contrast, reduced motion and actual names/states. A keyboard trap is appropriate inside an open modal, not elsewhere.

## Accordion and Collapse

The documented Accordion pattern uses heading-contained buttons with `aria-expanded`, `aria-controls`, a panel `role="region"` and `aria-labelledby` pointing to the heading ID. `data-bs-parent` selects exclusive opening; it is not an ARIA requirement. Do not copy the region role indiscriminately into every generic Collapse instance.

Bootstrap Italia's Accordion plugin adds ArrowUp/ArrowDown/Home/End navigation beyond Collapse. Preserve and test that integration, including dynamically added headers; importing Collapse alone is not proof of the extended behavior. Do not promise transition-safe destruction until it has been tested.

## Dialogs

Supply a meaningful title referenced by `aria-labelledby`, `tabindex="-1"` on the modal root, and the documented modal/dialog/content structure. The Modal plugin manages the active `role="dialog"`, `aria-modal` and hidden state. Do not add live Angular bindings that overwrite them. Use `aria-describedby` only for a suitable concise description, not an entire complex dialog by default.

Verify focus entry, Tab/Shift+Tab containment, Escape/backdrop behavior, and focus restoration to a connected opener or a deliberate route destination. Keep the view alive until the hide transition completes. A removed backdrop is not sufficient evidence that scroll lock and focus trap were cleaned up.

## Forms

Associate labels, descriptions and specific error messages. Group related radios/checkboxes with appropriate `fieldset`/`legend`. Keep required/disabled/invalid semantics consistent with Angular Forms. Do not communicate errors only through color. Link visible errors with `aria-describedby`; set `aria-invalid` when presenting an invalid state. Choose live-region announcements for asynchronous feedback deliberately, not `role="alert"` on every error unconditionally.

Bootstrap Italia's feedback styles do not create those semantic connections for Angular. Check programmatic writes, reset, disabled controls and validation timing as well as typing. See the [CVA example](../examples/forms.md).

## Carousel

Give the carousel an accessible name. Preserve the documented track/list/slide structure and generated controls; do not overwrite Splide's ARIA, visibility or tabindex management. Verify Italian control names (or a configured translation), pagination keyboard behavior, visible focus, offscreen slide focusability and page/slide announcements. The default example disables autoplay. If a requirement introduces autoplay, verify pause/resume, focus/hover stopping and reduced-motion behavior with the installed configuration before implementing it.

Count visible items, check arrows/indicators at the ends, drag/swipe, narrow screens and recreated data. Loop-mode clones can duplicate IDs; dynamic removal can lose focus. A correct-looking two-column CSS layout does not prove correct navigation or accessibility.

## Navigation

Use anchors and Angular Router for destinations, buttons for toggles, and `aria-current="page"` for the active destination where appropriate. Provide distinct accessible names for multiple navigation landmarks. Preserve skip links and their existing focusable destination. Navigation dropdowns are not automatically ARIA `menu` widgets; that role imposes a different keyboard and child-role contract.

## Evidence

Run automated accessibility checks plus keyboard and screen-reader checks proportional to the component. Record what was actually tested, including browser/assistive technology versions. Automated axe success is not an accessibility certification. If the dependency causes a defect, report the precise version and reproduction and apply the [STOP rule](customization-policy.md), without patching it.
