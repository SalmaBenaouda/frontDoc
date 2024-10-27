import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CedService } from '../../../services/ced/ced.service';
import { StructureRecherche } from '../../../models/StructureRecherche.model';
import { Professeur } from '../../../models/Professeur.model';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-add-prof',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-prof.component.html',
  styleUrl: './add-prof.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class AddProfComponent implements OnInit {
  professeur: Professeur = new Professeur();
  structures: StructureRecherche[] = [];
  cedId: number = 0;
  structureRechercheId: number = 0;
  errorMessage: string | null = null;

  constructor(private cedService: CedService, private authService: AuthService,
     private router: Router,private messageService: MessageService) {}

  ngOnInit(): void {
    // Récupérer l'ID du CED depuis le localStorage
    const storedCedId = localStorage.getItem('userId');
    if (storedCedId) {
      this.cedId = +storedCedId;
      this.professeur.centre_id = this.cedId;
      this.fetchStructures();
    }
  }

  // Nouvelle méthode pour récupérer les structures du CED
  fetchStructures(): void {
    this.cedService.getStructuresByCedId(this.cedId).subscribe(
      (data: StructureRecherche[]) => {
        this.structures = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des structures de recherche :', error);
      }
    );
  }
onSubmit(): void {
  // Associer la structureRechercheId à l'objet professeur
  this.professeur.centre_id = this.structureRechercheId;

  // Ajouter le professeur
  this.cedService.addProfesseur(this.professeur).subscribe(
    (response) => {
      console.log('Professeur ajouté avec succès', response);
      this.messageService.setSuccessMessage('Professeur ajouté avec succès');
        this.router.navigate(['CED/gestionProfesseurs'], { state: { successMessage: 'Professeur ajouté avec succès' } });
    },
    (error) => {
      console.error('Erreur lors de l’ajout du professeur', error);
      this.errorMessage = error.error ? error.error.message : 'Erreur lors de l’ajout du professeur';

    }
  );
}

  onLogout() {
    this.authService.logout();
  }
}