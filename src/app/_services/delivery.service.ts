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

  getAllDeliveries(): Observable<any>{
    return this.http.get(Endpoint.DELIVERY.delivery).pipe(
      map(data => {
        return data;
      }));  
  }


}
