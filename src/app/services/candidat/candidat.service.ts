// src/app/services/candidat/candidat.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Langue } from '../../models/Langue.model';
import { Diplome } from '../../models/Diplome.model';
import { ExperienceProf } from '../../models/ExperienceProf.model';
import { AddCandidatedetailsRequest } from '../../models/AddCandidatedetailsRequest.model';
import { Candidatdetails } from '../../models/Candidatdetails.model';


@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private baseUrl = 'http://localhost:8082/Candidat';

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
  
}
