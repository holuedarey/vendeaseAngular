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

  getCompanyList(): Observable<any> {
    return this.http.get(Endpoint.AUTH.users+`?type=company&main_contact=true`).pipe(
      map(data => {
        return data;
      }));
  }
}
