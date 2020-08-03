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
    return this.http.get(Endpoint.PURCHASE.purchase_orders).pipe(
      map(data => {
        return data;
      }));
  }

  
  createOrder(payload): Observable<any> {
    return this.http.post(Endpoint.PURCHASE.purchase_orders, payload).pipe(
      map(data => {
        return data;
      }));
  }

  viewOrder(orderId): Observable<any> {
    return this.http.get(`${Endpoint.PURCHASE.purchase_orders}/${orderId}`).pipe(
      map(data => {
        return data;
      }));
  }
}
