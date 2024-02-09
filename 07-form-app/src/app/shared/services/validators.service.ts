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

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValue1 = formGroup.controls[field1].value;
      const fieldValue2 = formGroup.controls[field2].value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.controls[field2].setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.controls[field2].setErrors(null);
      return null;
    };
  }

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
}
