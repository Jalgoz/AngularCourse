import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GetErrorsService } from 'src/app/shared/services/get-errors.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService);
  private getErrorsService = inject(GetErrorsService);
  public myForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: this.validationService.passwordsMatch(
        'password',
        'confirmPassword'
      ),
    }
  );

  public register() {
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
      this.myForm.get(field) as FormControl
    );
  }
}
