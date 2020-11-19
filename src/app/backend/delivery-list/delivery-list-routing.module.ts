import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeliveryListComponent} from './delivery-list.component';

const routes: Routes = [
  {path: '', component: DeliveryListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryListRoutingModule { }
