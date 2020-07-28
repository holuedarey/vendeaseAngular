import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './frontend/login/login.component';
import { RegisterComponent } from './frontend/register/register.component';
import { ContactUsComponent } from './frontend/contact-us/contact-us.component';
import { AboutUsComponent } from './frontend/about-us/about-us.component';
import { HomeComponent } from './frontend/home/home.component';
import { GuaranteeComponent } from './frontend/guarantee/guarantee.component';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { MainComponent } from './layout/backend/main/main.component';
import { HeaderComponent } from './layout/backend/header/header.component';
import { FooterComponent } from './layout/backend/footer/footer.component';
import { SidebarComponent } from './layout/backend/sidebar/sidebar.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoginRegisterComponent } from './layout/frontend/loginRegister/login-register/login-register.component';
import { HeaderWelcomeComponent } from './layout/frontend/welcome/header-welcome/header-welcome.component';
import { FooterWelcomeComponent } from './layout/frontend/welcome/footer-welcome/footer-welcome.component';
import { RegisterVendorComponent } from './frontend/register-vendor/register-vendor.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptorService } from './_service/request-interceptor.service';
import { JwtModule } from "@auth0/angular-jwt";
import { Constants } from './common/constant';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormWizardModule } from 'angular-wizard-form';
import { AtomSpinnerModule} from 'angular-epic-spinners';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RootComponent } from './root/root/root.component';

import { ToastrModule } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatRadioModule} from '@angular/material/radio'
import {MatSliderModule} from '@angular/material/slider'
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core'; 
import { ChartsModule } from 'ng2-charts';
import {MatDialogModule} from '@angular/material/dialog';

  import { from } from 'rxjs';
import { UserManagementComponent } from './backend/user-management/user-management.component';
import { EditModalComponent } from './backend/user-management/edit-modal/edit-modal.component';
import { ConfirmDialogComponent } from './backend/user-management/confirm-dialog/confirm-dialog.component';
import { SupplierListComponent } from './backend/supplier-list/supplier-list.component';
import { CompanyListComponent } from './backend/company-list/company-list.component';
import { ProductListComponent } from './backend/product-list/product-list.component';
import { ShowProductComponent } from './backend/product-list/show-product/show-product.component';
import { EditProductComponent } from './backend/product-list/edit-product/edit-product.component';
import { DeleteProductComponent } from './backend/product-list/delete-product/delete-product.component';
import { SupplierDetailsComponent } from './backend/supplier-details/supplier-details.component';
import { CompanyDetailsComponent } from './backend/company-details/company-details.component';
import { AddfeeModalComponent } from './backend/company-list/addfee-modal/addfee-modal.component';
import { CreateProductComponent } from './backend/create-product/create-product.component';
import { OrderListComponent } from './backend/order-list/order-list.component';
import { CreateOrderComponent } from './backend/create-order/create-order.component';
import { SingleInvoiceComponent } from './backend/single-invoice/single-invoice.component';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './backend/invoice-list/invoice-list.component';
import { ClaimComponent } from './backend/invoice-list/claim/claim.component';
import { AssignOrderComponent } from './backend/assign-order/assign-order.component';
import { SingleOrderComponent } from './backend/single-order/single-order.component';


export function tokenGetter() {
  return localStorage.getItem(Constants.STORAGE_VARIABLES.TOKEN);
}
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ContactUsComponent,
    AboutUsComponent,
    HomeComponent,
    GuaranteeComponent,
    DashboardComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HeaderWelcomeComponent,
    FooterWelcomeComponent,
    LoginRegisterComponent,
    RegisterVendorComponent,
    UserManagementComponent,
    EditModalComponent,
    ConfirmDialogComponent,
    SupplierListComponent,
    CompanyListComponent,
    ProductListComponent,
    ShowProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    SupplierDetailsComponent,
    CompanyDetailsComponent,
    AddfeeModalComponent,
    CreateProductComponent,
    OrderListComponent,
    CreateOrderComponent,
    SingleInvoiceComponent,
    InvoiceListComponent,
    ClaimComponent,
    AssignOrderComponent,
    SingleOrderComponent,
    
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FormWizardModule,
    AtomSpinnerModule,
    BrowserAnimationsModule,
    MatDatepickerModule,MatInputModule,MatNativeDateModule,
    MatProgressSpinnerModule,MatSliderModule,MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    ChartsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      easing:'ease-in',
      progressAnimation:"decreasing"
    }),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     blacklistedRoutes: ["login", "register"],
    //   },
    // }),
  ],
  exports: [
    HeaderComponent,
],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: RequestInterceptorService, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RootComponent, ConfirmDialogComponent]
})
export class AppModule { }
