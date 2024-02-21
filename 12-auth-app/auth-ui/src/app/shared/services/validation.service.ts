import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public isValidField(form: FormGroup, field: string): boolean {
    return form.get(field)!.valid || !form.get(field)!.touched;
  }

  public passwordsMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const password1 = formGroup.get(password)?.value;
      const password2 = formGroup.get(confirmPassword)?.value;

      if (password1 !== password2) {
        formGroup.get(confirmPassword)?.setErrors({ notMatch: true });
        return { notMatch: true };
      }

      formGroup.get(confirmPassword)?.setErrors(null);
      return null;
    };
  }
}
