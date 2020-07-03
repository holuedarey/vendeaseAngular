import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './frontend/login/login.component';
import { RegisterComponent } from './frontend/register/register.component';
import { HomeComponent } from './frontend/home/home.component';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { AboutUsComponent } from './frontend/about-us/about-us.component';
import { ContactUsComponent } from './frontend/contact-us/contact-us.component';
import { GuaranteeComponent } from './frontend/guarantee/guarantee.component';
import { MainComponent } from './layout/backend/main/main.component';
import { LoginRegisterComponent } from './layout/frontend/loginRegister/login-register/login-register.component';
import { RegisterVendorComponent } from './frontend/register-vendor/register-vendor.component';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'vendor_register', component: RegisterVendorComponent },

  
  //Site routes goes here 
  {
    path: '',
    component: MainComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  
  //Site routes goes here 
  {
    path: '',
    component: LoginRegisterComponent,
    children: [
      { path: 'welcome', component: HomeComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'guarantee', component: GuaranteeComponent },
    ]
  },
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
