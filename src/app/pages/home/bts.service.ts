import { DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Bts } from './bts';

@Injectable({ providedIn: 'root' })
export class BtsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  public getProcessingCodes(): Observable<{ code: string, description: string }[]> {
  return this.http.get<{ code: string, description: string }[]>('http://localhost:9091/bts/processingcodes');
}
  public getMessageTypes(): Observable<{ code: string, description: string }[]> {
    return this.http.get<{ code: string, description: string }[]>('http://localhost:9091/bts/messagetype');
  }



public getBts(): Observable<Bts[]> {
  const url = `${this.apiServerUrl}/bts/all`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:4200',
  });

  return this.http.get<Bts[]>(url, { headers });
}
  public getBtsByMsgSeq(msg_seq: string): Observable<Bts> {
    return this.http.get<Bts>(`${this.apiServerUrl}/bts/${msg_seq}`);
  }

  public addBts(bts: Bts): Observable<Bts> {
    return this.http.post<Bts>(`${this.apiServerUrl}/bts/add`, bts);
  }

  updateBts(bts: Bts): Observable<Bts> {
    const url = `${this.apiServerUrl}/bts/${bts.msg_seq}`;
    return this.http.put<Bts>(url, bts);
  }

  public deleteBts(msg_seq: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/bts/delete/${msg_seq}`);
  }

  public getAllFields(bts: Bts): string[] {
    const fields: string[] = Object.keys(bts);
    return fields;
  }

  public truncateTable(): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/bts/truncate`);
  }
  getDefaultValues(): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/bts/default_values`);
  }
  getProcessingCode(): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/bts/processiongcode`);
  }

}
