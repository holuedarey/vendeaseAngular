import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleOrderRoutingModule } from './single-order-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from '@angular/common/http';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';
import {SingleOrderComponent} from './single-order.component';


@NgModule({
  declarations: [SingleOrderComponent],
  imports: [
    CommonModule,
    SingleOrderRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule,
    BreadcrumbModule,
  ]
})
export class SingleOrderModule { }
