import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterVendorRoutingModule } from './register-vendor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormWizardModule } from 'angular-wizard-form';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterVendorRoutingModule,
    FormWizardModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class RegisterVendorModule { }
