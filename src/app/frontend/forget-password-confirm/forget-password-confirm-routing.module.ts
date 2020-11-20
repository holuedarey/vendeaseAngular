import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordConfirmComponent } from './forget-password-confirm.component';

const routes: Routes = [
  {path:"", component: ForgetPasswordConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordConfirmRoutingModule { }
