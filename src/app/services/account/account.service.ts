import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'https://localhost:7181/api/Account/';
  
  constructor(private http: HttpClient) { }

  saveUserAccount(userId: number, accountType: string ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}SaveUserAccount?userId=${userId}&accountType=${accountType}`, null);
  }

  GetUserAccount(userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}GetUserAccount?userId=${userId}`, null);
  }

  saveUserData(userAccount: any): void {
    localStorage.setItem('userAccount', JSON.stringify(userAccount));
  }

  getUserAccountFromStorage(): any {
    const userDataString = localStorage.getItem('userAccount');
    return userDataString ? JSON.parse(userDataString) : null;
  }
}
