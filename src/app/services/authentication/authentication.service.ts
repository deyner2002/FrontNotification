import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'https://localhost:7090/api/Authentication/';
  
  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Login`, credentials);
  }

  register(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Register`, credentials);
  }

  logout(): void {
    localStorage.clear();
  }
}
