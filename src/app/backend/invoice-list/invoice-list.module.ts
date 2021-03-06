import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceListRoutingModule } from './invoice-list-routing.module';
import {InvoiceListComponent} from './invoice-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [InvoiceListComponent],
  imports: [
    CommonModule,
    InvoiceListRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule,
    NgxPaginationModule,
    BreadcrumbModule
  ]
})
export class InvoiceListModule { }
