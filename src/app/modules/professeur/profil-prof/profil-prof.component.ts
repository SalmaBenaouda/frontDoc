import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfesseurService } from '../../../services/prof/professeur.service';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfesseurDTO } from '../../../models/ProfesseurDTO.model';

@Component({
  selector: 'app-profil-prof',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profil-prof.component.html',
  styleUrls: ['./profil-prof.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfilProfComponent implements OnInit {
  professeur: ProfesseurDTO = new ProfesseurDTO('', '', '', 0, '', '','',0); // Initialisation complète
  showEditModal: boolean = false;

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

  editProfile(): void {
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  saveProfile(): void {
    console.log('Profil mis à jour : ', this.professeur);
    this.closeEditModal();
  }
}
