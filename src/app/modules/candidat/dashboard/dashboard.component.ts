import { AuthService } from '../../../services/auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CandidatService } from '../../../services/candidat/candidat.service';
import { Candidatdetails } from '../../../models/Candidatdetails.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { candidaturedashboard } from '../../../models/candidaturedashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  candidatures: candidaturedashboard[] = [];
  candidatDetails!: Candidatdetails; // Variable pour stocker les détails du candidat
  photoUrl: string | undefined;
  totalCandidatures: number = 0; // Propriété pour stocker le nombre total de candidatures
  candidaturePercentage: number = 0; // Propriété pour stocker le pourcentage de candidatures

  constructor(private candidatService: CandidatService, private authService: AuthService) {}

  ngOnInit() {
    const canId = Number(localStorage.getItem('userId')); // Récupérer l'ID utilisateur et le convertir en nombre
    this.loadPhoto(canId); // Appeler la méthode loadPhoto avec canId

    this.candidatService.fetchCandidatures(canId).subscribe(
      (data) => {
        this.candidatures = data;
        this.totalCandidatures = this.candidatures.length; // Compter le nombre de candidatures
        this.calculateCandidaturePercentage(); // Calculer le pourcentage de candidatures
      },
      (error) => {
        console.error('Erreur lors de la récupération des candidatures', error);
      }
    );
  }

  loadPhoto(userId: number): void {
    this.candidatService.getPhoto(userId).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.photoUrl = reader.result as string;
        };
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la photo :', err);
      }
    });
  }

  calculateCandidaturePercentage(): void {
    const maxCandidatures = 3; // Le maximum de candidatures
    this.candidaturePercentage = (this.totalCandidatures / maxCandidatures) * 100; // Calculer le pourcentage
  }

  onLogout() {
    this.authService.logout(); // Déconnexion de l'utilisateur
  }
}
