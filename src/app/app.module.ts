import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { SidebarComponent } from './layout/backend/sidebar/sidebar.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoginRegisterComponent } from './layout/frontend/loginRegister/login-register/login-register.component';
import { HeaderWelcomeComponent } from './layout/frontend/welcome/header-welcome/header-welcome.component';
import { FooterWelcomeComponent } from './layout/frontend/welcome/footer-welcome/footer-welcome.component';
import { RegisterVendorComponent } from './frontend/register-vendor/register-vendor.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptorService } from './_service/request-interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormWizardModule } from 'angular-wizard-form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import {MatDialogModule} from '@angular/material/dialog';


import { UserManagementComponent } from './backend/user-management/user-management.component';
import { EditModalComponent } from './backend/user-management/edit-modal/edit-modal.component';
import { ConfirmDialogComponent } from './backend/user-management/confirm-dialog/confirm-dialog.component';
import { SupplierListComponent } from './backend/supplier-list/supplier-list.component';
import { ShowProductComponent } from './backend/product-list/show-product/show-product.component';
import { EditProductComponent } from './backend/product-list/edit-product/edit-product.component';
import { DeleteProductComponent } from './backend/product-list/delete-product/delete-product.component';
import { SupplierDetailsComponent } from './backend/supplier-details/supplier-details.component';
import { CompanyDetailsComponent } from './backend/company-details/company-details.component';
import { AddfeeModalComponent } from './backend/company-list/addfee-modal/addfee-modal.component';
import { CommonModule } from '@angular/common';
import { ClaimComponent } from './backend/invoice-list/claim/claim.component';
import { AssignOrderComponent } from './backend/assign-order/assign-order.component';
import { PaylaterComponent } from './backend/single-invoice/paylater/paylater.component';
import { PaynowComponent } from './backend/single-invoice/paynow/paynow.component';
import { EditPoComponent } from './backend/single-order/edit-po/edit-po.component';
import { RepurchaseComponent } from './backend/single-order/repurchase/repurchase.component';
import { AddProductComponent } from './backend/single-order/add-product/add-product.component';
import { UserReportComponent } from './backend/user-report/user-report.component';


import { ExportAsModule } from 'ngx-export-as';
// pagination
import {NgxPaginationModule} from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterModule } from './frontend/register/register.module';
import { LoginModule } from './frontend/login/login.module';
import { RegisterVendorModule } from './frontend/register-vendor/register-vendor.module';
import { ForgetPasswordModule } from './frontend/forget-password/forget-password.module';
import { ResetPasswordModule } from './frontend/reset-password/reset-password.module';
import { ClaimListModule } from './backend/claim-list/claim-list.module';
import { BreadcrumbModule } from './backend/breadcrumb/breadcrumb.module';
import { CompanyListModule } from './backend/company-list/company-list.module';
import { CreateOrderModule } from './backend/create-order/create-order.module';
import { CreateProductModule } from './backend/create-product/create-product.module';
import { DeliveryListModule } from './backend/delivery-list/delivery-list.module';
import { InvoiceListModule } from './backend/invoice-list/invoice-list.module';
import { OrderListModule } from './backend/order-list/order-list.module';
import { ProductListModule } from './backend/product-list/product-list.module';
import { SingleClaimModule } from './backend/single-claim/single-claim.module';
import { SingleDeliveryModule } from './backend/single-delivery/single-delivery.module';
import { SingleInvoiceModule } from './backend/single-invoice/single-invoice.module';
import { SingleOrderModule } from './backend/single-order/single-order.module';
import { ForgetPasswordConfirmModule } from './frontend/forget-password-confirm/forget-password-confirm.module';
import { HeaderModule } from './layout/backend/header/header.module';
import { MainModule } from './layout/backend/main/main.module';


@NgModule({
  declarations: [
    AppComponent,
    // SidebarComponent,
    HeaderWelcomeComponent,
    FooterWelcomeComponent,
    LoginRegisterComponent,
    RegisterVendorComponent,
    UserManagementComponent,
    EditModalComponent,
    ConfirmDialogComponent,
    SupplierListComponent,
    ShowProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    SupplierDetailsComponent,
    CompanyDetailsComponent,
    AddfeeModalComponent,
    ClaimComponent,
    AssignOrderComponent,
    PaylaterComponent,
    PaynowComponent,
    EditPoComponent,
    RepurchaseComponent,
    AddProductComponent,
    UserReportComponent,   
    
  ],

  imports: [
    BrowserModule,
    ExportAsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FormWizardModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatDialogModule,
    NgxPaginationModule,
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      easing: 'ease-in',
      progressAnimation: 'decreasing'
    }),
    RegisterModule,
    LoginModule,
    RegisterVendorModule,
    ForgetPasswordModule,
    ResetPasswordModule,
    ClaimListModule,
    BreadcrumbModule,
    CompanyListModule,
    CreateOrderModule,
    CreateProductModule,
    DeliveryListModule,
    InvoiceListModule,
    OrderListModule,
    ProductListModule,
    SingleClaimModule,
    SingleDeliveryModule,
    SingleInvoiceModule,
    SingleOrderModule,
    ForgetPasswordConfirmModule,
    HeaderModule,
    MatDialogModule,
    MainModule
  ],
  exports: [
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
