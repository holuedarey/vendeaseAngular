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

  invoice(params?): Observable<any> {
    return this.http.get(`${Endpoint.DASHBOARD.invoice}?$skip=${params.skip || 0}&$limit=${params.limit || 50}`).pipe(
      map(data => {
        return data;
      }));
  }
  getInvoice(invoiceId): Observable<any> {
    return this.http.get(`${Endpoint.DASHBOARD.invoice}/${invoiceId}`).pipe(
      map(data => {
        return data;
      }));
  }

  discountInvoice(invoiceId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.DASHBOARD.invoice}/${invoiceId}`, payload).pipe(
      map(data => {
        return data;
      }));
  }

  markInvoiceAsPaid(payload): Observable<any> {
    return this.http.post(`${Endpoint.DASHBOARD.receipt}`, payload).pipe(
      map(data => {
        return data;
      }));
  }

  approveInvoice(invoiceId, payload): Observable<any> {
    return this.http.patch(`${Endpoint.DASHBOARD.invoice}/${invoiceId}`, payload).pipe(
      map(data => {
        return data;
      }));
  }


  searchInvoice(payload): Observable<any> {
    return this.http.get(`${Endpoint.DASHBOARD.invoice}/?name=${payload}&$search=true`).pipe(
      map(data => {
        return data;
      }));
  }

  deleteInvoice(invoiceId): Observable<any> {
    return this.http.delete(`${Endpoint.DASHBOARD.invoice}/${invoiceId}`).pipe(
      map(data => {
        return data;
      }));
  }

  getGraph(): Observable<any> {
    return this.http.post(Endpoint.DASHBOARD.analytic, { "action": "graph_data" }).pipe(
      map(data => {
        return data;
      }));
  }

  analytics(): Observable<any> {
    return this.http.post(Endpoint.DASHBOARD.analytic, {}).pipe(
      map(data => {
        return data;
      }));
  }

  bulkAnalytics(payload): Observable<any> {
    return this.http.post(Endpoint.DASHBOARD.analytic, payload).pipe(
      map(data => {
        // console.log('return data',data)
        return data;
      }));
  }
  getbulkAnalytics(payload): Observable<any> {
    return this.http.get(Endpoint.DASHBOARD.analytic, payload).pipe(
      map(data => {
        // console.log('return data',data)
        return data;
      }));
  }

  upload(payload): Observable<any> {
    return this.http.post(Endpoint.DASHBOARD.upload, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).pipe(
      map(data => {
        return data;
      }));
  }
}
