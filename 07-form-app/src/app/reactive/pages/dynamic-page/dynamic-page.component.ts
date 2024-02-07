import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', [Validators.required, Validators.minLength(3)]],
        // ['Death Stranding', Validators.required],
      ],
      Validators.required
    ),
  });
  public newFavorite: FormControl = new FormControl('', [
    Validators.minLength(3),
  ]);

  constructor(private fb: FormBuilder) {}

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  public isValidSimpleField(simpleField: FormControl): boolean | null {
    return simpleField.errors && simpleField.touched;
  }

  getSimpleFieldError(simpleField: FormControl): string | null {
    if (!simpleField) return null;

    const errors = simpleField.errors;

    if (!errors) return null;

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must have at least ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return `The minimum value is ${errors['min'].min}`;
      }
    }

    return null;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors;

    if (!errors) return null;

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must have at least ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return `The minimum value is ${errors['min'].min}`;
      }
    }

    return null;
  }

  getFieldArrayError(arrayField: FormArray, index: number): string | null {
    if (!arrayField.controls[index]) return null;

    const errors = arrayField.controls[index].errors;

    if (!errors) return null;

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must have at least ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return `The minimum value is ${errors['min'].min}`;
      }
    }

    return null;
  }

  public isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  public onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;

    this.favoriteGames.push(
      new FormControl(this.newFavorite.value, [
        Validators.required,
        Validators.minLength(3),
      ])
    );
    this.newFavorite.reset();
  }

  public onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  public onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
    this.favoriteGames.clear();
  }
}
