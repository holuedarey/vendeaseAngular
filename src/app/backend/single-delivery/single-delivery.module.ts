import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleDeliveryRoutingModule } from './single-delivery-routing.module';
import {SingleDeliveryComponent} from './single-delivery.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from '@angular/common/http';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [SingleDeliveryComponent],
  imports: [
    CommonModule,
    SingleDeliveryRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule,
    BreadcrumbModule,
  ]
})
export class SingleDeliveryModule { }
