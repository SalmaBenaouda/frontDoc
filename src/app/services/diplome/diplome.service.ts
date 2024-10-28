import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diplome } from '../../models/Diplome.model';

@Injectable({
  providedIn: 'root',
})
export class DiplomeService {
  private baseUrl = 'http://localhost:8081/Candidat';

  constructor(private http: HttpClient) {}

  addDiplomes(userId: number, diplomes: Diplome[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'); 
    return this.http.post(`${this.baseUrl}/addDiplome/${userId}`, diplomes, { headers, responseType: 'text' });
  }
  
}
