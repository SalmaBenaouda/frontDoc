import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sujet } from '../../../models/Sujet.model';
import { Professeur } from '../../../models/Professeur.model';

@Component({
  selector: 'app-depot-sujet',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './depot-sujet.component.html',
  styleUrl: './depot-sujet.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DepotSujetComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }

  sujets: Sujet[] = [
    {
      titre: 'Sujet 1',
      thematiques: 'Technologies et Sciences',
      structureRecherche: {
        id: 0,
        nom: 'STI',
        domaine: '',
        etablissement: 'Tetouan',
        ced_id: 0,
      },
      description: 'Étude des systèmes basés sur des règles.',
      professeur_id: 0,
      structureRecherche_id: 0,
      professeur: new Professeur(),
    },
    {
      titre: 'Réseaux de Neurones',
      thematiques: 'Sciences Humaines et Sociales',
      structureRecherche: {
        id: 0,
        nom: 'STI',
        domaine: '',
        etablissement: 'Tanger',
        ced_id: 0,
      },
      description: 'Sujet sur l’apprentissage profond.',
      professeur_id: 0,
      structureRecherche_id: 0,
      professeur: new Professeur(),
    },
    {
      titre: 'Systèmes Experts',
      thematiques: 'Technologies et Sciences',
      structureRecherche: {
        id: 0,
        nom: 'STI',
        domaine: '',
        etablissement: 'Tanger',
        ced_id: 0,
      },
      description: 'Étude des systèmes basés sur des règles.',
      professeur_id: 0,
      structureRecherche_id: 0,
      professeur: new Professeur(),
    },
    {
      titre: 'a 1',
      thematiques: 'Technologies et Sciences',
      structureRecherche: {
        id: 0,
        nom: 'STI',
        domaine: '',
        etablissement: 'Tetouan',
        ced_id: 0,
      },
      description: 'Étude des systèmes basés sur des règles.',
      professeur_id: 0,
      structureRecherche_id: 0,
      professeur: new Professeur(),
    },
    {
      titre: 'u 1',
      thematiques: 'Technologies et Sciences',
      structureRecherche: {
        id: 0,
        nom: 'STI',
        domaine: '',
        etablissement: 'Tetouan',
        ced_id: 0,
      },
      description: 'Étude des systèmes basés sur des règles.',
      professeur_id: 0,
      structureRecherche_id: 0,
      professeur: new Professeur(),
    },
    {
      titre: 'Sujet 2',
      thematiques: 'Technologies et Sciences',
      structureRecherche: {
        id: 0,
        nom: 'STI',
        domaine: '',
        etablissement: 'Tetouan',
        ced_id: 0,
      },
      description: 'Étude des systèmes basés sur des règles.',
      professeur_id: 0,
      structureRecherche_id: 0,
      professeur: new Professeur(),
    },
  ];

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
    this.filteredSujets = this.sujets;
    this.calculateTotalPages();
    this.updatePaginatedSujets();
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
    this.sujetToEdit = sujet;
    this.showEditModal = true;
  }
  

  closeEditModal(): void {
    this.showEditModal = false;
    this.sujetToEdit = null;
  }

  saveSujet(): void {
    if (this.sujetToEdit) {
      this.updatePaginatedSujets();
      this.closeEditModal();
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