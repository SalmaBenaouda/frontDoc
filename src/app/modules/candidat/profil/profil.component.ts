import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Langue } from '../../../models/Langue.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class ProfilComponent {
  langues: Langue[] = [
    new Langue(), // Langue 1
    new Langue(), // Langue 2
    new Langue(), // Langue 3
  ];

  constructor(private authService: AuthService, private http: HttpClient) {}

  saveLangues() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Aucun utilisateur connecté');
      return;
    }

    // Filtrer les langues remplies (éviter d'enregistrer des champs vides)
    const languesToSave = this.langues.filter(langue => langue.langue && langue.niveau);
    
    if (languesToSave.length > 0) {
      this.http.post(`http://localhost:8081/api/v1/Candidat/${userId}/addLangues`, languesToSave)
        .subscribe({
          next: (response) => {
            console.log('Langues enregistrées avec succès', response);
          },
          error: (err) => {
            console.error('Erreur lors de l\'enregistrement des langues', err);
          }
        });
    } else {
      console.error('Aucune langue à enregistrer');
    }
  }

  onLogout() {
    this.authService.logout();
  }
}