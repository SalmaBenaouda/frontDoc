import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujet } from '../../models/Sujet.model';

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
}
