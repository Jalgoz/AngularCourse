import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

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

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  public isValidSimpleField(simpleField: FormControl): boolean | null {
    return this.validatorsService.isValidSimpleField(simpleField);
  }

  public isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return this.validatorsService.isValidFieldInArray(formArray, index);
  }

  getSimpleFieldError(simpleField: FormControl): string | null {
    return this.validatorsService.getSimpleFieldError(simpleField);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  getFieldArrayError(arrayField: FormArray, index: number): string | null {
    return this.validatorsService.getFieldArrayError(arrayField, index);
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
