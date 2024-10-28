import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidature } from '../../../models/candidature.model';
import { Professeur } from '../../../models/Professeur.model';

@Component({
  selector: 'app-inscription-doctorant',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './inscription-doctorant.component.html',
  styleUrl: './inscription-doctorant.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class InscriptionDoctorantComponent {
  constructor(private router: Router,private authService: AuthService) {}
  
  onLogout() {
    this.authService.logout();
  }
  candidatures: Candidature[] = [
    {
      id: 1,
      idCandidat: 101,
      candidat: {
        nom: 'Candidat A',
        id: 0,
        prenom: '',
        email: 'candidatB@gmail.com',
        cin: '',
        telephone: '',
        situationFamiliale: '',
        nationalite: '',
        prenomArabe: '',
        nomArabe: '',
        payeNaissance: '',
        adresse: '',
        codePostal: 0,
        professionPere: '',
        professionMere: '',
        provincePere: '',
        provinceMere: '',
        profession: '',
        cvScanne: '',
        cinScanne: ''
      },
      idSujet: 201,
      sujet: {
        id:0,titre: 'Sujet 1',
        structureRecherche: {
          id: 0,
          nom: '',
          domaine: '',
          etablissement: 'Tetouan',
          ced_id: 0
        },
        description: '',
        professeur_id: 0,
        structureRecherche_id: 0,
        professeur: new Professeur
      },
      statut: 'En attente',
      dateEntretien: '2024-11-15'
    },
    {
      id: 2,
      idCandidat: 102,
      candidat: {
        nom: 'Candidat B',
        id: 0,
        prenom: '',
        email: 'candidatB@gmail.com',
        cin: '',
        telephone: '',
        situationFamiliale: '',
        nationalite: '',
        prenomArabe: '',
        nomArabe: '',
        payeNaissance: '',
        adresse: '',
        codePostal: 0,
        professionPere: '',
        professionMere: '',
        provincePere: '',
        provinceMere: '',
        profession: '',
        cvScanne: '',
        cinScanne: ''
      },
      idSujet: 202,
      sujet: {
        id:0,titre: 'Sujet 2',
        structureRecherche: {
          id: 0,
          nom: '',
          domaine: '',
          etablissement: 'Tanger',
          ced_id: 0,
        },
        description: '',
        professeur_id: 0,
        structureRecherche_id: 0,
        professeur: new Professeur
      },
      statut: 'Accepté',
      dateEntretien: '2024-11-16'
    },
    // Ajouter d'autres candidatures...
  ];
  filteredCandidatures: Candidature[] = [];
  paginatedCandidatures: Candidature[] = [];
  selectedCandidature: Candidature | null = null;
  showModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number[] = [];

  ngOnInit(): void {
    this.filteredCandidatures = this.candidatures;
    this.calculateTotalPages();
    this.updatePaginatedCandidatures();
  }

  onSearchChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCandidatures = this.candidatures.filter(candidature =>
      candidature.candidat?.nom.toLowerCase().includes(searchTerm)
    );
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedCandidatures();
  }

  onFilterChange(event: Event): void {
    const selectedEtablissement = (event.target as HTMLSelectElement).value;
    if (selectedEtablissement) {
      this.filteredCandidatures = this.candidatures.filter(candidature =>
        candidature.sujet?.structureRecherche.etablissement === selectedEtablissement
      );
    } else {
      this.filteredCandidatures = this.candidatures;
    }
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
}
