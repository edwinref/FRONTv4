import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Users} from './Users';
import {Bts} from "../home/bts";


@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })

export class UserService {

  private baseURL = 'http://localhost:9091/saveuser';

  constructor(private httpClient: HttpClient) {

  }
  public saveuserY(user: Users): Observable<Users> {
    return this.httpClient.post<Users>(`${this.baseURL}`, user);
  }


  public getAllUsers(): Observable<{ id: number, prenom: string, email: string, password: string, role: string}[]> {
    return this.httpClient.get<{ id: number, prenom: string, email: string, password: string, role: string} []>('http://localhost:9091/getAllUsers');}
  public deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:9091/deleteuser/${id}`);
  }
  updateUser(users: Users): Observable<Users> {
    const url = `http://localhost:9091/updateuser/${users.id}`;
    return this.httpClient.put<Users>(url, users);
  }
}
