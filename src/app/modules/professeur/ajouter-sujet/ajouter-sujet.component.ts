import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StructureRecherche } from '../../../models/StructureRecherche.model';
import { Sujet } from '../../../models/Sujet.model';

@Component({
  selector: 'app-ajouter-sujet',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './ajouter-sujet.component.html',
  styleUrl: './ajouter-sujet.component.css',
  encapsulation: ViewEncapsulation.None, 

})
export class AjouterSujetComponent {
  constructor(private authService: AuthService) {}
  sujet: Sujet = new Sujet();
 
  cedId: number = 1; 
  structureRecherchenom: string = 'STI';

  

  onSubmit(): void {
  

    // Ajouter le sujet (statique pour le moment)
    console.log('Sujet ajouté avec succès', this.sujet);
    // Rediriger vers la liste des sujets ou afficher un message de succès
  }

  onLogout() {
    this.authService.logout();
  }
}

