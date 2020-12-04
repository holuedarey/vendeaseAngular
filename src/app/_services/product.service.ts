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
  produtList(params?): Observable<any> {
    return this.http.get(`${Endpoint.PRODUCTS.product}?$skip=${params.skip || 0}&$limit=${params.limit || 50}&price[$gte]=${params.price || 0}`).pipe(
        map(data => {
          return data;
        }));
  }

  produtListUser(userId): Observable<any> {
    return this.http.get(`${Endpoint.PRODUCTS.product}/${userId}`).pipe(
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

  createProductUpload(profileImage): Observable<any> {
    return this.http.post(Endpoint.PRODUCTS.product + '/uploads', profileImage, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
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

  searchProduct(query): Observable<any> {
    return this.http.get(`${Endpoint.PRODUCTS.product}?category[$ne]=${null}&name[$search]=${query}`).pipe(
        map(data => {
          return data;
        }));
  }
}
