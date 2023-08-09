import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bts} from "../home/bts";
import {ProcessingCode} from "../home/processing-code";


@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })

export class ProcessingcodeService {

  private baseURL = 'http://localhost:8080/bts/addprocessingcode';

  constructor(private httpClient: HttpClient) {

  }
  public saveProcessingCodeY(processingcode: ProcessingCode): Observable<ProcessingCode> {
    return this.httpClient.post<ProcessingCode>(`${this.baseURL}`, processingcode);
  }
  public getProcessingCodes(): Observable<{ code: string, description: string }[]> {
    return this.httpClient.get<{ code: string, description: string }[]>('http://localhost:8080/bts/processingcodes');
  }

  public deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/bts/deleteprocessingcode/${id}`);
  }
  updateUser(processingcode: ProcessingCode): Observable<ProcessingCode> {
    const url = `http://localhost:8080/bts/updateprocessingcode/${processingcode.code}`;
    return this.httpClient.put<ProcessingCode>(url, processingcode);
  }
  public getTransactionType(): Observable<{ code: string, description: string }[]> {
    return this.httpClient.get<{ code: string, description: string }[]>('http://localhost:8080/bts/transactiontype');
  }
  public getTransactionStatut(): Observable<{ code: string, description: string }[]> {
    return this.httpClient.get<{ code: string, description: string }[]>('http://localhost:8080/bts/transactionstatut');
  }

}
