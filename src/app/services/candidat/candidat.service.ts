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

}