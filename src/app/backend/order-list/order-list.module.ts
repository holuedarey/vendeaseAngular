import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';
import {OrderListComponent} from './order-list.component';


@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule,
    NgxPaginationModule,
    BreadcrumbModule
  ]
})
export class OrderListModule { }
