import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from './storage.service';
import { Constants } from '../common/constant';
import { LoginRequestModel, RegisterBusinessRequestModel, RegisterVendorRequestModel, RegisterSystemRequestModel, RegisterCreateRequestModel } from '../_models/request/auth.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper =  new JwtHelperService();
  constructor(public storageService: StorageService, private http: HttpClient) { }


  signIn(loginRequest: LoginRequestModel): Observable<any> {
    return this.http.post(Endpoint.AUTH.login, loginRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          // this.processLogin(data);
          return data;
        }));
  }



  processRegister(response: any) {
    this.storageService.set(Constants.STORAGE_VARIABLES.REGISTER, '1');
    this.storageService.set(Constants.STORAGE_VARIABLES.REGISTER_MESSAGE, JSON.stringify(response));
  }

  signUpBusiness(registerRequest: RegisterBusinessRequestModel): Observable<any> {
    return this.http.post(Endpoint.AUTH.users, registerRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          // this.processRegister(data);
          return data;
        }));
  }

  signUpVendor(registerRequest: RegisterVendorRequestModel): Observable<any> {
    return this.http.post(Endpoint.AUTH.users, registerRequest,
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

  forgotPassword(payload): Observable<any> {
    return this.http.post(Endpoint.AUTH.authManagement, payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          return data;
        }));
  }

  signUpSystem(registerRequest: RegisterSystemRequestModel): Observable<any> {
    return this.http.post(Endpoint.AUTH.users, registerRequest,
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

  createUser(registerRequest: RegisterCreateRequestModel): Observable<any> {
    return this.http.post(Endpoint.AUTH.users, registerRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          // this.processRegister(data);
          return data;
        }));
  }

  assignManager(assignManager): Observable<any> {
    return this.http.post(Endpoint.AUTH.users+'/assign_account_manager', assignManager,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          // this.processRegister(data);
          return data;
        }));
  }

  getUserList(params?): Observable<any> {
    return this.http.get(`${Endpoint.AUTH.users}?$skip=${params.skip || 0}&$limit=${params.limit || 50}`).pipe(
      map(data => {
        return data;
      }));
  }

  getBusinessList(): Observable<any> {
    return this.http.get(`${Endpoint.AUTH.users}/?type=company&main_contact=true`).pipe(
      map(data => {
        return data;
      }));
  }


  activateDeactivateUser(userId, payload): Observable<any> {
    // console.log('link :', `${Endpoint.AUTH.users}/${userId}`);
    return this.http.patch(`${Endpoint.AUTH.users}/${userId}`, payload).pipe(
      map(data => {
        return data;
      }));
  }

  activateDeactivatePaylater(userId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.AUTH.users}/${userId}`, payload).pipe(
      map(data => {
        return data;
      }));
  }

  updateUser(userId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.AUTH.users}/${userId}`, payload).pipe(
      map(data => {
        return data;
      }));
  }
  
  deleteUser(userId): Observable<any> {
    return this.http.delete(`${Endpoint.AUTH.users}/${userId}`).pipe(
      map(data => {
        return data;
      }));
  }

  isAuthenticated(): boolean {

    // console.log('dashboard : ', this.storageService.get(Constants.STORAGE_VARIABLES.TOKEN) )
    return !this.jwtHelper.isTokenExpired(this.storageService.get(Constants.STORAGE_VARIABLES.TOKEN));
   
  }

  searchUser(payload): Observable<any> {
    return this.http.get(`${Endpoint.AUTH.users}/?[company.name][$search]=${payload}&type=company_search
    `).pipe(
      map(data => {
        return data;
      }));
  }
}
