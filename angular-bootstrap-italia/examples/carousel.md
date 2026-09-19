# Carousel: two items through public configuration

Baseline: Angular 20.3.0, TypeScript 5.9.2, Bootstrap Italia 2.18.3 with Splide 4.1.4. Sources: [Bootstrap Italia Carousel](https://italia.github.io/bootstrap-italia/docs/componenti/carousel/), [versioned implementation](https://github.com/italia/bootstrap-italia/blob/v2.18.3/src/js/plugins/carousel.js), [Splide options](https://splidejs.com/guides/options/) and [Splide 4.1.4 constructor](https://github.com/Splidejs/splide/blob/7b29da34200f9e135814672081132b8828d3eb3b/src/js/core/Splide/Splide.ts).

## Verified contract and limit

- `Carousel` is the public export since Bootstrap Italia 2.14.0. The source's internal class name `CarouselBI` is not the import name.
- `new Carousel(element)` accepts only the element. Do not invent a second configuration argument.
- `data-bs-carousel-splide` opts into a window-load scan; it does not observe Angular route/view creation after load. This manual wrapper omits it.
- `data-splide` is a documented configuration channel. Splide parses its JSON and merges it over the options passed by Bootstrap Italia. `perPage`, `perMove`, `breakpoints`, `arrows`, `pagination`, `drag`, `autoplay` and `i18n` are real Splide options; verify their passage through the installed integration.
- The three-column class contributes responsive presets. Override the relevant nested breakpoints as well as top-level `perPage`. Keep preset layout/padding unless a separately tested change is needed.
- Use generated arrows/pagination and built-in drag/resize. Bootstrap Italia does not expose Splide's `go()`, `refresh()`, `on()` or `destroy()` as Carousel methods, nor Splide events as Bootstrap DOM events.
- Cleanup is `Carousel.dispose()`. In 2.18.3 it calls Splide's `destroy()` and removes the Bootstrap instance. `_splide` and `_config` remain private even though they appear in typings.

## Angular implementation

Global Bootstrap Italia CSS is required. The parent supplies stable, unique IDs and immutable item arrays. Each array replacement disposes the instance in `ngOnChanges`, before Angular updates the slides, then mounts after rendering. This intentionally resets position to the start. Stale asynchronous imports cannot resurrect a destroyed instance. It does not promise in-place refresh or position preservation.

```ts
import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ErrorHandler,
  Injector, OnChanges, afterNextRender, inject, input, viewChild,
} from '@angular/core';
import type { Carousel } from 'bootstrap-italia';

export interface CarouselItem { readonly id: string; readonly title: string; readonly text: string; }

@Component({
  selector: 'app-bi-carousel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 [id]="carouselId() + '-title'">{{ label() }}</h2>
    @if (items().length) {
      <section #root [id]="carouselId()" [attr.aria-labelledby]="carouselId() + '-title'"
        class="it-carousel-wrapper it-carousel-landscape-abstract-three-cols-arrow-visible splide"
        [attr.data-splide]="optionsJson">
        <div class="splide__track">
          <ul class="splide__list">
            @for (item of items(); track item.id) {
              <li class="splide__slide">
                <div class="it-single-slide-wrapper p-2">
                  <article class="it-card rounded border">
                    <h3 class="it-card-title">{{ item.title }}</h3>
                    <div class="it-card-body"><p class="it-card-text">{{ item.text }}</p></div>
                  </article>
                </div>
              </li>
            }
          </ul>
        </div>
      </section>
    } @else {
      <p>Nessun contenuto disponibile.</p>
    }
  `,
})
export class BiCarouselComponent implements OnChanges {
  readonly carouselId = input.required<string>();
  readonly label = input.required<string>();
  readonly items = input.required<readonly CarouselItem[]>();
  readonly optionsJson = JSON.stringify({
    perPage: 2, perMove: 1, arrows: true, pagination: true, drag: true, autoplay: false,
    breakpoints: { 768: { perPage: 1, arrows: true }, 992: { perPage: 2, arrows: true } },
  });
  private readonly root = viewChild<ElementRef<HTMLElement>>('root');
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly errors = inject(ErrorHandler);
  private instance?: Carousel;
  private generation = 0;

  constructor() {
    this.destroyRef.onDestroy(() => { ++this.generation; this.instance?.dispose(); });
  }

  ngOnChanges(): void {
    this.instance?.dispose();
    this.instance = undefined;
    const generation = ++this.generation;
    afterNextRender(() => {
      void this.mount(generation).catch(error => this.errors.handleError(error));
    }, { injector: this.injector });
  }

  private async mount(generation: number): Promise<void> {
    if (!this.items().length) return;
    const { Carousel } = await import('bootstrap-italia');
    if (this.destroyRef.destroyed || generation !== this.generation) return;
    const element = this.root()?.nativeElement;
    if (element) this.instance = new Carousel(element);
  }
}
```

Avoid changing data while focus is inside a slide or generated control without an explicit focus-recovery policy. If focus must be preserved, define its destination in Angular before recreation and test it; do not retain a detached element or reach into `_splide`. This example has no autoplay and no clone-producing loop mode. Do not add arbitrary IDs to a loop-mode slide template without checking clones.

## Mandatory decision before customization

For a different installed version, verify docs, exports, JSON precedence, responsive geometry, indicators, navigation, drag, accessibility and disposal before claiming two-item support. Never use `.splide__slide { width: 50%; }` to fake the count. If the public path fails, STOP using the [six-part limit response](../references/customization-policy.md). Do not access `_splide`, patch presets, instantiate an independent Splide engine or substitute another carousel. Run the [Carousel test matrix](../references/testing.md).
