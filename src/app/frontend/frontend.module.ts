import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { HomeComponent } from './home/home.component';
import { GuaranteeComponent } from './guarantee/guarantee.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
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
    HomeComponent, 
    GuaranteeComponent, 
    AboutUsComponent, 
    ContactUsComponent, 
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
