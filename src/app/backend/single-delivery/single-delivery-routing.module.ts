import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleDeliveryComponent} from './single-delivery.component';

const routes: Routes = [
  {path: '', component: SingleDeliveryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleDeliveryRoutingModule { }
