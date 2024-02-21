import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GetErrorsService {
  public getFieldError(
    field: FormControl | null,
    message?: string
  ): string | null {
    if (!field || !field.errors) return null;

    const errors = field.errors as ValidationErrors;

    return this.getError(errors, message);
  }

  public getError(errors: ValidationErrors, message?: string): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return message || 'This field is required';
        case 'email':
          return message || 'This field must be an email';
        case 'minlength':
          return (
            message ||
            `This field must have at least ${errors[key].requiredLength} characters`
          );
        case 'maxlength':
          return (
            message ||
            `This field must have at most ${errors[key].requiredLength} characters`
          );
        case 'notMatch':
          return message || 'Passwords do not match';
        default:
          return message || 'Invalid field';
      }
    }

    return null;
  }
}
