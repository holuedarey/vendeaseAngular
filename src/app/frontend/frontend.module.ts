import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { RegisterComponent } from './register/register.component';
// import { RegisterVendorComponent } from './register-vendor/register-vendor.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordConfirmComponent } from './forget-password-confirm/forget-password-confirm.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RegisterComponent, 
    // RegisterVendorComponent, 
    ResetPasswordComponent,
    ForgetPasswordConfirmComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    RouterModule
  ]
})
export class FrontendModule { }
