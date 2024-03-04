import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Template } from './communication.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private API_URL = 'https://localhost:7213/api/Notification/';

  constructor(private http: HttpClient) { }

  getTemplateById(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}GetTemplate`,{ Id: id });
  };

  saveTemplate(formData: any,file: File): Observable<any> {
    const fileData: FormData = new FormData();
    fileData.append('archivo', file, file.name);
    return this.http.post<any>(`${this.API_URL}SaveTemplate?Name=${formData.Name}&Sender=${formData.From}&Channel=${formData.Type}&Subject=${formData.Subject}&attachments=${formData.Attachments}`, fileData);
  };

   getTemplate(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}GetTemplate`);
  };
}
