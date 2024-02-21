import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService);
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
}
