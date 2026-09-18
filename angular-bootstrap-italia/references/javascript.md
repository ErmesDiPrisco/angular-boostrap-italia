# JavaScript, activation and lifecycle

Use [Bootstrap Italia documentation](https://italia.github.io/bootstrap-italia/) and the installed package together. Generic Bootstrap constructors/options are not evidence for Bootstrap Italia.

## One instance owner, component-specific activation

Distinguish delegated user interaction from automatic scanning. In the 2.18.3 baseline:

- Carousel's `data-bs-carousel-splide` is scanned on window `load`; late Angular views need explicit construction. `data-splide` configures Splide but does not itself initialize the component.
- Dropdown's `data-bs-toggle="dropdown"` participates in delegated click, keyboard and outside-click behavior. A manually retained instance can coexist with that attribute because handlers use `getOrCreateInstance`. Do not add an Angular `toggle()` click handler as well.
- Modal can use programmatic `show()`/`hide()` without data toggle/dismiss attributes. The wrapper then owns the focus-return target; data-API focus restoration is not automatically provided by a constructor call.
- Not every plugin has the same activation event, constructor signature or disposal behavior. Verify it separately.

Never construct two instances for the same element. Do not load both a global bundle and another independent module copy. Retrieve an existing instance only when its ownership and disposal contract are known; do not silently take over someone else's component.

## Browser boundary and Angular lifetime

Use type-only imports for declarations and browser-only dynamic imports when the package evaluates DOM globals. A static runtime import can fail during SSR before a platform check executes. In the example baseline, register `afterNextRender` in an injection context (or supply an `Injector`) and create instances inside its callback, not during component construction. It does not run on the server. On older Angular, use supported platform checks and view hooks, verifying DOM readiness and hydration separately.

Use `ViewChild` / `viewChild` or content queries for scoped elements. Do not use `document.querySelector`, `document.getElementById`, `classList.add` or `classList.remove` for state Angular can express. Public DOM API calls required by the integration (e.g. focus restoration) belong at the wrapper boundary.

Retain instances and exact listener function references. Bridge library callbacks into Angular with signals/outputs and, for zone-based applications, `NgZone.run` as needed. Avoid duplicate notifications and desired-state/event feedback loops.

After every asynchronous import, check `DestroyRef.destroyed` or a compatible destruction flag. For repeated initialization requests, use a generation token so only the newest rendered view can mount. Never initialize from `ngAfterViewChecked` on every check.

## Cleanup is more than dispose

Remove wrapper listeners, cancel subscriptions/timers/observers created by the wrapper and invoke the verified public cleanup method. Do not remove library-owned listeners manually or access private registries.

Modal `hide()` is normally asynchronous when `fade` is used. Wait for `hidden.bs.modal` before disposal/view removal; `dispose()` alone is not a close operation. Destruction hooks cannot delay Angular removal. Use an application close-before-remove contract or a verified non-animated integration, as in the [Modal example](../examples/modal.md). Collapse transition teardown also requires testing; do not assume inherited `dispose()` cancels queued transition callbacks.

For Carousel dynamic data, dispose before Angular changes slide DOM and reconstruct after render, or use a separately verified public update API. Bootstrap Italia 2.18.3 has no public `refresh()` or `go()` wrapper method. Do not reach through `_splide`.

## SSR and hydration

Keep server/client initial markup and IDs deterministic. Browser guards alone do not make third-party DOM mutation hydration-safe. `afterNextRender` is not a blanket guarantee that all incrementally hydrated child content is ready. Check the application's hydration mode, projected content and timing before mounting. If a localized `ngSkipHydration` boundary is necessary, apply it only to a component host after assessing the tradeoff; do not disable hydration globally. See [Angular hydration](https://angular.dev/guide/hydration) and [lifecycle](https://angular.dev/guide/components/lifecycle).

Report SSR/hydration checks independently from browser-only tests; never label the latter as proof of SSR compatibility.
