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

  listClaims(params): Observable<any> {
    return this.http.get(`${Endpoint.CLAIMS.claims}?$skip=${params.skip || 0}&$limit=${params.limit || 50}`).pipe(
        map(data => {
          return data;
        }));
  }

  getClaims(claimId): Observable<any> {
    return this.http.get(`${Endpoint.CLAIM_CONV.claims}/?short_code=${claimId}`).pipe(
        map(data => {
          return data;
        }));
  }

  replyClaims(payload): Observable<any> {
    return this.http.post(Endpoint.CLAIM_CONV.claims, payload).pipe(
        map(data => {
          return data;
        }));
  }

  markResolved(claimId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.CLAIMS.claims}/${claimId}`, payload).pipe(
        map(data => {
          return data;
        }));
  }

  reopenClaim(claimId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.CLAIMS.claims}/${claimId}`, payload).pipe(
        map(data => {
          return data;
        }));
  }

}
