import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { getErrorFunction } from 'src/app/shared/helpers/errors';
import {
  GET_ERROR_TOKEN,
  GetMessageErrorsService,
} from 'src/app/shared/services/getMessageErrors.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import type { GetError } from 'src/app/shared/interfaces/getError.interface';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [],
  providers: [
    {
      provide: GetMessageErrorsService,
      useFactory: (getError: GetError) => new GetMessageErrorsService(getError),
      deps: [GET_ERROR_TOKEN],
    },
    {
      provide: GET_ERROR_TOKEN,
      useValue: getErrorFunction,
    },
  ],
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorsService.firstNameAndLastNamePattern
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
        [new EmailValidatorService()],
      ],
      username: [
        '',
        [
          Validators.required,
          this.validatorsService.cantBeStrider,
          Validators.minLength(3),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.validatorsService.passwordPattern),
        ],
        ,
      ],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private getMessageErrorsService: GetMessageErrorsService
  ) {}

  public isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string, message?: string): string | null {
    return this.getMessageErrorsService.getFieldError(
      this.myForm,
      field,
      message
    );
  }

  public onSubmit(): void {
    if (this.myForm.status !== 'VALID') {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }
}
