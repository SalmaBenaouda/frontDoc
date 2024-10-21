import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExperienceProf } from '../../models/ExperienceProf.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private baseUrl = 'http://localhost:8081/Candidat';

  constructor(private http: HttpClient) {}

  addExperiences(userId: number, experiences: ExperienceProf[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addExperience/${userId}`, experiences, { headers, responseType: 'text' });
  }
}
