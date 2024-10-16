import { Injectable } from '@angular/core';
import { HttpClient,provideHttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {
  private apiUrl = 'https://localhost:44353/api/BusinessCard';

  constructor(private http: HttpClient) {}

  createBusinessCard(card: any): Observable<any> { 
    return this.http.post<any>(this.apiUrl, card);
  }

  
  getBusinessCards(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFilteredCards(filter: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?filter=${filter}`);
  }


  
  deleteCard(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
  exportBusinessCard(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/export/${id}`, { responseType: 'blob' });
  }

  importCsv(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file); 
  
    return this.http.post<any>('https://localhost:44353/api/BusinessCard/import/csv', formData);
  }
  
  

importXml(xmlData: string): Observable<any> {
    
    const formData = new FormData();
    const xmlBlob = new Blob([xmlData], { type: 'application/xml' });
    
    
    formData.append('file', xmlBlob, 'business_cards.xml'); 

    
    return this.http.post<any>(`${this.apiUrl}/import/xml`, formData);
  }
  exportCardAsXml(id: string): Observable<any> {
    return this.http.get(`https://localhost:44353/api/BusinessCard/export/xml?id=${id}`, { responseType: 'blob' });
  }
  
  exportCardAsCsv(id: string): Observable<any> {
    return this.http.get(`https://localhost:44353/api/BusinessCard/export/csv?id=${id}`, { responseType: 'blob' });
  }

}
