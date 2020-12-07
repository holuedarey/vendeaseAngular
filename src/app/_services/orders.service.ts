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
 
  getOrders(params?): Observable<any> {
    return this.http.get(`${Endpoint.PURCHASE.purchase_orders}?$skip=${params.skip || 0}&$limit=${params.limit || 50}`).pipe(
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

  
  repurchaseOrder(payload): Observable<any> {
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

  editOrder(orderId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.PURCHASE.purchase_orders}/${orderId}`, payload).pipe(
      map(data => {
        return data;
      }));
  }

  deleteOrder(orderId): Observable<any> {
    return this.http.delete(`${Endpoint.PURCHASE.purchase_orders}/${orderId}`).pipe(
      map(data => {
        return data;
      }));
  }

  searchPo(payload): Observable<any> {
    return this.http.get(`${Endpoint.PURCHASE.purchase_orders}?name=${payload}&$search=true`).pipe(
        map(data => {
          return data;
        }));
  }
}
