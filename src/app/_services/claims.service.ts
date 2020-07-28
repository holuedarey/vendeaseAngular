import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(private http:HttpClient) { }


  openClaims(payload): Observable<any> {
    return this.http.post(Endpoint.CLAIMS.claims, payload).pipe(
      map(data => {
        return data;
      }));
  }
}
