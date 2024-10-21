import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Langue } from '../../../models/Langue.model';
import { LangueService } from '../../../services/langue/langue.service';
import { Diplome } from '../../../models/Diplome.model';
import { DiplomeService } from '../../../services/diplome/diplome.service';
import { ExperienceService } from '../../../services/experience/experience.service';
import { ExperienceProf } from '../../../models/ExperienceProf.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class ProfilComponent {
  constructor(
    private authService: AuthService,
    private langueService: LangueService,
    private diplomeService: DiplomeService,
    private experienceService: ExperienceService,
    private http: HttpClient
  ) {}
  langues: Langue[] = [
    { id: 0, langue: '', niveau: '', candidatId: 0 },
    { id: 0, langue: '', niveau: '', candidatId: 0 },
    { id: 0, langue: '', niveau: '', candidatId: 0 },
  ];

  diplomes: Diplome[] = [
    {
      id: 0,
      nomEtablissement: '',
      pays: '',
      academie: '',
      statut: '',
      specialite: '',
      anneeObtention: '',
      mention: '',
      moyenne: 0,
      type: 'Baccalaureat',
      candidatId: 0,
    },
    {
      id: 0,
      nomEtablissement: '',
      pays: '',
      academie: '',
      statut: '',
      specialite: '',
      anneeObtention: '',
      mention: '',
      moyenne: 0,
      type: 'Licence',
      candidatId: 0,
    },
    {
      id: 0,
      nomEtablissement: '',
      pays: '',
      academie: '',
      statut: '',
      specialite: '',
      anneeObtention: '',
      mention: '',
      moyenne: 0,
      type: 'Master',
      candidatId: 0,
    },
  ];

  experiences: ExperienceProf[] = [
    {
      id: 0,
      experience: '',
      etablissement: '',
      fonction: '',
      secteurActivite: '',
      dateDebut: '',
      dateFin: '',
      candidatId: 0,
    },
  ];

  ajouterNouvelleExperience() {
    this.experiences.push({
      id: 0,
      experience: '',
      etablissement: '',
      fonction: '',
      secteurActivite: '',
      dateDebut: '',
      dateFin: '',
      candidatId: 0,
    });
  }

  

  successMessage: string = '';
  errorMessage: string = '';

  // Méthode pour ajouter une nouvelle langue au tableau
  ajouterNouvelleLangue() {
    this.langues.push({ id: 0, langue: '', niveau: '', candidatId: 0 });
  }

  // Méthode pour sauvegarder toutes les informations
  sauvegarderTout() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.errorMessage = 'Utilisateur non authentifié. Veuillez vous reconnecter.';
      return;
    }

    const userIdNumber = parseInt(userId, 10);

    // Réinitialiser les messages d'erreur
    this.errorMessage = '';
    this.successMessage = '';

    // Sauvegarder les informations des langues
    const languesRemplies = this.langues.filter((langue) => langue.langue && langue.niveau);
    if (languesRemplies.length > 0) {
      this.langueService.addLangues(userIdNumber, languesRemplies).subscribe({
        next: (response) => {
          console.log('Langues sauvegardées :', response);
        },
        error: (err) => {
          console.error('Erreur lors de la sauvegarde des langues :', err);
          this.errorMessage = 'Une erreur est survenue lors de la sauvegarde des langues. Veuillez réessayer.';
        },
      });
    }

    // Sauvegarder les informations des diplômes
    const diplomesRemplis = this.diplomes.filter((diplome) => diplome.nomEtablissement && diplome.anneeObtention);
    
    if (diplomesRemplis.length > 0) {
      this.diplomeService.addDiplomes(userIdNumber, diplomesRemplis).subscribe({
        next: (response) => {
          console.log('Diplômes sauvegardés :', response);
          this.successMessage = 'Toutes les informations ont été sauvegardées avec succès.';
        },
        error: (err) => {
          console.error('Erreur lors de la sauvegarde des diplômes :', err);
          this.errorMessage = 'Une erreur est survenue lors de la sauvegarde des diplômes. Veuillez réessayer.';
        },
      });
    }
     // Sauvegarder les expériences professionnelles
     const experiencesRemplies = this.experiences.filter(
      (experience) => experience.experience && experience.etablissement && experience.dateDebut && experience.dateFin
    );
    if (experiencesRemplies.length > 0) {
      this.experienceService.addExperiences(userIdNumber, experiencesRemplies).subscribe({
        next: (response) => {
          console.log('Expériences sauvegardées :', response);
          this.successMessage = 'Toutes les informations ont été sauvegardées avec succès.';
        },
        error: (err) => {
          console.error('Erreur lors de la sauvegarde des expériences :', err);
          this.errorMessage = 'Une erreur est survenue lors de la sauvegarde des expériences. Veuillez réessayer.';
        },
      });
    }
  
  }
  onLogout() {
    this.authService.logout();
  }
}