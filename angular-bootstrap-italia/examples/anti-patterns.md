# Anti-patterns and safe alternatives

These are rejected patterns, not implementation examples. The supported alternatives are linked so an agent does not have to invent a replacement.

| Rejected pattern | Why it fails | Safe direction |
| --- | --- | --- |
| `new Carousel(element, { perPage: 2 })` on Bootstrap Italia 2.18.3 | The verified constructor accepts only the element | Verified `data-splide` JSON, including breakpoints, in [Carousel](carousel.md) |
| `.splide__slide { width: 50%; }` to change per-page count | Geometry and engine navigation/indicators disagree | Public configuration and browser geometry tests |
| `carousel._splide.refresh()` | A typed underscore member is still private | Dispose/recreate with the stated reset policy, or STOP if preservation is essential |
| Bind `[class.show]` while a plugin toggles the same class | Two owners fight during transitions and state reconciliation | Public API plus completion events |
| Add an Angular toggle click handler to a delegated `data-bs-toggle` button | One click may toggle twice | One interaction path, as in [Dropdown](interactive-wrapper.md) |
| Static browser-dependent import followed by a platform guard | The module may evaluate before the guard | Browser-only dynamic import and a destruction guard |
| `modal.dispose()` while open, without closing | Hiding/scroll restoration is not equivalent to disposal | [Modal close-before-dispose](modal.md) |
| Generate IDs with random values during SSR | Server/client IDs and ARIA targets may differ | Stable IDs supplied from application identity |
| Use `document.querySelector`, `document.getElementById` or `classList` for Angular state | Global targeting bypasses wrapper ownership | Angular bindings and scoped view/content queries |
| Emit CVA `onChange` from `writeValue` | Programmatic updates become fake user edits | [Forms ownership](forms.md) |
| Patch package JS/SCSS, copy an internal engine, or install another UI library | Crosses the specified foundation/read-only boundary | [Six-part STOP response](../references/customization-policy.md) |

Do not call a real class “invented” merely because it also exists in Bootstrap. Verify it against the installed Bootstrap Italia version. The rule is evidence, not a blanket rejection of shared class names.
