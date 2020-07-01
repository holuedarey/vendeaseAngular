import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    RegisterVendorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FormWizardModule,
    
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     blacklistedRoutes: ["login", "register"],
    //   },
    // }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: RequestInterceptorService, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
