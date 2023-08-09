import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bts} from "../home/bts";
import {MessageType} from "../home/processing-code";


@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })

export class MapsService {

  private baseUrl = 'http://localhost:8080/bts';

  constructor(private httpClient: HttpClient) {}

  public getDefaultValuesUpload(): Observable<DefaultValues[]> {
    return this.httpClient.get<DefaultValues[]>(`${this.baseUrl}/default_values`);
  }
}
