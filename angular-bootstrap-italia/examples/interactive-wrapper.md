# Interactive wrapper: navigation dropdown

Baseline: Angular 20.3.0, TypeScript 5.9.2, Bootstrap Italia 2.18.3. [Dropdown documentation](https://italia.github.io/bootstrap-italia/docs/componenti/dropdown/) verifies the markup, `Dropdown`, `hide()`, `dispose()` and `shown.bs.dropdown` / `hidden.bs.dropdown`. Internal navigation uses Angular Router.

The wrapper creates one instance after render. Its `data-bs-toggle` is enabled only after construction: the verified delegated keyboard/click handlers retrieve that same instance. There is no competing Angular click handler. This is supported instance ownership with delegated interaction, not two independent initializers.

```ts
import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ErrorHandler,
  NgZone, afterNextRender, inject, input, output, signal, viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Dropdown } from 'bootstrap-italia';

export interface NavigationItem { readonly id: string; readonly label: string; readonly path: string; }

@Component({
  selector: 'app-bi-dropdown',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dropdown">
      <button #trigger class="btn btn-dropdown dropdown-toggle" type="button"
        [id]="triggerId()" [disabled]="!ready()"
        [attr.data-bs-toggle]="ready() ? 'dropdown' : null" aria-expanded="false">
        {{ label() }}
      </button>
      <div class="dropdown-menu" [attr.aria-labelledby]="triggerId()">
        <div class="link-list-wrapper">
          <ul class="link-list">
            @for (item of items(); track item.id) {
              <li><a class="dropdown-item list-item" [routerLink]="item.path">
                <span>{{ item.label }}</span>
              </a></li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class BiDropdownComponent {
  readonly triggerId = input.required<string>();
  readonly label = input.required<string>();
  readonly items = input.required<readonly NavigationItem[]>();
  readonly openedChange = output<boolean>();
  readonly ready = signal(false);
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly destroyRef = inject(DestroyRef);
  private readonly errors = inject(ErrorHandler);
  private readonly zone = inject(NgZone);
  private instance?: Dropdown;

  constructor() {
    afterNextRender(() => { void this.initialize().catch(error => this.errors.handleError(error)); });
  }

  private async initialize(): Promise<void> {
    const { Dropdown } = await import('bootstrap-italia');
    if (this.destroyRef.destroyed) return;
    const element = this.trigger().nativeElement;
    const shown = () => this.zone.run(() => this.openedChange.emit(true));
    const hidden = () => this.zone.run(() => this.openedChange.emit(false));
    element.addEventListener('shown.bs.dropdown', shown);
    element.addEventListener('hidden.bs.dropdown', hidden);
    this.instance = new Dropdown(element);
    this.ready.set(true);
    this.destroyRef.onDestroy(() => {
      element.removeEventListener('shown.bs.dropdown', shown);
      element.removeEventListener('hidden.bs.dropdown', hidden);
      this.instance?.hide();
      this.instance?.dispose();
    });
  }
}
```

Supply a stable unique `triggerId` and non-empty labels; retain that ID for the mounted instance. Do not bind Angular classes or ARIA over the plugin's open/closed DOM. The output lets Angular observe UI state without rewriting positioning. These are navigation links, so this example does not claim the ARIA application-menu pattern or assign `role="menu"` / `aria-haspopup="menu"`. Verify ArrowDown/ArrowUp, Escape, outside click, route teardown, dynamic links and duplicate outputs. See [lifecycle](../references/javascript.md) for SSR/hydration constraints.
