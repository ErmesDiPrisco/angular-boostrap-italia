import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { BiButtonComponent } from './simple-wrapper';
import { BiActionsComponent } from './customizable-wrapper';
import { BiDropdownComponent } from './interactive-wrapper';
import { BiCarouselComponent, CarouselItem } from './carousel';
import { BiModalComponent } from './modal';
import { BiTextFieldComponent } from './forms';

@Component({ selector: 'app-empty', standalone: true, template: '<p>Pagina servizio</p>' })
class EmptyPage {}

@Component({
  selector: 'app-audit', standalone: true,
  imports: [BiButtonComponent, BiActionsComponent, BiDropdownComponent, BiCarouselComponent, BiModalComponent, BiTextFieldComponent, ReactiveFormsModule],
  template: `
    <main>
      <h1>Verifica wrapper Bootstrap Italia</h1>
      <app-bi-button [disabled]="disabled()" (activated)="clicks.set(clicks() + 1)">Salva</app-bi-button>
      <span id="clicks">{{ clicks() }}</span>
      <app-bi-actions [stacked]="true" [busy]="disabled()" />
      <button id="launch" #launch class="btn btn-primary" type="button" (click)="opened.set(true)">Apri dettagli</button>
      @if (mounted()) {
        <app-bi-dropdown triggerId="navigation" label="Navigazione" [items]="links"
          (openedChange)="dropdownEvents.set(dropdownEvents() + 1)" />
        <app-bi-carousel carouselId="services" label="Servizi" [items]="items()" />
        <app-bi-modal modalId="details" title="Dettagli" [(opened)]="opened" [restoreFocusTo]="launch">
          <p>Informazioni sul servizio.</p>
        </app-bi-modal>
      }
      <form novalidate>
        <app-bi-text-field controlId="name" label="Nome" [formControl]="name" [required]="true"
          [invalid]="name.invalid && name.touched" help="Inserisci il nome." error="Il nome è obbligatorio." />
      </form>
      <span id="dropdown-events">{{ dropdownEvents() }}</span>
    </main>
  `,
})
export class AuditComponent {
  readonly disabled = signal(false);
  readonly clicks = signal(0);
  readonly opened = signal(false);
  readonly mounted = signal(true);
  readonly dropdownEvents = signal(0);
  readonly links = [{ id: 'service', label: 'Servizio', path: '/servizio' }, { id: 'contacts', label: 'Contatti', path: '/contatti' }];
  readonly items = signal<readonly CarouselItem[]>(this.makeItems(5));
  readonly name = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  makeItems(count: number): readonly CarouselItem[] {
    return Array.from({ length: count }, (_, index) => ({ id: `item-${index}`, title: `Servizio ${index + 1}`, text: 'Informazioni per accedere al servizio comunale.' }));
  }
}

bootstrapApplication(AuditComponent, {
  providers: [provideZonelessChangeDetection(), provideRouter([{ path: '**', component: EmptyPage }])],
}).then(app => { (window as unknown as { audit: AuditComponent }).audit = app.components[0].instance as AuditComponent; });
