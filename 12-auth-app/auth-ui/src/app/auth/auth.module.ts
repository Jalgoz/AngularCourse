import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
    InputFieldComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
