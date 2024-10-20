import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../models/RegisterRequest.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/v1/auth'; // URL du back-end

  constructor(private http: HttpClient,private router: Router) {}

  // Service pour s'inscrire
  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest);
  }

  // Service pour se connecter
  authenticate(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authentication`, { email, password });
  }

  logout() {
    // Supprimer le token et les informations de session
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Rediriger vers la page de login
    this.router.navigate(['/']);
  }
}