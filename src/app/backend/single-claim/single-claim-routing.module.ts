import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleClaimComponent} from './single-claim.component';

const routes: Routes = [
  {path: '', component: SingleClaimComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleClaimRoutingModule { }
