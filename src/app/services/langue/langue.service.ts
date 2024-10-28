import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Langue } from '../../models/Langue.model';

@Injectable({
  providedIn: 'root',
})
export class LangueService {
  private baseUrl = 'http://localhost:8082/Candidat'; 

  constructor(private http: HttpClient) {}

  addLangues(userId: number, langues: Langue[]): Observable<any> {
    const token = localStorage.getItem('token');  // Récupérer le token du local storage
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addLangue/${userId}`, langues, { headers, responseType: 'text' });
  }
  
}
