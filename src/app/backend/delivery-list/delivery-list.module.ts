import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryListRoutingModule } from './delivery-list-routing.module';
import {DeliveryListComponent} from './delivery-list.component';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [DeliveryListComponent],
  imports: [
    CommonModule,
    DeliveryListRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule,
    NgxPaginationModule,
    BreadcrumbModule
  ]
})
export class DeliveryListModule { }
