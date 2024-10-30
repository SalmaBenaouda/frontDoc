import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Candidature } from '../../../models/candidature.model';
import { Professeur } from '../../../models/Professeur.model';
import { ProfesseurDTO } from '../../../models/ProfesseurDTO.model';
import { ProfesseurService } from '../../../services/prof/professeur.service';
import { CandidatureDTO } from '../../../models/CandidatureDTO.model';
@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class SelectionComponent implements OnInit{
  professeur: ProfesseurDTO = new ProfesseurDTO('', '', '', 0, '', '', '', 0);
  candidatures: CandidatureDTO[] = [];
  filteredCandidatures: CandidatureDTO[] = [];
  paginatedCandidatures: CandidatureDTO[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number[] = [];
  uniqueEtablissements: string[] = [];

  constructor(private professeurService: ProfesseurService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfesseurData();
    this.loadCandidatures(); // Charge les candidatures au démarrage
  }

  loadCandidatures(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
        this.professeurService.getCandidaturesByProfId(userId).subscribe(
            (data: CandidatureDTO[]) => {
                this.candidatures = data;
                this.filteredCandidatures = this.candidatures;
                this.calculateTotalPages();
                this.updatePaginatedCandidatures();
            },
            (error) => {
                console.error('Erreur lors de la récupération des candidatures:', error);
            }
        );
    } else {
        console.error('userId introuvable dans localStorage');
    }
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

  onSearchChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCandidatures = this.candidatures.filter(candidature =>
      candidature.nomPrenom.toLowerCase().includes(searchTerm)
    );
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedCandidatures();
  }

  
  calculateTotalPages(): void {
    this.totalPages = Array(Math.ceil(this.filteredCandidatures.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  updatePaginatedCandidatures(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCandidatures = this.filteredCandidatures.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedCandidatures();
  }

  onLogout() {
    this.authService.logout();
  }
}