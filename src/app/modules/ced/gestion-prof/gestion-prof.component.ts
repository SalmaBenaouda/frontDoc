import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Professeur } from '../../../models/Professeur.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CedService } from '../../../services/ced/ced.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-gestion-prof',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './gestion-prof.component.html',
  styleUrl: './gestion-prof.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class GestionProfComponent implements OnInit {
  constructor(private authService: AuthService, private cedService: CedService,
    private router: Router,private messageService: MessageService) {}
  successMessage: string | null = null;

  professors: Professeur[] = [];
  filteredProfessors: Professeur[] = [];
  paginatedProfessors: Professeur[] = [];
  selectedProfessor: Professeur | null = null;
  showModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number[] = [];
  etablissements: string[] = [];

  ngOnInit(): void {
    this.fetchProfessors();
      // Vérifier si un message de succès est disponible dans l'état de navigation
      this.successMessage = this.messageService.getSuccessMessage();

      // Effacer le message après l'affichage
      this.messageService.clearSuccessMessage();
    
  }

  // Récupérer la liste des professeurs depuis le backend
  fetchProfessors(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.cedService.getProfesseursByCedId(parseInt(userId)).subscribe(
        (data: Professeur[]) => {
          this.professors = data;
          this.filteredProfessors = data;
          this.extractEtablissements();
          this.calculateTotalPages();
          this.updatePaginatedProfessors();
        },
        (error) => {
          console.error('Erreur lors de la récupération des professeurs :', error);
        }
      );
    }
  }

  extractEtablissements(): void {
    const etabs = this.professors.map(professor => professor.etablissement ?? '').filter((etab, index, self) => etab && self.indexOf(etab) === index);
    this.etablissements = etabs;
  }

  onSearchChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProfessors = this.professors.filter(professor =>
      professor.nom.toLowerCase().includes(searchTerm) ||
      professor.prenom.toLowerCase().includes(searchTerm)
    );
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedProfessors();
  }

  onFilterChange(event: Event): void {
    const selectedEtablissement = (event.target as HTMLSelectElement).value;
    if (selectedEtablissement) {
      this.filteredProfessors = this.professors.filter(professor =>
        professor.etablissement === selectedEtablissement
      );
    } else {
      this.filteredProfessors = this.professors;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedProfessors();
  }

  calculateTotalPages(): void {
    this.totalPages = Array(Math.ceil(this.filteredProfessors.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  updatePaginatedProfessors(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProfessors = this.filteredProfessors.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProfessors();
  }

  viewProfile(professor: Professeur): void {
    this.selectedProfessor = professor;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProfessor = null;
  }
  
  onLogout() {
    this.authService.logout();
  }
}