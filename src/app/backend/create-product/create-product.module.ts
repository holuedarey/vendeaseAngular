import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProductRoutingModule } from './create-product-routing.module';
import {CreateProductComponent} from './create-product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    CreateProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BreadcrumbModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ]
})
export class CreateProductModule { }
