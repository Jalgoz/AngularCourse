import { ValidationErrors } from '@angular/forms';

export const getErrorFunction = (
  errors: ValidationErrors,
  message?: string
): string | null => {
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
};
