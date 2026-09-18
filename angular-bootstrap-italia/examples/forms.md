# Form control: Angular value accessor

Baseline: Angular 20.3.0, TypeScript 5.9.2, Bootstrap Italia 2.18.3. Sources: [Input](https://italia.github.io/bootstrap-italia/docs/form/input/), [form introduction](https://italia.github.io/bootstrap-italia/docs/form/introduzione/), [versioned validation styles](https://github.com/italia/bootstrap-italia/blob/v2.18.3/src/scss/forms/_validation.scss) and [ControlValueAccessor](https://angular.dev/api/forms/ControlValueAccessor).

Angular owns value, disabled, validation, touched, dirty and domain rules. Bootstrap Italia provides the field structure, styling and feedback presentation; the wrapper connects that feedback accessibly. No second validator is instantiated. `active` keeps the label raised; the `it-bs-static` DOM attribute is verified in [2.18.3 InputLabel source](https://github.com/italia/bootstrap-italia/blob/v2.18.3/src/js/plugins/input-label.js) to suppress floating-label listeners. This is package-source evidence, not a claim that the Input documentation describes the attribute. Recheck it before using another version; do not call the internal InputLabel methods.

```ts
import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-bi-text-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BiTextFieldComponent),
    multi: true,
  }],
  template: `
    <div class="form-group">
      <label class="active" it-bs-static [for]="controlId()">{{ label() }}</label>
      <input #field class="form-control" [id]="controlId()" [type]="type()"
        [value]="value()" [disabled]="disabled()" [required]="required()"
        [class.is-invalid]="invalid()" [attr.aria-invalid]="invalid() ? 'true' : null"
        [attr.aria-describedby]="describedBy()"
        (input)="updateValue(field.value)" (blur)="markTouched()">
      @if (help()) { <small class="form-text" [id]="controlId() + '-help'">{{ help() }}</small> }
      @if (invalid() && error()) {
        <div class="invalid-feedback" [id]="controlId() + '-error'">{{ error() }}</div>
      }
    </div>
  `,
})
export class BiTextFieldComponent implements ControlValueAccessor {
  readonly controlId = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<'text' | 'email' | 'tel'>('text');
  readonly required = input(false);
  readonly help = input('');
  readonly error = input('');
  readonly invalid = input(false);
  readonly value = signal('');
  readonly disabled = signal(false);
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void { this.value.set(value ?? ''); }
  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.disabled.set(disabled); }
  updateValue(value: string): void { this.value.set(value); this.onChange(value); }
  markTouched(): void { this.onTouched(); }
  describedBy(): string | null {
    const ids = [this.help() ? this.controlId() + '-help' : '',
      this.invalid() && this.error() ? this.controlId() + '-error' : ''].filter(Boolean);
    return ids.join(' ') || null;
  }
}
```

Parent integration (in a component importing `ReactiveFormsModule` and `BiTextFieldComponent`):

```html
<app-bi-text-field controlId="applicant-name" label="Nome" [formControl]="name"
  [required]="true" [invalid]="name.invalid && name.touched"
  help="Inserisci il nome del richiedente." error="Il nome è obbligatorio." />
```

The parent creates a non-nullable `FormControl<string>` with `Validators.required`. `required` on the wrapper communicates native semantics; the Angular validator remains the business rule. Require a non-empty error message when showing an error. `writeValue()` never calls `onChange`; only user input does. Blur reports touched, Angular marks dirty, and `control.disable()` calls `setDisabledState()`. Test reset/null, programmatic writes, `updateOn: 'blur'`, disabled input and error ID removal. A field that only styles an existing native control may instead use a directive or projection and need no CVA.
