import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StructureRecherche } from '../../../models/StructureRecherche.model';
import { CedService } from '../../../services/ced/ced.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-gestion-structure',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './gestion-structure.component.html',
  styleUrl: './gestion-structure.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class GestionStructureComponent {

  constructor(private authService: AuthService, private cedService: CedService,
    private router: Router,private messageService: MessageService) {}
    successMessage: string | null = null;

  structures: StructureRecherche[] = [];
  filteredStructures: StructureRecherche[] = [];
  paginatedStructures: StructureRecherche[] = [];
  etablissements: string[] = [];
  selectedStructure: StructureRecherche | null = null;
  showModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number[] = [];

  ngOnInit(): void {
    // Récupérer l'ID du CED depuis le localStorage
    const storedCedId = localStorage.getItem('userId');
    if (storedCedId) {
      const cedId = +storedCedId;
      this.fetchStructures(cedId);
    }
    // Vérifier si un message de succès est disponible dans l'état de navigation
    this.successMessage = this.messageService.getSuccessMessage();

    // Effacer le message après l'affichage
    this.messageService.clearSuccessMessage();
  }

  // Méthode pour récupérer les structures du CED
  fetchStructures(cedId: number): void {
    this.cedService.getStructuresByCedId(cedId).subscribe(
      (data: StructureRecherche[]) => {
        this.structures = data;
        this.filteredStructures = data;
        this.extractEtablissements();
        this.calculateTotalPages();
        this.updatePaginatedStructures();
      },
      (error) => {
        console.error('Erreur lors de la récupération des structures de recherche :', error);
      }
    );
  }

  // Extraire les établissements uniques des structures
  extractEtablissements(): void {
    this.etablissements = this.structures
      .map(structure => structure.etablissement)
      .filter((etab, index, self) => etab && self.indexOf(etab) === index);
  }

  // Méthode pour sauvegarder les modifications d'une structure
  saveStructure(): void {
    if (this.selectedStructure && this.selectedStructure.id != null) {
      // Envoyer la mise à jour au backend
      this.cedService.updateStructure(this.selectedStructure.id, this.selectedStructure).subscribe(
        (response) => {
          console.log('Structure mise à jour avec succès', response);
          // Mise à jour de la structure localement après succès
          const index = this.filteredStructures.findIndex(structure => structure.id === this.selectedStructure?.id);
          if (index !== -1) {
            this.filteredStructures[index] = { ...this.selectedStructure } as StructureRecherche; // Correction ici
            this.updatePaginatedStructures();
          }
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la structure', error);
        }
      );
    } else {
      console.error("Erreur : `selectedStructure` ou `id` non défini");
    }
  }
  

  onSearchChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredStructures = this.structures.filter(structure =>
      structure.nom.toLowerCase().includes(searchTerm)
    );
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedStructures();
  }

  onFilterChange(event: Event): void {
    const selectedEtablissement = (event.target as HTMLSelectElement).value;
    if (selectedEtablissement) {
      this.filteredStructures = this.structures.filter(structure =>
        structure.etablissement === selectedEtablissement
      );
    } else {
      this.filteredStructures = this.structures;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedStructures();
  }

  calculateTotalPages(): void {
    this.totalPages = Array(Math.ceil(this.filteredStructures.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  updatePaginatedStructures(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedStructures = this.filteredStructures.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedStructures();
  }

  editStructure(index: number): void {
    this.selectedStructure = { ...this.paginatedStructures[index] };
    this.showModal = true;
  }

  deleteStructure(index: number): void {
    // Récupérer l'ID de la structure à supprimer
    const startIndex = (this.currentPage - 1) * this.itemsPerPage + index;
    const structureId = this.paginatedStructures[index].id;
  
    // Appeler le service pour supprimer la structure
    if (structureId != null) {
      this.cedService.deleteStructure(structureId).subscribe(
        (response) => {
          console.log('Structure supprimée avec succès', response);
          // Supprimer la structure localement après succès
          this.filteredStructures.splice(startIndex, 1);
          this.calculateTotalPages();
          this.updatePaginatedStructures();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la structure', error);
        }
      );
    } else {
      console.error("Erreur : ID de la structure non défini");
    }
  }
  confirmDelete(index: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette structure ?')) {
      this.deleteStructure(index);
    }
  }
  

  closeModal(): void {
    this.showModal = false;
    this.selectedStructure = null;
  }

  onLogout() {
    this.authService.logout();
  }
}