import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Candidature } from '../../../models/candidature.model';
import { Professeur } from '../../../models/Professeur.model';
import { ProfesseurDTO } from '../../../models/ProfesseurDTO.model';
import { ProfesseurService } from '../../../services/prof/professeur.service';
@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class SelectionComponent implements OnInit{
  professeur: ProfesseurDTO = new ProfesseurDTO('', '', '', 0, '', '','',0); // Initialisation complète
  constructor(private professeurService: ProfesseurService, private authService: AuthService) {}

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
        email: '',
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
        id: 0,titre: 'Sujet 1', structureRecherche: {
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
        email: '',
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
        id: 0,titre: 'Sujet 2', structureRecherche: {
          id: 0,
          nom: '',
          domaine: '',
          etablissement: 'Tanger',
          ced_id: 0
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
    this.loadProfesseurData();
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
  /*viewCandidatureProfile(idCandidat: number): void {
    this.router.navigate([`/ced/candidature`, idCandidat]);
  }*/
  
}

