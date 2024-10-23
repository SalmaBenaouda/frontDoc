import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StructureRecherche } from '../../../models/StructureRecherche.model';

@Component({
  selector: 'app-gestion-structure',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './gestion-structure.component.html',
  styleUrl: './gestion-structure.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class GestionStructureComponent {
  constructor(private authService: AuthService) {}
  
  onLogout() {
    this.authService.logout();
  }
  structures: StructureRecherche[] = [
    {
      id: 1,
      nom: 'Structure A',
      domaine: 'Informatique',
      etablissement: 'Etablissement 1',
      ced_id: 128
    },
    {
      id: 2,
      nom: 'Structure B',
      domaine: 'Mathématiques',
      etablissement: 'Etablissement 2',
      ced_id: 128

    },
    {
      id: 3,
      nom: 'Structure C',
      domaine: 'Physique',
      etablissement: 'Etablissement 3',
      ced_id: 128

    },
    {
      id: 4,
      nom: 'Structure D',
      domaine: 'Chimie',
      etablissement: 'Etablissement 1',
      ced_id: 128

    }
  ];
  filteredStructures: StructureRecherche[] = [];
    paginatedStructures: StructureRecherche[] = [];
    selectedStructure: StructureRecherche | null = null;
    showModal: boolean = false;
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalPages: number[] = [];

    ngOnInit(): void {
      this.filteredStructures = this.structures;
      this.calculateTotalPages();
      this.updatePaginatedStructures();
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
      const startIndex = (this.currentPage - 1) * this.itemsPerPage + index;
      this.filteredStructures.splice(startIndex, 1);
      this.calculateTotalPages();
      this.updatePaginatedStructures();
    }

    saveStructure(): void {
      if (this.selectedStructure) {
        const index = this.filteredStructures.findIndex(structure => structure.id === this.selectedStructure?.id);
        if (index !== -1) {
          this.filteredStructures[index] = this.selectedStructure;
          this.updatePaginatedStructures();
        }
      }
      this.closeModal();
    }

    closeModal(): void {
      this.showModal = false;
      this.selectedStructure = null;
    }
  }