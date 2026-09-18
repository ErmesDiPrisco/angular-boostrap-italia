# Simple wrapper: native button

Baseline: Angular 20.3.0, TypeScript 5.9.2, Bootstrap Italia 2.18.3. Recheck installed versions before adaptation. The [official Buttons contract](https://italia.github.io/bootstrap-italia/docs/componenti/buttons/) supplies `btn`, `btn-primary`, `btn-secondary` and native disabled behavior. This component needs global Bootstrap Italia CSS, not a JavaScript instance.

```ts
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-bi-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="btn" [class.btn-primary]="variant() === 'primary'"
      [class.btn-secondary]="variant() === 'secondary'"
      [type]="type()" [disabled]="disabled()" (click)="activated.emit($event)">
      <ng-content />
    </button>
  `,
})
export class BiButtonComponent {
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly activated = output<MouseEvent>();
}
```

Usage in a parent importing `BiButtonComponent`:

```html
<app-bi-button [disabled]="saving()" (activated)="save()">Salva</app-bi-button>
```

`saving` and `save` are the consuming application's state and action. Project a non-empty text label, never another interactive element. Native keyboard activation and form submission are preserved. Verify that one click produces one output and disabled buttons produce none.
