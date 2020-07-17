import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  produtList(): Observable<any> {
    return this.http.get(Endpoint.PRODUCTS.product).pipe(
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

}
