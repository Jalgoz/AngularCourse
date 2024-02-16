import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  private fb = inject(FormBuilder);
  public color: string = 'red';
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
  });

  public changeColor(): void {
    this.color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
  }
}
