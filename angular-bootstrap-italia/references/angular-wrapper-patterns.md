# Angular wrapper patterns

## Inspect first

Read `package.json`, lockfile and resolved versions of Angular, TypeScript and Bootstrap Italia; standalone/NgModule architecture; global CSS/SCSS and JavaScript loading; SSR/hydration mode; existing wrappers; test scripts. Resolve version ranges using the lockfile/installed package. Do not upgrade automatically. Missing dependencies are a fact to report, not evidence of the latest API.

## Public Angular contract

Use typed inputs for semantic configuration, outputs for application events, and signals where supported. The examples use standalone components and Angular 20.3.0 APIs. For older applications use compatible `@Input`, `@Output`/`EventEmitter`, `@ViewChild` and lifecycle hooks. Do not mechanically use `input()`, `output()`, `viewChild()`, `DestroyRef`, `@if` or `@for` without checking support.

NgModule applications can import supported standalone wrappers in the module's `imports`. A non-standalone adaptation uses `standalone: false`, declarations/exports and module imports for Forms/Router/common directives as needed. Do not put standalone components in `declarations` or change the application's bootstrapping to use a wrapper.

Use `strict` TypeScript and Angular `strictTemplates`; avoid `any` casts to make unsupported package APIs compile. Type-only imports must not cause SSR runtime evaluation. Inputs governing instance identity (IDs) must remain stable during a mount.

## Queries, content and templates

Use `ViewChild` / `viewChild` for a wrapper-owned element and content queries for projected content. A conditional target can be absent; do not use required/static queries across an `@if` that removes it. Put the imperative wrapper itself behind the condition when that simplifies ownership.

Project ordinary headings/actions/body through `ng-content`, preserving the exact DOM structure. Do not project arbitrary interactive content into a native button. For repeated or deferred content use a typed `TemplateRef<Context>` and `NgTemplateOutlet`, and ensure the rendered roots match the component contract (e.g. slides remain `li` children of the list). `ng-content` is not a lazy instantiation API. Avoid `innerHTML` for component composition.

Angular owns stable, page-unique IDs. Prefer IDs derived from stable domain keys supplied by the parent. Random IDs and process-global counters can differ across server/client render. Wire only the relationships needed by the component: `for`, `aria-labelledby`, `aria-describedby`, `aria-controls` and public data targets.

## State and lifecycle

Do not mutate a plugin's `show`/`collapsed` classes from Angular while asking the plugin to manage transitions. Expose desired state, request it through public methods and reconcile completion events. Use documented events, exact listener cleanup, guarded asynchronous imports, and `DestroyRef` or `ngOnDestroy`. A condition or Router transition destroys views; design cleanup before implementation. Read [JavaScript](javascript.md) for actual activation and asynchronous closing constraints.

For Router navigation use `RouterLink` and `RouterLinkActive` with appropriate active-page semantics; preserve real anchors and do not cancel all link clicks. Let the application implement route focus restoration and avoid treating navigation dropdowns as ARIA application menus.

## Forms ownership

Angular owns value, validation, disabled, touched, dirty, synchronous/asynchronous validators and domain rules. Bootstrap Italia supplies markup, visual design, documented UI behavior and feedback presentation. The wrapper connects labels/descriptions/errors and exposes native semantics. Do not also initialize a Bootstrap Italia validation engine over the same control.

Use `ControlValueAccessor` for an actual reusable control participating in Angular Forms; styling-only wrappers/directives do not necessarily need one. Implement `writeValue`, `registerOnChange`, `registerOnTouched` and `setDisabledState`; do not emit user-change callbacks from `writeValue`. Report touched on blur and let Angular manage dirty/validation. Keep domain validators in the parent/form; explicit visual-error inputs derive from that same state. See the [CVA example](../examples/forms.md).

## Official Angular references

- [Inputs](https://angular.dev/guide/components/inputs), [outputs](https://angular.dev/guide/components/outputs) and [signals](https://angular.dev/guide/signals).
- [Queries](https://angular.dev/guide/components/queries), [projection](https://angular.dev/guide/components/content-projection) and [template fragments](https://angular.dev/guide/templates/ng-template).
- [Lifecycle](https://angular.dev/guide/components/lifecycle), [CVA](https://angular.dev/api/forms/ControlValueAccessor), [Router links](https://angular.dev/api/router/RouterLink) and [NgModules](https://angular.dev/guide/ngmodules/overview).
