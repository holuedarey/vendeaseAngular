  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordConfirmRoutingModule } from './forget-password-confirm-routing.module';
import { ForgetPasswordConfirmComponent } from './forget-password-confirm.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [ForgetPasswordConfirmComponent],
  imports: [
    CommonModule,
    ForgetPasswordConfirmRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ]
})
export class ForgetPasswordConfirmModule { }
