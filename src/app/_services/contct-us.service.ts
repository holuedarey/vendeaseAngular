import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../common/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ContctUsService {

  constructor(private http:HttpClient) { }
  contactUs(payload): Observable<any> {
    return this.http.post(Endpoint.CONTATACTUS.contatctus, payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(
        map(data => {
          return data;
        }));
  }
}
