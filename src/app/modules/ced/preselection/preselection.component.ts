import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidature } from '../../../models/candidature.model';
import { Router } from '@angular/router';
import { Professeur } from '../../../models/Professeur.model';
import { CandidatureDTO } from '../../../models/CandidatureDTO.model';
import { CedService } from '../../../services/ced/ced.service';

@Component({
  selector: 'app-preselection',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './preselection.component.html',
  styleUrl: './preselection.component.css',
  encapsulation: ViewEncapsulation.None, 

})
export class PreselectionComponent implements OnInit{
  candidatures: CandidatureDTO[] = [];
  filteredCandidatures: CandidatureDTO[] = [];
  paginatedCandidatures: CandidatureDTO[] = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private cedService: CedService // Injection correcte de CedService
  ) {}
  onLogout() {
    this.authService.logout();
  }
    
   
    selectedCandidature: Candidature | null = null;
    showModal: boolean = false;
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalPages: number[] = [];
    etablissements: string[] = [];

    ngOnInit(): void {
      // Récupérer userId depuis le localStorage
      const userId = localStorage.getItem('userId');
      const cedId = userId ? Number(userId) : null; // Convertir en nombre ou définir à null
    
      // Initialiser les candidatures filtrées et paginées
      this.filteredCandidatures = this.candidatures;
      this.calculateTotalPages();
      this.updatePaginatedCandidatures();
    
      if (cedId !== null) {
        // Appeler le service pour récupérer les candidatures
        this.cedService.getCandidaturesByCedId(cedId).subscribe((data: CandidatureDTO[]) => {
          this.candidatures = data;
          this.filteredCandidatures = data;
          this.calculateTotalPages();
          this.updatePaginatedCandidatures();
          
          // Obtenir les établissements uniques après récupération des données
          this.etablissements = this.getUniqueEtablissements();
        });
      } else {
        console.error("User ID not found in localStorage.");
        // Gérez le cas où userId n'est pas disponible (redirection, message d'erreur, etc.)
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
    onFilterChange(event: Event): void {
      const selectedEtablissement = (event.target as HTMLSelectElement).value;
  
      if (selectedEtablissement) {
          // Filtrer les candidatures par établissement sélectionné
          this.filteredCandidatures = this.candidatures.filter(candidature =>
              candidature.etablissement === selectedEtablissement
          );
      } else {
          // Si aucun établissement n'est sélectionné, afficher toutes les candidatures
          this.filteredCandidatures = this.candidatures;
      }
  
      // Réinitialiser la pagination et mettre à jour les candidatures paginées
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
    getUniqueEtablissements(): string[] {
      const etablissementSet = new Set<string>();
      this.candidatures.forEach(candidature => {
          if (candidature.etablissement) {
              etablissementSet.add(candidature.etablissement);
          }
      });
      return Array.from(etablissementSet);
  }
  
    goToPage(page: number): void {
      this.currentPage = page;
      this.updatePaginatedCandidatures();
    }
    /*viewCandidatureProfile(idCandidat: number): void {
      this.router.navigate([`/ced/candidature`, idCandidat]);
    }*/
    
  }

