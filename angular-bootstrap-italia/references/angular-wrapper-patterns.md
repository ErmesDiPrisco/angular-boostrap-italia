# Angular wrapper patterns

Angular is the abstraction layer and the source of truth for application state. Bootstrap Italia remains responsible for the documented visual and interaction behavior.

## Version-first inspection

Before writing code inspect `package.json`, lockfile, Angular version, TypeScript version, `bootstrap-italia` version, standalone/NgModule architecture, SSR/hydration, global styles, and existing conventions. Do not upgrade dependencies automatically.

Use `input()`/`output()`, signals, `viewChild()`, `DestroyRef`, `@if`, and `@for` only when supported by the installed Angular version. For legacy projects use the project's compatible decorators and lifecycle APIs.

## Wrapper responsibilities

- own application state, inputs, outputs, IDs, content projection, Angular forms integration, and lifecycle;
- map state to documented Bootstrap Italia classes and attributes;
- bridge documented events without duplicate listeners;
- initialize imperative APIs only after the view exists;
- dispose instances and listeners on destruction;
- preserve the official DOM and accessibility relationships.

Prefer `ViewChild`/`viewChild()` over document-wide queries. Imperative DOM access is allowed only inside the wrapper when required by a public Bootstrap Italia API.

## Forms

Angular owns value, validation, touched, dirty, disabled, and business rules. Bootstrap Italia supplies the documented field markup, visual states, and accessible feedback. Implement `ControlValueAccessor` only when the wrapper is a real reusable Angular form control; do not create a second validation system.

## Wrapper or custom component

If Angular replaces Bootstrap Italia's movement, drag, positioning, state machine, navigation, modal engine, dropdown engine, or carousel engine, it is a custom Angular component, not a Bootstrap Italia wrapper. State that explicitly and stop if the request requires that replacement.

