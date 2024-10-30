import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StructureRecherche } from '../../models/StructureRecherche.model';
import { Professeur } from '../../models/Professeur.model';
import { CandidatureDTO } from '../../models/CandidatureDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CedService {

  private apiUrl = 'http://localhost:8081/CED'; // Remplacer par l'URL de votre backend

  constructor(private http: HttpClient) {}
  getProfesseursByCedId(cedId: number): Observable<Professeur[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Professeur[]>(`${this.apiUrl}/professeur/${cedId}`, { headers });
  }

  // Nouvelle méthode pour récupérer les structures par CED ID
  getStructuresByCedId(cedId: number): Observable<StructureRecherche[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<StructureRecherche[]>(`${this.apiUrl}/structures/${cedId}`, { headers });
  }

  // Ajouter un nouveau professeur
  addProfesseur(professeur: Professeur): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/addProfesseur`, professeur, { headers, responseType: 'text' });
  }

  updateStructure(id: number, structure: StructureRecherche): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/updateStructure/${id}`, structure, { headers, responseType: 'text' });
  }
  deleteStructure(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/deleteStructure/${id}`, { headers, responseType: 'text' });
  }
  
  addStructure(structure: StructureRecherche): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/addStructure`, structure, { headers, responseType: 'text' });
  }

  // Récupérer les candidatures par ID de CED
  getCandidaturesByCedId(id: number): Observable<CandidatureDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CandidatureDTO[]>(`${this.apiUrl}/candidature/${id}`, { headers });
  }
}

