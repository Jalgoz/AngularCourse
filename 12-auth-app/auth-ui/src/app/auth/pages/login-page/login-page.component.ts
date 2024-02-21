import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService);
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public login() {
    if (!this.isValidForm()) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  public isValidForm(): boolean {
    return this.myForm.status === 'VALID';
  }

  public isValidField(field: string): boolean {
    return this.validationService.isValidField(this.myForm, field);
  }
}
