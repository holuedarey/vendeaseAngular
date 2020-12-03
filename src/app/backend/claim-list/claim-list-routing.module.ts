import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClaimComponent} from '../invoice-list/claim/claim.component';
import { ClaimListComponent } from './claim-list.component';

const routes: Routes = [
  {path: '', component: ClaimListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimListRoutingModule { }
