import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuaranteeComponent } from './guarantee.component';

const routes: Routes = [
  {path:"", component: GuaranteeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuaranteeRoutingModule { }
