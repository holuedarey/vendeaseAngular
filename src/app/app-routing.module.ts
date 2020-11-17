import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './layout/backend/main/main.component';
import { LoginRegisterComponent } from './layout/frontend/loginRegister/login-register/login-register.component';
import { AuthGuard } from './guard/auth.guard';
import { UserManagementComponent } from './backend/user-management/user-management.component';
import { ProductListComponent } from './backend/product-list/product-list.component';
import { CompanyListComponent } from './backend/company-list/company-list.component';
import { SupplierListComponent } from './backend/supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from './backend/supplier-details/supplier-details.component';
import { CompanyDetailsComponent } from './backend/company-details/company-details.component';
import { CreateProductComponent } from './backend/create-product/create-product.component';
import { OrderListComponent } from './backend/order-list/order-list.component';
import { CreateOrderComponent } from './backend/create-order/create-order.component';
import { SingleInvoiceComponent } from './backend/single-invoice/single-invoice.component';
import { InvoiceListComponent } from './backend/invoice-list/invoice-list.component';
import { SingleOrderComponent } from './backend/single-order/single-order.component';
import { SingleDeliveryComponent } from './backend/single-delivery/single-delivery.component';
import { DeliveryListComponent } from './backend/delivery-list/delivery-list.component';
import { SingleClaimComponent } from './backend/single-claim/single-claim.component';
import { ClaimListComponent } from './backend/claim-list/claim-list.component';
import { UserReportComponent } from './backend/user-report/user-report.component';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./frontend/login/login.module').then(m => m.LoginModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'forget-password',  loadChildren: () => import('./frontend/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'register',  loadChildren: () => import('./frontend/register/register.module').then(m => m.RegisterModule)},
  // tslint:disable-next-line:max-line-length
  { path: 'vendor_register',  loadChildren: () => import('./frontend/register-vendor/register-vendor-routing.module').then(m => m.RegisterVendorRoutingModule) },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./backend/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'report', component: UserReportComponent },
      { path: 'user-list', component: UserManagementComponent },
      { path: 'company-list', component: CompanyListComponent },
      { path: 'supplier-list', component: SupplierListComponent },
      { path: 'view/supplier', component: SupplierDetailsComponent },
      { path: 'view/company', component: CompanyDetailsComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'create-product', component: CreateProductComponent },
      { path: 'invoice-list', component: InvoiceListComponent },
      { path: 'view/invoice', component: SingleInvoiceComponent },
      { path: 'purchase-order', component: OrderListComponent },
      { path: 'create-purchase', component: CreateOrderComponent },
      { path: 'view/order', component: SingleOrderComponent },

      { path: 'view/delivery', component: SingleDeliveryComponent },
      { path: 'delivery-list', component: DeliveryListComponent },

      { path: 'view/claim', component: SingleClaimComponent },
      { path: 'claim-list', component: ClaimListComponent },
    ]
  },
  {
    path: '',
    component: LoginRegisterComponent,
    children: [
      { path: 'welcome',  loadChildren: () => import('./frontend/home/home.module').then(m => m.HomeModule) },
      { path: 'about',  loadChildren: () => import('./frontend/about-us/about-us.module').then(m => m.AboutUsModule) },
      { path: 'contact',  loadChildren: () => import('./frontend/contact-us/contact-us.module').then(m => m.ContactUsModule) },
      { path: 'guarantee',  loadChildren: () => import('./frontend/guarantee/guarantee.module').then(m => m.GuaranteeModule) },
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
