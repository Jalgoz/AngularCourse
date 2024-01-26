import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debounderSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  ngOnInit(): void {
    // When the component is created
    this.debounderSubscription = this.debouncer
      .pipe(
        debounceTime(1000) // If 1 second pass, we send the subscribe if not we don't send anything in the subscribe
      )
      .subscribe((value) => {
        this.emitValue(value);
      });
  }

  ngOnDestroy(): void {
    // When the components is destroyed
    this.debounderSubscription?.unsubscribe();
  }

  public emitValue(value: string): void {
    this.onValue.emit(value);
  }

  public onKeyPress(query: string) {
    this.debouncer.next(query);
  }
}
