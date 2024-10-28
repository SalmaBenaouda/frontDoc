import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sujet } from '../../../models/Sujet.model';
import { ProfesseurService } from '../../../services/prof/professeur.service';

@Component({
  selector: 'app-depot-sujet',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './depot-sujet.component.html',
  styleUrl: './depot-sujet.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DepotSujetComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private professeurService: ProfesseurService
  ) {}

  sujets: Sujet[] = [];
  filteredSujets: Sujet[] = [];
  paginatedSujets: Sujet[] = [];
  selectedSujet: Sujet | null = null;
  sujetToEdit: Sujet | null = null;  
  showModal: boolean = false;
  showEditModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number[] = [];

  ngOnInit(): void {
    const professeurId = localStorage.getItem('userId');
    if (professeurId) {
      const professeurIdNumber = parseInt(professeurId, 10);
      this.professeurService.getSujetsByProfesseurId(professeurIdNumber).subscribe({
        next: (sujets: Sujet[]) => {
          this.sujets = sujets;
          this.filteredSujets = sujets;
          this.calculateTotalPages();
          this.updatePaginatedSujets();
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des sujets :', err);
        }
      });
    }
  }

  onLogout() {
    this.authService.logout();
  }

  onSearchChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredSujets = this.sujets.filter((sujet) =>
      sujet.titre.toLowerCase().includes(searchTerm)
    );
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedSujets();
  }

  onFilterChange(event: Event): void {
    const selectedEtablissement = (event.target as HTMLSelectElement).value;
    if (selectedEtablissement) {
      this.filteredSujets = this.sujets.filter(
        (sujet) =>
          sujet.structureRecherche?.etablissement === selectedEtablissement
      );
    } else {
      this.filteredSujets = this.sujets;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedSujets();
  }

  calculateTotalPages(): void {
    this.totalPages = Array(
      Math.ceil(this.filteredSujets.length / this.itemsPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  updatePaginatedSujets(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSujets = this.filteredSujets.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedSujets();
  }

  viewSujetDetails(sujet: Sujet): void {
    this.selectedSujet = sujet;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedSujet = null;
  }

  editSujet(sujet: Sujet): void {
    this.sujetToEdit = { ...sujet }; // Copie du sujet pour édition
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.sujetToEdit = null;
  }

  saveSujet(): void {
    if (this.sujetToEdit) {
      this.professeurService.updateSujet(this.sujetToEdit.id, this.sujetToEdit).subscribe({
        next: (response: string) => {
          console.log(response);
          // Mise à jour de la liste des sujets
          const index = this.sujets.findIndex((s) => s.id === this.sujetToEdit!.id);
          if (index !== -1) {
            // Créez un nouvel objet Sujet en utilisant les propriétés de sujetToEdit
            this.sujets[index] = {
              ...this.sujets[index], // Conserve les autres propriétés déjà existantes
              ...this.sujetToEdit,   // Remplace uniquement les propriétés mises à jour
            };
          }
          this.updatePaginatedSujets();
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du sujet :', err);
        }
      });
    }
  }
  
  
  deleteSujet(index: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce sujet?")) {
      this.sujets.splice(index, 1);
      this.calculateTotalPages();
      this.updatePaginatedSujets();
    }
  }
}
