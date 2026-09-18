# Architecture and state ownership

The dependency chain is application → Angular wrapper → Bootstrap Italia public API/markup/styles/JavaScript → Bootstrap Italia. The wrapper gives an Angular contract to an existing design-system component; it does not replace the underlying engine.

## Ownership

| Concern | Owner | Integration rule |
| --- | --- | --- |
| Domain state, value, validation, touched, dirty, routing | Angular application/forms | Inputs and outputs; no competing validator or DOM-derived domain state |
| Names, stable IDs, content, semantic composition | Angular wrapper | Preserve the documented DOM relationships |
| Movement, positioning, transitions, focus trap, documented interaction | Bootstrap Italia | Use public methods/configuration and bridge public events |
| Application spacing/layout/branding | External application CSS/SCSS | Follow the customization policy; preserve engine geometry and accessibility |
| Initializing, closing and disposing a retained instance | Angular wrapper | Synchronize with rendered DOM and conditional view lifetime |

Angular's desired state and the component's transient UI state are different. Do not bind `show`, `collapsed`, dimensions or live ARIA properties while a plugin is also writing them. Request behavior through the public API, then reconcile from completion events without feedback loops. CSS-only components can use Angular class bindings normally.

## Wrapper versus custom component

A wrapper can map inputs, project content, compose documented variants and translate public events. Replacing a carousel's movement/drag engine, modal focus trap, dropdown positioning or core state machine creates a custom Angular component. Name it honestly and apply the [STOP rule](customization-policy.md) before undertaking that architecture.

Source, SCSS, generated files and installed dependency files are read-only. Do not copy an implementation into the application to bypass this rule. No replacement UI library may be introduced automatically.

## Project fit

Inspect existing wrappers first and extend their conventions where sound. Respect standalone/NgModule choices and the installed Angular and TypeScript capabilities. The validation baseline in this repository is not an upgrade recommendation. For assets read [integration](bootstrap-italia-integration.md); for implementation decisions read [Angular wrapper patterns](angular-wrapper-patterns.md).
