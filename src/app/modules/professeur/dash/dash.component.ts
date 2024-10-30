import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfesseurDTO } from '../../../models/ProfesseurDTO.model';
import { ProfesseurService } from '../../../services/prof/professeur.service';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DashComponent implements OnInit {
  professeur: ProfesseurDTO = new ProfesseurDTO('', '', '', 0, '', '','',0);
  candidaturesNonTraitees: number = 0;
  totalSujets: number = 0;
  maxSujets: number = 9;
  constructor(private professeurService: ProfesseurService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfesseurData();
    this.loadCandidaturesNonTraitees();
    this.loadTotalSujets();
  }

  loadProfesseurData(): void {
    const userId = Number(localStorage.getItem('userId')); // Récupère `userId` depuis localStorage
    if (userId) {
      this.professeurService.findProfesseurById(userId).subscribe(
        (data: ProfesseurDTO) => {
          this.professeur = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des données du professeur:', error);
        }
      );
    } else {
      console.error('userId introuvable dans localStorage');
    }
  }
  loadCandidaturesNonTraitees(): void {
    const professeurId = Number(localStorage.getItem('userId')); 
    if (professeurId) {
      this.professeurService.getCandidaturesByProfId(professeurId).subscribe({
        next: (candidatures) => {
          this.candidaturesNonTraitees = candidatures.length; // Compter le nombre total de candidatures
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des candidatures :', err);
        }
      });
    } else {
      console.error("Impossible de trouver l'id du professeur.");
    }
  }
  loadTotalSujets(): void {
    const professeurId = Number(localStorage.getItem('userId')); 
    if (professeurId) {
      this.professeurService.getSujetsByProfesseurId(professeurId).subscribe({
        next: (sujets) => {
          this.totalSujets = sujets.length; // Compter le nombre total de sujets
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des sujets :', err);
        }
      });
    } else {
      console.error("Impossible de trouver l'id du professeur.");
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
