import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'products-page',
  templateUrl: './product-page.component.html',
  styles: ``,
})
export class ProductPageComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  public isProductVisible: boolean = true;
  public currentPrice: number = 10;

  constructor() {
    console.log('ProductPageComponent: constructor');
  }

  public ngOnInit(): void {
    console.log('ngOnInit');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
    console.log('ngOnChanges');
  }

  public ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  public ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  public ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  public ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  public ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  public ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  public increasePrice(): void {
    this.currentPrice += 10;
  }
}
