import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleInvoiceRoutingModule } from './single-invoice-routing.module';
import {SingleInvoiceComponent} from './single-invoice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from '@angular/common/http';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';
import {Angular4PaystackModule} from 'angular4-paystack';


@NgModule({
  declarations: [SingleInvoiceComponent],
  imports: [
    CommonModule,
    SingleInvoiceRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule,
    BreadcrumbModule,
    Angular4PaystackModule.forRoot('pk_test_c98b92c0c8c5cd7d94150e06fc711d9ce1d1c53b'),
  ]
})
export class SingleInvoiceModule { }
