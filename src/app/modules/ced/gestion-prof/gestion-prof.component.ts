import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Professeur } from '../../../models/Professeur.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-prof',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './gestion-prof.component.html',
  styleUrl: './gestion-prof.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class GestionProfComponent implements OnInit {
  constructor(private authService: AuthService) {}
  professors: Professeur[] = [
    // Liste de professeurs (données fictives)
    {
      id: 1,
      nom: 'Professeur 1',
      prenom: 'Prenom 1',
      email: 'prof1@example.com',
      centreId: 1,
      structureRecherche: {
        id: 1,
        nom: 'Structure A',
        domaine: 'Informatique',
        etablissement: 'Etablissement 1',
        cedId: 1
      }
    },
    {
      id: 2,
      nom: 'Professeur 2',
      prenom: 'Prenom 2',
      email: 'prof2@example.com',
      centreId: 2,
      structureRecherche: {
        id: 2,
        nom: 'Structure B',
        domaine: 'Mathématiques',
        etablissement: 'Etablissement 2',
        cedId: 2
      }
    },
    {
      id: 1,
      nom: 'Professeur 1',
      prenom: 'Prenom 1',
      email: 'prof1@example.com',
      centreId: 1,
      structureRecherche: {
        id: 1,
        nom: 'Structure A',
        domaine: 'Informatique',
        etablissement: 'Etablissement 1',
        cedId: 1
      }
    },
    {
      id: 1,
      nom: 'Professeur 1',
      prenom: 'Prenom 1',
      email: 'prof1@example.com',
      centreId: 1,
      structureRecherche: {
        id: 1,
        nom: 'Structure A',
        domaine: 'Informatique',
        etablissement: 'Etablissement 1',
        cedId: 1
      }
    },
    {
      id: 1,
      nom: 'Professeur 1',
      prenom: 'Prenom 1',
      email: 'prof1@example.com',
      centreId: 1,
      structureRecherche: {
        id: 1,
        nom: 'Structure A',
        domaine: 'Informatique',
        etablissement: 'Etablissement 1',
        cedId: 1
      }
    },
    {
      id: 1,
      nom: 'Professeur 1',
      prenom: 'Prenom 1',
      email: 'prof1@example.com',
      centreId: 1,
      structureRecherche: {
        id: 1,
        nom: 'Structure A',
        domaine: 'Informatique',
        etablissement: 'Etablissement 1',
        cedId: 1
      }
    },
    // Ajouter d'autres professeurs...
  ];

  filteredProfessors: Professeur[] = [];
  paginatedProfessors: Professeur[] = [];
  selectedProfessor: Professeur | null = null;
    showModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number[] = [];

  ngOnInit(): void {
    this.filteredProfessors = this.professors;
    this.calculateTotalPages();
    this.updatePaginatedProfessors();
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
        professor.structureRecherche?.etablissement === selectedEtablissement
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