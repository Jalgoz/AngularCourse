import { Injectable } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  FormGroup,
  FormArray,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public firstNameAndLastNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public passwordPattern: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  };

  public isValidSimpleField(simpleField: FormControl): boolean | null {
    return simpleField.errors && simpleField.touched;
  }

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getSimpleFieldError(
    simpleField: FormControl,
    message?: string
  ): string | null {
    if (!simpleField) return null;

    const errors = simpleField.errors;

    if (!errors) return null;

    return this.getError(errors, message);
  }

  getFieldError(
    form: FormGroup,
    field: string,
    message?: string
  ): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors;

    if (!errors) return null;

    return this.getError(errors, message);
  }

  getFieldArrayError(
    arrayField: FormArray,
    index: number,
    message?: string
  ): string | null {
    if (!arrayField.controls[index]) return null;

    const errors = arrayField.controls[index].errors;

    if (!errors) return null;

    return this.getError(errors, message);
  }

  private getError(errors: ValidationErrors, message?: string): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must have at least ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return `The minimum value is ${errors['min'].min}`;
        case 'email':
          return 'The email is not valid';
        case 'noStrider':
          return 'You cannot use Strider as a username';
        case 'pattern':
          return message ? message : 'The pattern is not valid';
      }
    }

    return null;
  }
}
