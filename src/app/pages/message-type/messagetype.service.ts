import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { MessageType } from '../home/processing-code';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })

export class MessagetypeService {

  private baseURL = 'http://localhost:9091/bts/addmessagetype';

  constructor(private httpClient: HttpClient) {

  }
  public saveMessageTypeY(MessageType: MessageType): Observable<MessageType> {
    return this.httpClient.post<MessageType>(`${this.baseURL}`, MessageType);
  }
  public getMessageTypes(): Observable<{ code: string, description: string }[]> {
    return this.httpClient.get<{ code: string, description: string }[]>('http://localhost:9091/bts/messagetype');
  }

  public deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:9091/bts/deletemessagetype/${id}`);
  }
  updateUser(MessageType: MessageType): Observable<MessageType> {
    const url = `http://localhost:9091/bts/updatemessagetype/${MessageType.code}`;
    return this.httpClient.put<MessageType>(url, MessageType);
  }

}
