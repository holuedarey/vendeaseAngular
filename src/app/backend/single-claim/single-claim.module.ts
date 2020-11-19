import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { SingleClaimRoutingModule } from './single-claim-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from '@angular/common/http';
import {BreadcrumbModule} from '../breadcrumb/breadcrumb.module';
import {SingleClaimComponent} from './single-claim.component';


@NgModule({
  declarations: [SingleClaimComponent],
  imports: [
    CommonModule,
    SingleClaimRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatProgressBarModule,
    HttpClientModule,
    BreadcrumbModule,
  ]
})
export class SingleClaimModule { }
