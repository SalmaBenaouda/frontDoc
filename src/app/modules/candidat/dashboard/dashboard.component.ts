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
  candidatDetails!: Candidatdetails; // stocker les détails du candidat
  photoUrl: string | null = 'images/profilCandidatdefault.png';
  totalCandidatures: number = 0; //  stocker le nombre total de candidatures
  candidaturePercentage: number = 0; // stocker le pourcentage de candidatures
  refusedCandidaturesCount: number = 0;
  acceptedCandidaturesCount: number = 0;
  candidatNom: string = '';

  constructor(private candidatService: CandidatService, private authService: AuthService) {}

  ngOnInit() {
    const canId = Number(localStorage.getItem('userId'));
    this.loadPhoto(canId); 
    this.candidatService.getCandidatDetails(canId).subscribe({
      next: (details: Candidatdetails) => {
        this.candidatDetails = details;
        this.candidatNom = details.nom;  // Assigner le prénom
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails du candidat :', err);
      }
    });
    this.candidatService.fetchCandidatures(canId).subscribe(
      (data) => {
        this.candidatures = data;
        this.totalCandidatures = this.candidatures.length; // Compter le nombre de candidatures
        this.calculateCandidaturePercentage(); // Calculer le pourcentage de candidatures
        this.refusedCandidaturesCount = this.countRefusedCandidatures();
        this.acceptedCandidaturesCount = this.countAcceptedCandidatures();
      },
      (error) => {
        console.error('Erreur lors de la récupération des candidatures', error);
      }
    );
  }
  countRefusedCandidatures(): number {
    return this.candidatures.filter(candidature => candidature.statuts === 'Refusee').length;
  }
  countAcceptedCandidatures(): number {
    return this.candidatures.filter(candidature => candidature.statuts === 'Acceptee').length;
  }
  loadPhoto(userId: number): void {
    this.candidatService.getPhoto(userId).subscribe({
      next: (blob) => {
        if (blob.size === 0) {
          // Si le blob est vide, conserver l'image par défaut
          this.photoUrl = 'images/profilCandidatdefault.png';
        } else {
          // Charger la photo du blob
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.photoUrl = reader.result as string;
          };
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la photo :', err);
        // Conserver l'image par défaut en cas d'erreur
        this.photoUrl = 'assets/images/profilCandidatdefault.png';
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
