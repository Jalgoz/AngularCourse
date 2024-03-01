import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { AuthService } from '../../services/auth.service';
import type { RegisterUser } from '../../interfaces';

@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private validationService: ValidationService = inject(ValidationService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
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

    delete this.myForm.value.confirmPassword;

    const user = this.myForm.value as RegisterUser;
    this.authService.register(user).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (error) => {
        this.myForm.controls[error.field]?.setErrors({ login: error.message });
        Swal.fire('Error', error.message, 'error');
      },
    });
  }

  public isValidForm(): boolean {
    return this.myForm.status === 'VALID';
  }
}
