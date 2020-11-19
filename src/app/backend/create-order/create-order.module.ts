import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrderRoutingModule } from './create-order-routing.module';
import {CreateOrderComponent} from './create-order.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [CreateOrderComponent],
  imports: [
    CommonModule,
    CreateOrderRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      BreadcrumbModule,
  ]
})
export class CreateOrderModule { }
