import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Notification, Template } from './communication.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private API_URL = 'https://localhost:7213/api/Notification/';

  constructor(private http: HttpClient) { }

  saveTemplate(formData: any,file: File): Observable<any> {
    const fileData: FormData = new FormData();
    fileData.append('archivo', file, file.name);
    return this.http.post<any>(`${this.API_URL}SaveTemplate?Name=${formData.Name}&Sender=${formData.From}&Channel=${formData.Type}&Subject=${formData.Subject}&attachments=${formData.Attachments}`, fileData);
  };

  saveNotification(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}SaveNotification`, data);
  };

  editTemplate(formData: any,file: File): Observable<any> {
    const fileData: FormData = new FormData();
    fileData.append('archivo', file, file.name);
    return this.http.post<any>(`${this.API_URL}UpdateTemplate?Id=${formData.NumberId} &Sender=${formData.From}&Subject=${formData.Subject}&attachments=${formData.Attachments}`, fileData);
  };

  deleteTemplate(templateId: number) {
    return this.http.post(`${this.API_URL}DeleteTemplate?Id=${templateId}`, null);
  }

  getTemplates(): Observable<Template[]> {
    return this.http.post<Template[]>(`${this.API_URL}GetTemplates`, null);
  };

  getTemplateById(id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}GetTemplate?Id=${id}`,null);
  };

}
