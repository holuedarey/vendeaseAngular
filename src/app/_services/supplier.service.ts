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

  getSupplierList(): Observable<any> {
    return this.http.get(Endpoint.AUTH.users+`?type=vendor`).pipe(
      map(data => {
        return data;
      }));
  }
}
