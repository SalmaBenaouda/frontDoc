// src/app/services/candidat/candidat.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Langue } from '../../models/Langue.model';
import { Diplome } from '../../models/Diplome.model';
import { ExperienceProf } from '../../models/ExperienceProf.model';
import { AddCandidatedetailsRequest } from '../../models/AddCandidatedetailsRequest.model';
import { Candidatdetails } from '../../models/Candidatdetails.model';
import { Sujet } from '../../models/Sujet.model';
import { CandidatureDetails } from '../../models/CandidatureDetails.model';
import { candidaturedashboard } from '../../models/candidaturedashboard.model';
import { DTOgene } from '../../models/DTOgene.model';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private baseUrl = 'http://localhost:8081/Candidat';

  constructor(private http: HttpClient) {}

  getCandidatDetails(userId: number): Observable<Candidatdetails> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Candidatdetails>(`${this.baseUrl}/alldetails/${userId}`, { headers });
  }

  addDetails(userId: number, candidatdetails: AddCandidatedetailsRequest): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/addDetails/${userId}`, candidatdetails, { headers, responseType: 'text' });
  }

  addDiplomes(userId: number, diplomes: Diplome[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addDiplome/${userId}`, diplomes, { headers, responseType: 'text' });
  }

  addExperiences(userId: number, experiences: ExperienceProf[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addExperience/${userId}`, experiences, { headers, responseType: 'text' });
  }  

  addLangues(userId: number, langues: Langue[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addLangue/${userId}`, langues, { headers, responseType: 'text' });
  }
  
  uploadGeneralDocuments(userId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addDocuments/${userId}`, formData, { headers, responseType: 'text' });
  }

  uploadDiplomeFiles(userId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/AdddiplomesFiles/${userId}`, formData, { headers, responseType: 'text' });
  }
  getPhoto(userId: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/getPhoto/${userId}`, { headers, responseType: 'blob' });
  }
  
  getCEDDetails(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/GetCED`, { headers });
  }
  
  getSujetsByStructureId(structureId: number): Observable<Sujet[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Sujet[]>(`${this.baseUrl}/structure/${structureId}`, { headers });
  }

  addCandidature(candidatureRequest: { sujet_id: number; candidat_id: number }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addCandidature`, candidatureRequest, { headers, responseType: 'text' });
  }
  
  getCandidatures(userId: number): Observable<CandidatureDetails[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CandidatureDetails[]>(`${this.baseUrl}/getCandidatures/${userId}`, { headers });
  }
  removeCandidature(candidatureId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/deleteCandidature/${candidatureId}`, null, { headers, responseType: 'text' });
  }
  
  fetchCandidatures(userId: number): Observable<candidaturedashboard[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<candidaturedashboard[]>(`${this.baseUrl}/getCandidatures/${userId}`, { headers });
  }
  
  
  
  getCandidatureAccepteeByCandidatId(candidatId: number): Observable<DTOgene[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<DTOgene[]>(`${this.baseUrl}/candidatureAcceptee/${candidatId}`, { headers });
  }

}
