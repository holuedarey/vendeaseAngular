import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  constructor(public http: HttpClient) { }

  getSupplierList(params): Observable<any> {
    return this.http.get(Endpoint.AUTH.users + `?type=vendor&$skip=${params.skip || 0}&$limit=${params.limit || 50}`).pipe(
        map(data => {
          return data;
        }));
  }

  searchSupplier(payload): Observable<any> {
    return this.http.get(`${Endpoint.AUTH.users}/?[vendor.name][$search]=${payload}&type=vendor_search
    `).pipe(
      map(data => {
        return data;
      }));  
  }
}
