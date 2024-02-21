import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { GetErrorsService } from 'src/app/shared/services/get-errors.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService);
  private getErrorsService = inject(GetErrorsService);
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public login() {
    if (!this.isValidForm()) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }

  public isValidForm(): boolean {
    return this.myForm.status === 'VALID';
  }

  public isValidField(field: string): boolean {
    return this.validationService.isValidField(this.myForm, field);
  }

  public getErrors(field: string, message?: string): string | null {
    return this.getErrorsService.getFieldError(
      this.myForm.get(field) as FormControl,
      message
    );
  }
}
