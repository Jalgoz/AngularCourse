import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css'],
})
export class CounterPageComponent {
  public counter = signal<number>(10);
  public squareCounter = computed(() => this.counter() ** 2);

  public reset(): void {
    this.counter.set(0);
  }

  public increaseBy(value: number): void {
    this.counter.update((current) => current + value);
  }

  public decreaseBy(value: number): void {
    this.counter.update((current) => current + value);
  }
}
