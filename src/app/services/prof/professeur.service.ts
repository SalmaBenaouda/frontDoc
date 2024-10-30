import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujet } from '../../models/Sujet.model';
import { ProfesseurDTO } from '../../models/ProfesseurDTO.model';
import { CandidatureDTO } from '../../models/CandidatureDTO.model';

@Injectable({
  providedIn: 'root',
})
export class ProfesseurService {
  private apiUrl = 'http://localhost:8081/Professeur';

  constructor(private http: HttpClient) {}

   // Ajouter la méthode pour obtenir les sujets par ID de professeur
   getSujetsByProfesseurId(professeurId: number): Observable<Sujet[]> {
    return this.http.get<Sujet[]>(`${this.apiUrl}/getSujetByProfId/${professeurId}`);
  }
  findProfesseurById(professeurId: number): Observable<ProfesseurDTO> {
    return this.http.get<ProfesseurDTO>(`${this.apiUrl}/find/${professeurId}`);
  }
  updateSujet(id: number, sujet: Sujet): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/updateSujet/${id}`, sujet, { headers, responseType: 'text' });
  }  
  deleteSujet(id: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/deleteSujet/${id}`, {}, { headers, responseType: 'text' });
  }
   
  addSujet(sujet: Sujet): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/addSujet`, sujet, { headers, responseType: 'text' });
  }
  
  getCandidaturesByProfId(professeurId: number): Observable<CandidatureDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CandidatureDTO[]>(`${this.apiUrl}/candidature/${professeurId}`);
  }
  
}
