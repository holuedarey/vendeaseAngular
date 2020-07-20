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
import { UserManagementComponent } from './backend/user-management/user-management.component';
import { ProductListComponent } from './backend/product-list/product-list.component';
import { CompanyListComponent } from './backend/company-list/company-list.component';
import { SupplierListComponent } from './backend/supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from './backend/supplier-details/supplier-details.component';
import { CompanyDetailsComponent } from './backend/company-details/company-details.component';



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
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-list', component: UserManagementComponent },
      { path: 'company-list', component: CompanyListComponent },
      { path: 'supplier-list', component: SupplierListComponent },
      { path: 'view/supplier', component: SupplierDetailsComponent },
      { path: 'view/company', component: CompanyDetailsComponent },
      { path: 'product-list', component: ProductListComponent },
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
