import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(public http: HttpClient) { }

  getCompanyList(params): Observable<any> {
    return this.http.get(Endpoint.AUTH.users+`?type=company&main_contact=true&$skip=${params.skip || 0}&$limit=${params.limit || 50}`).pipe(
        map(data => {
          return data;
        }));
  }
  getCompanyListReport(): Observable<any> {
    return this.http.get(Endpoint.AUTH.users+`?type=company&$limit=${Number.MAX_SAFE_INTEGER}`).pipe(
        map(data => {
          return data;
        }));
  }

  getCompanyReport(payload): Observable<any> {
    return this.http.post(Endpoint.DASHBOARD.invoice+`/report`, payload).pipe(
        map(data => {
          return data;
        }));
  }

  searchCompany(payload): Observable<any> {
    return this.http.get(`${Endpoint.DELIVERY.delivery}/?name=${payload}&$search=true`).pipe(
      map(data => {
        return data;
      }));  
  }
}
