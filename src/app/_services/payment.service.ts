import { Injectable } from '@angular/core';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  createAuthorizationUrl(payload): Observable<any> {
    return this.http.post(Endpoint.PAYMENT.payment, payload).pipe(
      map(data => {
        return data;
      }));
  }

  verifyPayment(payload): Observable<any> {
    return this.http.post(Endpoint.PAYMENT.payment, payload).pipe(
      map(data => {
        return data;
      }));
  }

}
