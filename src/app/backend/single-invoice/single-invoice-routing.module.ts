import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleInvoiceComponent} from './single-invoice.component';

const routes: Routes = [
  {path: '', component: SingleInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleInvoiceRoutingModule { }
