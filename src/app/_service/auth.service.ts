import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from './storage.service';
import { Constants } from '../common/constant';
import { LoginRequestModel, RegisterBusinessRequestModel, RegisterVendorRequestModel, RegisterSystemRequestModel } from '../_models/request/auth.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  constructor(public storageService: StorageService, private http: HttpClient) { }


  signIn(loginRequest: LoginRequestModel): Observable<any> {
    return this.http.post(Endpoint.AUTH.login, loginRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          this.processLogin(data);
          return data;
        }));
  }

  processLogin(response: any) {
    this.storageService.set(Constants.STORAGE_VARIABLES.TOKEN, response.accessToken);
    this.storageService.set(Constants.STORAGE_VARIABLES.USER, JSON.stringify(response.user));

  }

  processRegister(response: any) {
    this.storageService.set(Constants.STORAGE_VARIABLES.REGISTER, '1');
    this.storageService.set(Constants.STORAGE_VARIABLES.REGISTER_MESSAGE, JSON.stringify(response));
  }

  signUpBusiness(registerRequest: RegisterBusinessRequestModel): Observable<any> {
    console.log('data from services: ', registerRequest)
    return this.http.post(Endpoint.AUTH.register, registerRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          // this.processRegister(data);
          console.log('success : ', data)
          return data;
        }));
  }

  signUpVendor(registerRequest: RegisterVendorRequestModel): Observable<any> {
    return this.http.post(Endpoint.AUTH.register, registerRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          this.processRegister(data);
          return data;
        }));
  }

  signUpSystem(registerRequest: RegisterSystemRequestModel): Observable<any> {
    return this.http.post(Endpoint.AUTH.register, registerRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          this.processRegister(data);
          return data;
        }));
  }

  isAuthenticated(): boolean {
    if (!this.jwtHelper.isTokenExpired(this.storageService.get(Constants.STORAGE_VARIABLES.TOKEN))) {
      return true;
    }
    //clear th regiser message
    return false;
  }
}
