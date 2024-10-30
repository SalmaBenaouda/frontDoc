import { Component, ViewEncapsulation,OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sujet } from '../../../models/Sujet.model';
import { Candidature } from '../../../models/candidature.model';
import { AuthService } from '../../../services/auth/auth.service';
import { Professeur } from '../../../models/Professeur.model';
import { StructureRecherche } from '../../../models/StructureRecherche.model';
import { CandidatService } from '../../../services/candidat/candidat.service';
import { Candidatdetails } from '../../../models/Candidatdetails.model';
import { CandidatureDetails } from '../../../models/CandidatureDetails.model';

@Component({
  selector: 'app-sujets',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sujets.component.html',
  styleUrl: './sujets.component.css',
  encapsulation: ViewEncapsulation.None, 
})

export class SujetsComponent implements OnInit{
  candidatDetails!: Candidatdetails; // Variable pour stocker les détails du candidat
  photoUrl: string | undefined;
  constructor(private candidatService: CandidatService, private authService: AuthService,
    private cdr: ChangeDetectorRef) {}

  ceds: any[] = [];  // Liste des CED
  formations: StructureRecherche[] = [];  // Liste des structures
  cedSelectionne: any; // Ou mieux : cedSelectionne: CEDDETAILS | null = null;
  formationSelectionnee: number | null = null;
  sujets: Sujet[] = [];
  sujetActuel: Sujet | null = null;
  candidatures: CandidatureDetails[] = [];
  sujetsOriginaux: Sujet[] = []; // Liste pour conserver les sujets originaux
  showCart: boolean = false;
  
  ngOnInit() {
    const userIdNumber = Number(localStorage.getItem('userId')); 
    this.loadPhoto(userIdNumber);

    // Charger la liste des CED
    this.candidatService.getCEDDetails().subscribe({
      next: (data) => {
        this.ceds = data; // Charger tous les CED disponibles
      },
      error: (err) => {
        console.error('Erreur lors du chargement des CED :', err);
      }
    });
  
    // Charger la liste des candidatures pour le candidat
    this.candidatService.getCandidatures(userIdNumber).subscribe({
      next: (candidatures) => {
        this.candidatures = candidatures; // Récupère les candidatures depuis le backend
      },
      error: (err) => {
        console.error('Erreur lors du chargement des candidatures :', err);
      }
    });
  }
  
  loadPhoto(userId: number): void {
    this.candidatService.getPhoto(userId).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.photoUrl = reader.result as string;
        };
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la photo :', err);
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onCedChange(): void {
    if (this.cedSelectionne) {
      const ced = this.ceds.find(c => c.id == this.cedSelectionne.id);
      if (ced) {
        this.formations = ced.structuresname; // Remplir les formations pour le CED sélectionné
      } else {
        this.formations = [];
      }
    }
  }

  onFormationChange(): void {
    if (this.formationSelectionnee !== null) {
      this.candidatService.getSujetsByStructureId(this.formationSelectionnee).subscribe({
        next: (data) => {
          // Filtrer les sujets qui sont déjà dans la liste des candidatures
          const sujetsSelectionnesNoms = this.candidatures.map(candidature => candidature.sujetNom);
          this.sujets = data.filter(sujet => !sujetsSelectionnesNoms.includes(sujet.titre));
          // Conserver une copie des sujets originaux
          this.sujetsOriginaux = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des sujets :', err);
          this.sujets = [];
        }
      });
    } else {
      this.sujets = [];
    }
  }

  ouvrirModale(sujet: Sujet) {
    this.sujetActuel = sujet;
  }

  fermerModale() {
    this.sujetActuel = null;
  }

  selectSujet(sujet: Sujet) {
    if (this.candidatures.length < 3) {
      const userId = Number(localStorage.getItem('userId'));
  
      const candidatureRequest = {
        sujet_id: sujet.id,
        candidat_id: userId,
      };
  
      this.candidatService.addCandidature(candidatureRequest).subscribe({
        next: (response) => {
          console.log('Candidature ajoutée avec succès :', response);
  
          // Retirer le sujet sélectionné de la liste des sujets immédiatement après la sélection
          this.sujets = this.sujets.filter((s) => s.id !== sujet.id);
  
          // Mettre à jour la liste des candidatures après l'ajout
          this.candidatService.getCandidatures(userId).subscribe({
            next: (candidatures) => {
              this.candidatures = candidatures;
            },
            error: (err) => {
              console.error('Erreur lors de la mise à jour des candidatures :', err);
            }
          });
  
          // Forcer la détection des changements pour mettre à jour l'affichage
          this.cdr.detectChanges();
  
          // Fermer la modale après la sélection
          this.fermerModale();
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la candidature :", err);
        },
      });
    } else {
      alert('Vous ne pouvez sélectionner que 3 sujets au maximum.');
    }
  }
  

  ouvrirCart() {
    this.showCart = true;
  }

  fermerCart() {
    this.showCart = false;
  }

  retirerSujet(candidature: CandidatureDetails) {
    if (candidature.statuts === 'Encours') {
      this.candidatService.removeCandidature(candidature.candidature_id).subscribe({
        next: () => {
          // Mise à jour de la liste des candidatures après suppression
          this.candidatures = this.candidatures.filter(c => c.candidature_id !== candidature.candidature_id);
          console.log('Candidature retirée avec succès');
  
          // Restaurer le sujet depuis la liste des sujets originaux
          const sujetRestored = this.sujetsOriginaux.find(s => s.id === candidature.candidature_id);
          if (sujetRestored) {
            this.sujets.push(sujetRestored);
          }
  
          // Forcer la détection des changements pour mettre à jour l'affichage
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de la candidature :", err);
        }
      });
    }
  }
  
}