import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  produtList(): Observable<any> {
    return this.http.get(Endpoint.PRODUCTS.product).pipe(
      map(data => {
        return data;
      }));
  }

  createProduct(payload): Observable<any> {
    return this.http.post(Endpoint.PRODUCTS.product, payload).pipe(
      map(data => {
        return data;
      }));
  }


  createProductUpload(payload): Observable<any> {
    return this.http.post(Endpoint.PRODUCTS.product+'/uploads', payload).pipe(
      map(data => {
        return data;
      }));
  }
 
  deleteProduct(productId): Observable<any> {
    return this.http.delete(`${Endpoint.PRODUCTS.product}/${productId}`).pipe(
      map(data => {
        return data;
      }));
  }

  updateProduct(productId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.PRODUCTS.product}/${productId}`, payload).pipe(
      map(data => {
        return data;
      }));
  }

}
