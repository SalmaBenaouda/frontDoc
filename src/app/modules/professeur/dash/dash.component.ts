import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfesseurDTO } from '../../../models/ProfesseurDTO.model';
import { ProfesseurService } from '../../../services/prof/professeur.service';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DashComponent implements OnInit {
  professeur: ProfesseurDTO = new ProfesseurDTO('', '', '', 0, '', '','',0); // Initialisation complète
  constructor(private professeurService: ProfesseurService, private authService: AuthService) {}

  ngOnInit(): void {
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

  onLogout() {
    this.authService.logout();
  }
}
