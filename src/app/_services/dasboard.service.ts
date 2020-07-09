import { Injectable } from '@angular/core';
import { StorageService } from '../_service/storage.service';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '../common/endpoints';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DasboardService {

  constructor(private http: HttpClient) { }

  invoice(): Observable<any> {
    return this.http.get(Endpoint.DASHBOARD.invoice).pipe(
      map(data => {
        return data;
      }));
  }

  getGraph(): Observable<any> {
    return this.http.get(Endpoint.DASHBOARD.dashboard_graph).pipe(
      map(data => {
        return data;
      }));
  }

  analytics(payload): Observable<any> {
    return this.http.post(Endpoint.DASHBOARD.analytics,payload).pipe(
      map(data => {
        return data;
      }));
  }
  
  bulkAnalytics(payload): Observable<any> {
    return this.http.post(Endpoint.DASHBOARD.analytics, payload).pipe(
      map(data => {
        return data;
      }));
  }
}