import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidat } from '../../models/Candidat.model';
import { Langue } from '../../models/Langue.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private apiUrl = 'http://localhost:8081/Candidat'; // URL du back-end Spring Boot

  constructor(private http: HttpClient) {}

  // Ajouter un candidat
  addCandidat(candidat: Candidat): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, candidat);
  }

  // Supprimer un candidat
  deleteCandidat(id: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/delete/${id}`, {});
  }

  // Trouver tous les candidats
  findAllCandidats(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${this.apiUrl}/all`);
  }

  // Trouver un candidat par ID
  findCandidatById(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/find/${id}`);
  }

  // Mettre à jour un candidat
  updateCandidat(id: number, candidat: Candidat): Observable<Candidat> {
    return this.http.put<Candidat>(`${this.apiUrl}/update/${id}`, candidat);
  }

  // Ajouter des langues à un candidat
  addLangue(id: number, langues: Langue[]): Observable<Candidat> {
    return this.http.post<Candidat>(`${this.apiUrl}/addLangue/${id}`, langues);
  }
}