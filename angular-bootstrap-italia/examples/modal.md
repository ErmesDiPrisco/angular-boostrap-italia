# Modal wrapper with controlled state

Baseline: Angular 20.3.0, TypeScript 5.9.2, Bootstrap Italia 2.18.3. Sources: [Modale documentation](https://italia.github.io/bootstrap-italia/docs/componenti/modale/) and [versioned public implementation](https://github.com/italia/bootstrap-italia/blob/v2.18.3/src/js/plugins/modal.js).

This example uses the documented non-animated variant (no `fade`). That makes show/hide completion synchronous in this baseline, so hide-before-dispose also works during Angular destruction. `dispose()` alone does not complete the modal's hide path (body class/scrollbar restoration). Do not add `fade` without implementing a parent-controlled close, waiting for `hidden.bs.modal`, and only then removing the view or navigating. Angular destruction hooks cannot await that transition.

```ts
import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ErrorHandler,
  NgZone, afterNextRender, effect, inject, input, output, signal, viewChild,
} from '@angular/core';
import type { Modal } from 'bootstrap-italia';

@Component({
  selector: 'app-bi-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #root class="modal" tabindex="-1" aria-hidden="true"
      [id]="modalId()" [attr.aria-labelledby]="modalId() + '-title'">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h2 class="modal-title" [id]="modalId() + '-title'">{{ title() }}</h2></div>
        <div class="modal-body"><ng-content /></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" (click)="requestClose()">Chiudi</button>
        </div>
      </div></div>
    </div>
  `,
})
export class BiModalComponent {
  readonly modalId = input.required<string>();
  readonly title = input.required<string>();
  readonly opened = input(false);
  readonly openedChange = output<boolean>();
  readonly restoreFocusTo = input<HTMLElement | null>(null);
  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');
  private readonly ready = signal(false);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errors = inject(ErrorHandler);
  private readonly zone = inject(NgZone);
  private instance?: Modal;

  constructor() {
    afterNextRender(() => { void this.initialize().catch(error => this.errors.handleError(error)); });
    effect(() => {
      const opened = this.opened();
      if (!this.ready()) return;
      if (opened) this.instance?.show();
      else this.instance?.hide();
    });
  }

  requestClose(): void { this.openedChange.emit(false); }

  private async initialize(): Promise<void> {
    const { Modal } = await import('bootstrap-italia');
    if (this.destroyRef.destroyed) return;
    const element = this.root().nativeElement;
    const restoreFocus = () => {
      const target = this.restoreFocusTo();
      if (target?.isConnected) target.focus();
    };
    const hidden = () => {
      restoreFocus();
      this.zone.run(() => this.openedChange.emit(false));
    };
    element.addEventListener('hidden.bs.modal', hidden);
    this.instance = new Modal(element, { backdrop: true, keyboard: true, focus: true });
    this.ready.set(true);
    this.destroyRef.onDestroy(() => {
      element.removeEventListener('hidden.bs.modal', hidden);
      this.instance?.hide();
      this.instance?.dispose();
      if (this.opened()) restoreFocus();
    });
  }
}
```

Parent usage (import the component; `dialogOpen` is a boolean signal):

```html
<button #launch type="button" class="btn btn-primary" (click)="dialogOpen.set(true)">Dettagli</button>
<app-bi-modal modalId="details-dialog" title="Dettagli" [(opened)]="dialogOpen" [restoreFocusTo]="launch">
  <p>Informazioni sul servizio selezionato.</p>
</app-bi-modal>
```

Keep the wrapper mounted while `opened` changes. There is one controlled state contract: the parent accepts `openedChange`, including Escape and backdrop dismissal. Do not attach event handlers that cancel `show.bs.modal`/`hide.bs.modal` to this minimal wrapper, nest dialogs, or add animation. Those require a separately verified state/teardown policy. For route removal, focus the destination heading when the opener is removed. Bootstrap Italia supplies focus trapping, backdrop and dialog role/`aria-modal`; Angular supplies the accessible title and focus-return target. Do not force `aria-hidden` or `role` with live bindings against the plugin.
