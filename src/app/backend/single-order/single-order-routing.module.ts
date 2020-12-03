import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleOrderComponent } from './single-order.component';

const routes: Routes = [
  {path: '', component: SingleOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleOrderRoutingModule { }
