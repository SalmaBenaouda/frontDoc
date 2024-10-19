import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesseurService {
  private apiUrl = 'http://localhost:8081/Professeur';

  constructor(private http: HttpClient) {}

  addProfesseur(professeur: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, professeur);
  }

  deleteProfesseur(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete/${id}`, null);
  }

  getAllProfesseurs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  testSecurity(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test`);
  }
}
