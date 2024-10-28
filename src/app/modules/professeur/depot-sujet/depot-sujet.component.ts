import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sujet } from '../../../models/Sujet.model';
import { ProfesseurService } from '../../../services/prof/professeur.service';
import { MessageService } from '../../../services/message/message.service';
import { ProfesseurDTO } from '../../../models/ProfesseurDTO.model';


@Component({
  selector: 'app-depot-sujet',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './depot-sujet.component.html',
  styleUrl: './depot-sujet.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DepotSujetComponent implements OnInit {
  professeur: ProfesseurDTO = new ProfesseurDTO('', '', '', 0, '', '','',0); // Initialisation complète
  constructor(
    private authService: AuthService,
    private professeurService: ProfesseurService,private messageService: MessageService) {}
    successMessage: string | null = null;
    errorMessage: string | null = null;
  

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
    this.successMessage = this.messageService.getSuccessMessage();
    this.loadProfesseurData();
      // Effacer le message après l'affichage
      this.messageService.clearSuccessMessage();
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
      // Prépare un objet Sujet complet en utilisant les propriétés existantes de sujetToEdit
      const updatedSujet: Sujet = {
        ...this.sujetToEdit, // Conserve les propriétés existantes (comme id, professeur_id, structureRecherche_id, etc.)
        titre: this.sujetToEdit.titre,
        thematique: this.sujetToEdit.thematique,
        description: this.sujetToEdit.description,
      };
  
      this.professeurService.updateSujet(this.sujetToEdit.id, updatedSujet).subscribe({
        next: (response: string) => {
          console.log(response);
  
          // Mise à jour de la liste des sujets avec les nouvelles valeurs
          const index = this.sujets.findIndex((s) => s.id === this.sujetToEdit!.id);
          if (index !== -1) {
            this.sujets[index] = {
              ...this.sujets[index], // Conserve les autres propriétés déjà existantes
              ...updatedSujet,       // Met à jour uniquement les propriétés modifiées
            };
          }
  
          this.updatePaginatedSujets();
          this.closeEditModal();
       
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du sujet :', err);
  
        },
      });
    }
  }
  
  
  
  deleteSujet(index: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce sujet?")) {
      const sujetId = this.paginatedSujets[index].id;
  
      this.professeurService.deleteSujet(sujetId).subscribe({
        next: (response: string) => {
          console.log(response);
  
          // Supprimer le sujet de la liste côté front-end
          const originalIndex = this.sujets.findIndex((s) => s.id === sujetId);
          if (originalIndex !== -1) {
            this.sujets.splice(originalIndex, 1);
            this.filteredSujets = [...this.sujets];
            this.calculateTotalPages();
            this.updatePaginatedSujets();
          }
  
          // Afficher un message de succès
          this.successMessage = 'Sujet supprimé avec succès';
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du sujet :', err);
          this.errorMessage = 'Erreur lors de la suppression du sujet. Veuillez réessayer.';
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      });
    }
  }}
