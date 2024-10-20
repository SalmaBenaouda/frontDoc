import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Langue } from '../../models/Langue.model';

@Injectable({
  providedIn: 'root',
})
export class LangueService {
  private baseUrl = 'http://localhost:8081/Candidat'; 

  constructor(private http: HttpClient) {}

  addLangues(userId: number, langues: Langue[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addLangue/${userId}`, langues);
  }
}
