# Customizable wrapper: action layout

Baseline: Angular 20.3.0 and Bootstrap Italia 2.18.3. This composes the [simple button wrapper](simple-wrapper.md) with application-owned layout CSS. It uses documented [button variants](https://italia.github.io/bootstrap-italia/docs/componenti/buttons/); `action-layout` and `--app-action-gap` belong to the application, not Bootstrap Italia.

```ts
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BiButtonComponent } from './simple-wrapper';

@Component({
  selector: 'app-bi-actions',
  standalone: true,
  imports: [BiButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="action-layout" [class.stacked]="stacked()">
      <app-bi-button variant="secondary" (activated)="cancelled.emit()">Annulla</app-bi-button>
      <app-bi-button [disabled]="busy()" (activated)="confirmed.emit()">Conferma</app-bi-button>
    </div>
  `,
  styles: `
    :host { display: block; }
    .action-layout { display: flex; flex-wrap: wrap; gap: var(--app-action-gap, 1rem); }
    .action-layout.stacked { flex-direction: column; align-items: flex-start; }
  `,
})
export class BiActionsComponent {
  readonly stacked = input(false);
  readonly busy = input(false);
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
```

Place the two example modules side by side when copying them. A consumer may set `--app-action-gap` on `app-bi-actions` from its own stylesheet. This changes spacing around intact Bootstrap Italia buttons, without reaching through encapsulation or changing contrast/focus styles. Test long translated labels, zoom, wrapping, disabled actions and keyboard order. For theme colors, use the version's documented Sass entry points in [integration](../references/bootstrap-italia-integration.md).
