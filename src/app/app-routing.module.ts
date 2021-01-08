import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './layout/backend/main/main.component';
import { LoginRegisterComponent } from './layout/frontend/loginRegister/login-register/login-register.component';
import { AuthGuard } from './guard/auth.guard';
import { UserManagementComponent } from './backend/user-management/user-management.component';
import { SupplierListComponent } from './backend/supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from './backend/supplier-details/supplier-details.component';
import { CompanyDetailsComponent } from './backend/company-details/company-details.component';  
import { UserReportComponent } from './backend/user-report/user-report.component';
import { LoginComponent } from './frontend/login/login.component';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component:LoginComponent },
  // tslint:disable-next-line:max-line-length
  { path: 'forget-password',  loadChildren: () => import('./frontend/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'reset/:token',  loadChildren: () => import('./frontend/forget-password-confirm/forget-password-confirm.module').then(m => m.ForgetPasswordConfirmModule) },
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
      { path: 'company-list', loadChildren: () => import('./backend/company-list/company-list.module').then(m => m.CompanyListModule) },
      { path: 'supplier-list', component: SupplierListComponent },
      { path: 'view/supplier', component: SupplierDetailsComponent },
      { path: 'view/company', component: CompanyDetailsComponent },
      { path: 'product-list', loadChildren: () => import('./backend/product-list/product-list.module').then(m => m.ProductListModule) },
      { path: 'create-product', loadChildren: () => {
          return import('./backend/create-product/create-product.module').then(m => m.CreateProductModule);
        } },
      { path: 'invoice-list', loadChildren: () => import('./backend/invoice-list/invoice-list.module').then(m => m.InvoiceListModule) },
      { path: 'view/invoice', loadChildren: () => {
          return import('./backend/single-invoice/single-invoice.module').then(m => m.SingleInvoiceModule);
        } },
      { path: 'purchase-order', loadChildren: () => import('./backend/order-list/order-list.module').then(m => m.OrderListModule) },
      { path: 'create-purchase', loadChildren: () => import('./backend/create-order/create-order.module').then(m => m.CreateOrderModule) },
      { path: 'view/order', loadChildren: () => import('./backend/single-order/single-order.module').then(m => m.SingleOrderModule) },

      { path: 'view/delivery', loadChildren: () => {
          return import('./backend/single-delivery/single-delivery.module').then(m => m.SingleDeliveryModule);
        } },
      { path: 'delivery-list', loadChildren: () => import('./backend/delivery-list/delivery-list.module').then(m => m.DeliveryListModule) },

      { path: 'view/claim', loadChildren: () => import('./backend/single-claim/single-claim.module').then(m => m.SingleClaimModule) },
      { path: 'claim-list', loadChildren: () => import('./backend/claim-list/claim-list.module').then(m => m.ClaimListModule) },
      { path: 'settings', loadChildren: () => import('./backend/settings/settings.module').then(m => m.SettingsModule) },
    ]
  },
  { path: '**', redirectTo: '/login' }
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
