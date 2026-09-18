# Testing and review

## Host application checks

Run the existing package-manager scripts for formatting/lint, TypeScript, unit tests and Angular production build. Inspect `package.json` first; do not invent a project's script names or add a test framework without need. Require strict wrapper typing/template checking, with no `any` escape for unsupported APIs. Separate pre-existing third-party declaration defects from wrapper errors; document any `skipLibCheck` use.

## Concrete lifecycle matrix

| Scenario | Assert |
| --- | --- |
| Initial render | Exactly one instance after target DOM exists; no SSR-time DOM import |
| Delayed import then destroy | No late construction, detached DOM mutation or output |
| Repeated creation/destruction | Instance removed, wrapper listeners/timers/subscriptions gone |
| Conditional recreation and route changes | New instance targets new elements; no stale references |
| Repeated open/close | One completion output per transition; no feedback loops |
| Destroy while open/transitioning | Backdrop, scroll lock, focus and queued transitions handled by the documented lifecycle contract |
| Multiple instances | Unique IDs, resolved ARIA references, independent state |
| New/removed projected or repeated content | Correct queries, initialized DOM, focus recovery and cleanup |
| SSR/hydration, if present | Server render succeeds, deterministic IDs/markup, no hydration mismatch or early third-party mutation |

Use test doubles to isolate wrapper state/cleanup and at least one real-browser integration test with the actual Bootstrap Italia package. A mock constructor cannot validate its real signatures, side effects or transitions. Exercise destruction both before and after an asynchronous import finishes.

## Forms and accessibility

Verify CVA user input, programmatic writes/reset/null, blur/touched, dirty, disabled state, synchronous/asynchronous validation and `updateOn` behavior. `writeValue` must not emit a user change. Check labels, help/error IDs and semantic invalid/required states.

Browser checks include keyboard navigation and focus, accessible names/states, automated axe or equivalent, manual screen-reader use for stateful widgets, reduced motion, zoom, narrow/wide viewports and repeated instances. A passing automated check does not replace manual assistive-technology checks.

## Carousel matrix

- Item counts: 0, 1, fewer than per-page, exactly per-page, one extra, odd/non-divisible and larger counts.
- Geometry: count fully visible slides at mobile/tablet/desktop sizes and around each configured breakpoint, before and after resize in both directions. Check container resizing, not just a first-load screenshot.
- Navigation: previous/next, first/last positions, rewind/loop as configured, pagination count and selected state; no dead or duplicate controls.
- Drag/swipe and keyboard: direction, end behavior, focusable controls and offscreen content. Test actual touch/pointer behavior when required.
- Data: add/remove/reorder/replace, including empty-to-populated and populated-to-empty, rapid changes during lazy import and while interacting. Verify the declared position/focus reset policy.
- Cleanup: destroy, resize after destruction, recreate and repeat. Assert no ghost listeners, generated control duplication or resurrected slider.
- Accessibility: name, translated labels, pagination, announcements, clones/IDs, focus recovery and autoplay controls if enabled.

A visual two-item width with an engine still computing three items fails. If satisfying the matrix requires private access or rewriting the engine, apply STOP.

## This repository's validation scope

The root `validation/` tooling extracts the six complete TypeScript modules from Markdown, checks Angular templates and TypeScript with `ngc`, bundles a fixture, and runs real browser/axe tests. It is maintainer tooling, not an Angular library or a required part of skill installation. See the root audit report for actual test results and unexecuted host-specific checks; do not infer SSR or full assistive-technology coverage from that fixture.
