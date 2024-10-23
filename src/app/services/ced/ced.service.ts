import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StructureRecherche } from '../../models/StructureRecherche.model';
import { Professeur } from '../../models/Professeur.model';

@Injectable({
  providedIn: 'root'
})
export class CedService {
  private apiUrl = 'http://localhost:8081/CED'; // Remplacer par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Ajouter un nouveau professeur
  addProfesseur(professeur: Professeur): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/addProfesseur`, professeur, { headers });
  }
}

