import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordConfirmRoutingModule } from './forget-password-confirm-routing.module';
import { ForgetPasswordConfirmComponent } from './forget-password-confirm.component';


@NgModule({
  declarations: [ForgetPasswordConfirmComponent],
  imports: [
    CommonModule,
    ForgetPasswordConfirmRoutingModule
  ]
})
export class ForgetPasswordConfirmModule { }
