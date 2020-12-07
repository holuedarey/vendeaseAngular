import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http:HttpClient) { }

  createDelivery(payload): Observable<any> {
    return this.http.post(Endpoint.DELIVERY.delivery, payload).pipe(
      map(data => {
        return data;
      }));  
  }


  getDelivery(deliveryId): Observable<any> {
    return this.http.get(`${Endpoint.DELIVERY.delivery}/${deliveryId}`).pipe(
      map(data => {
        return data;
      }));  
  }

  
  confirmDelivery(deliveryId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.DELIVERY.delivery}/${deliveryId}`, payload).pipe(
      map(data => {
        return data;
      }));  
  }

  updateDelivery(deliveryId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.DELIVERY.delivery}/${deliveryId}`, payload).pipe(
      map(data => {
        return data;
      }));  
  }

  getAllDeliveries(params): Observable<any>{
    return this.http.get(`${Endpoint.DELIVERY.delivery}?$skip=${params.skip || 0}&$limit=${params.limit || 50}`).pipe(
      map(data => {
        return data;
      }));  
  }

  searchDelivery(payload): Observable<any> {
    return this.http.get(`${Endpoint.DELIVERY.delivery}/?name=${payload}&$search=true`).pipe(
      map(data => {
        return data;
      }));  
  }
}
