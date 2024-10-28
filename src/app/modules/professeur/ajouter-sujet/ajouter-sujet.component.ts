import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StructureRecherche } from '../../../models/StructureRecherche.model';
import { Sujet } from '../../../models/Sujet.model';
import { ProfesseurService } from '../../../services/prof/professeur.service';
import { Router } from '@angular/router';
import { ProfesseurDTO } from '../../../models/ProfesseurDTO.model';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-ajouter-sujet',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './ajouter-sujet.component.html',
  styleUrl: './ajouter-sujet.component.css',
  encapsulation: ViewEncapsulation.None, 

})
export class AjouterSujetComponent {
  sujet: Sujet = new Sujet();
  cedId: number = 0; 
  structnom: string = '';
  structid: number = 0;
  professeurId: number = 0;
  errorMessage: string | null = null;


  constructor(
    private authService: AuthService,
    private professeurService: ProfesseurService,
    private router: Router,private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.professeurId = parseInt(userId, 10);
      this.professeurService.findProfesseurById(this.professeurId).subscribe({
        next: (professeur: ProfesseurDTO) => {
          this.structnom = professeur.structnom;
          this.structid = professeur.structid;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des informations du professeur :', err);
        },
      });
    }
  }
  
  
  onSubmit(): void {
    this.sujet.professeur_id = this.professeurId;
    this.sujet.structureRecherche_id = this.structid;

    this.professeurService.addSujet(this.sujet).subscribe({
      next: (response: string) => {
        console.log('Sujet ajouté avec succès:', response);
        this.messageService.setSuccessMessage('Sujet ajouté avec succès');
        this.router.navigate(['Professeur/depotSujet']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du sujet :', err);
        this.errorMessage = 'Erreur lors de l\'ajout du sujet. Veuillez réessayer.';


      },
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}