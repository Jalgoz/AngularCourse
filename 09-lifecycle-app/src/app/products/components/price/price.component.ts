import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styles: ``,
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public price: number = 0;
  private interval$?: Subscription; // $ is a convention to indicate that this is an observable

  public ngOnInit(): void {
    console.log('PriceComponent: ngOnInit');
    this.interval$ = interval(1000).subscribe((value) => {
      console.log(`Tick: ${value}`);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
    console.log('PriceComponent: ngOnChanges');
  }

  public ngOnDestroy(): void {
    console.log('PriceComponent: ngOnDestroy');
    // Always unsubscribe from the observable to prevent memory leaks
    // Exception: If the observable completes on its own, you don't need to unsubscribe
    // Example the http client observables complete on their own
    // Also destroy addEventListener
    this.interval$?.unsubscribe();
  }
}
