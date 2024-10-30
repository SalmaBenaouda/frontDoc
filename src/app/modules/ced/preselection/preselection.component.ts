import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidature } from '../../../models/candidature.model';
import { Router } from '@angular/router';
import { Professeur } from '../../../models/Professeur.model';
import { CandidatureDTO } from '../../../models/CandidatureDTO.model';
import { CedService } from '../../../services/ced/ced.service';
import { MessageService } from '../../../services/message/message.service';

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
    private cedService: CedService,
    private messageService: MessageService
  ) {}
  onLogout() {
    this.authService.logout();
  }
    selectedCandidature: Candidature | null = null;
    showModal: boolean = false;
    currentPage: number = 1;
    itemsPerPage: number = 5;
    totalPages: number[] = [];
    successMessage: string | null = null;

    ngOnInit(): void {
      // Récupérer userId depuis le localStorage
      const userId = localStorage.getItem('userId');
      const cedId = userId ? Number(userId) : null; // Convertir en nombre ou définir à null
      this.successMessage = this.messageService.getSuccessMessage();
      // Effacer le message après l'affichage
      this.messageService.clearSuccessMessage();

      // Initialiser les candidatures filtrées et paginées
      this.filteredCandidatures = this.candidatures;
      this.calculateTotalPages();
      this.updatePaginatedCandidatures();
    
      if (cedId !== null) {
        this.cedService.getCandidaturesByCedId(cedId).subscribe((data: CandidatureDTO[]) => {
          this.candidatures = data;
          this.filteredCandidatures = data;
          this.calculateTotalPages();
          this.updatePaginatedCandidatures();
        });
      } else {
        console.error("User ID not found in localStorage.");
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
    
    voirProfil(candidature: CandidatureDTO): void {
      const candidatId = candidature.id; // Assurez-vous que `candidatId` est la propriété correcte
      this.router.navigate(['/CED/candidature', candidatId]);
    }
  }

