# Accessibility and verification

Bootstrap Italia targets inclusive interfaces, but an Angular wrapper can still break the documented contract. Accessibility is part of the wrapper API.

## Required checks

- Every interactive control has an accessible name.
- Labels are programmatically associated with their controls.
- IDs are unique and all `aria-*` references resolve to existing elements.
- Expandable controls expose the correct `aria-expanded` state and target.
- Regions, dialogs, tabs, and other roles follow the exact documented relationship for the component.
- Keyboard focus is visible, logical, and not trapped accidentally.
- Disabled state is conveyed semantically; do not use only opacity or a CSS class.
- Projected content cannot remove required headings, labels, or descriptions.
- Motion and auto-advancing behavior follow the component documentation and user preference requirements.

## Accordion-specific contract

For the documented accordion pattern, preserve:

- a button control;
- `aria-expanded` matching open/closed state;
- `aria-controls` pointing to the panel ID;
- `role="region"` on the panel;
- `aria-labelledby` pointing to the control's heading ID;
- `data-bs-parent` when the group must allow only one open item;
- the documented keyboard behavior.

## Verification loop

Run the project's formatter, lint, type check, unit tests, and production build as available. Then test the rendered component in a browser:

1. keyboard-only navigation;
2. screen-reader-relevant names and states;
3. repeated instances on one page;
4. narrow and wide layouts;
5. destroy/recreate through Angular routing or conditional rendering;
6. SSR/hydration when applicable.

If a failure is caused by Bootstrap Italia itself rather than the wrapper, do not patch the dependency. Report the exact version, official component page, DOM, and reproduction, then ask how to proceed.

