import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { GetError } from '../interfaces/getError.interface';

export const GET_ERROR_TOKEN = new InjectionToken<GetError>('getError');

@Injectable({
  providedIn: 'root',
})
export class GetMessageErrorsService {
  constructor(
    @Inject(GET_ERROR_TOKEN)
    private getError: GetError
  ) {}

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
}
