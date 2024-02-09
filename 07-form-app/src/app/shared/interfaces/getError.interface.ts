import { ValidationErrors } from '@angular/forms';

export interface GetError {
  (errors: ValidationErrors, message?: string): string | null;
}
