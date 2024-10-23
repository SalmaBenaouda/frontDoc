import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CedService } from '../../../services/ced/ced.service';
import { StructureRecherche } from '../../../models/StructureRecherche.model';
import { Professeur } from '../../../models/Professeur.model';

@Component({
  selector: 'app-add-prof',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-prof.component.html',
  styleUrl: './add-prof.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class AddProfComponent implements OnInit {
  constructor(private cedService: CedService, private authService: AuthService) {}
  professeur: Professeur = new Professeur();
  structures: StructureRecherche[] = [];
  cedId: number = 0;
  structureRechercheId: number = 0; // Nouvelle propriété

  ngOnInit(): void {
    // Récupérer l'ID du CED depuis le localStorage
    const storedCedId = localStorage.getItem('userId');
    if (storedCedId) {
      this.cedId = +storedCedId;
      this.professeur.centreId = this.cedId;
    }
  }

  onSubmit(): void {
    // Associer la structureRechercheId à l'objet professeur
    this.professeur.structureRecherche = { id: this.structureRechercheId } as StructureRecherche;

    // Ajouter le professeur
    this.cedService.addProfesseur(this.professeur).subscribe(
      (response) => {
        console.log('Professeur ajouté avec succès', response);
        // Rediriger vers la liste des professeurs ou afficher un message de succès
      },
      (error) => {
        console.error('Erreur lors de l’ajout du professeur', error);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
