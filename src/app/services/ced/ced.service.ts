import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StructureRecherche } from '../../models/StructureRecherche.model';
import { Professeur } from '../../models/Professeur.model';
import { CandidatureDTO } from '../../models/CandidatureDTO.model';
import { CandidatureDetailsDTO } from '../../models/CandidatureDetailsDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CedService {

  private apiUrl = 'http://localhost:8082/CED'; // Remplacer par l'URL de votre backend

  constructor(private http: HttpClient) {}
  getProfesseursByCedId(cedId: number): Observable<Professeur[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Professeur[]>(`${this.apiUrl}/professeur/${cedId}`, { headers });
  }

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
  getCandidatureDetails(candidatId: number): Observable<CandidatureDetailsDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CandidatureDetailsDTO>(`${this.apiUrl}/candidatureDetails/${candidatId}`, { headers });
  }
  getCin(candidatId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/getCin/${candidatId}`, { headers, responseType: 'blob' });
  }
  

  getCv(candidatId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/getcv/${candidatId}`, { headers, responseType: 'blob' });
  }

  getDiplomeBac(candidatId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/GetDiplomesBacFiles/${candidatId}`, { headers, responseType: 'blob' });
  }

  getDiplomeLicence(candidatId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/GetDiplomesLicenceFiles/${candidatId}`, { headers, responseType: 'blob' });
  }

  getDiplomeMaster(candidatId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/GetDiplomesMasterFiles/${candidatId}`, { headers, responseType: 'blob' });
  }

  getLicenceReleve(candidatId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/GetDiplomesLicenceReleveFiles/${candidatId}`, { headers, responseType: 'blob' });
  }

  getMasterReleve(candidatId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/GetDiplomesMasterReleveFiles/${candidatId}`, { headers, responseType: 'blob' });
  }

  getPhoto(candidatId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/getPhoto/${candidatId}`, { headers, responseType: 'blob' });
  }

  refuserCandidature(candidatureId: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/refuseCandidature/${candidatureId}`, {}, { headers, responseType: 'text' });
  }

  accepterCandidature(candidatureId: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/acceptCandidature/${candidatureId}`, {}, { headers, responseType: 'text' });
  }
}

