import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Professeur } from '../../../models/Professeur.model';

@Component({
  selector: 'app-profil-prof',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profil-prof.component.html',
  styleUrl: './profil-prof.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class ProfilProfComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
  professeur: Professeur = {
    nom: 'Salma ',
    prenom: 'Benaouda',
    email: 'salma.benaouda@gmail.com',
    structureRecherche: {
      id: 0,
      nom: 'STI',
      domaine: '',
      etablissement: 'Université Abdelmalek Essaadi',
      ced_id: 0,
    },
    id: 0,
    centre_id: 0
  };

  showEditModal: boolean = false;

  ngOnInit(): void {}

  editProfile(): void {
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  saveProfile(): void {
    // Logique pour sauvegarder les changements du profil (statique pour le moment)
    console.log('Profil mis à jour : ', this.professeur);
    this.closeEditModal();
  }
}