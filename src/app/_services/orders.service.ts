import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }
 
  getOrders(): Observable<any> {
    return this.http.get(Endpoint.DASHBOARD.invoice).pipe(
      map(data => {
        return data;
      }));
  }
  viewOrder(orderId): Observable<any> {
    return this.http.get(`${Endpoint.DASHBOARD.invoice}/${orderId}`).pipe(
      map(data => {
        return data;
      }));
  }
}
