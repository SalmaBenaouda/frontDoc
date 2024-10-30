import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujet } from '../../models/Sujet.model';
import { ProfesseurDTO } from '../../models/ProfesseurDTO.model';
import { CandidatureDTO } from '../../models/CandidatureDTO.model';
import { Candidatdetails } from '../../models/Candidatdetails.model';
import { CandidatureDetailsDTO } from '../../models/CandidatureDetailsDTO.model';

@Injectable({
  providedIn: 'root',
})
export class ProfesseurService {
  private apiUrl = 'http://localhost:8081/Professeur';

  constructor(private http: HttpClient) {}

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
  
  accepterCandidature(candidatureId: number, date: string): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/accepterCandidature/${candidatureId}?date=${date}`,{ headers, responseType: 'text' });
  }

  refuserCandidature(candidatureId: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/refuserCandidature/${candidatureId}`,{ headers, responseType: 'text' });
  }
  
  
}
