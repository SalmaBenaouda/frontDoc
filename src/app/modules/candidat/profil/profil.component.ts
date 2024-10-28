import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Langue } from '../../../models/Langue.model';
import { Diplome } from '../../../models/Diplome.model';
import { ExperienceProf } from '../../../models/ExperienceProf.model';
import { CandidatService } from '../../../services/candidat/candidat.service';
import { Candidatdetails } from '../../../models/Candidatdetails.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class ProfilComponent implements OnInit{
  candidatdetails: Candidatdetails = new Candidatdetails(); // Définir la propriété

  constructor(
    private authService: AuthService,
    private candidatService: CandidatService,
    private http: HttpClient
  ) {}
  Langues: Langue[] = [];
diplomes: Diplome[] = [];
experiences: ExperienceProf[] = [];
ngOnInit(): void {
  const userId = localStorage.getItem('userId');
  if (userId) {
    const userIdNumber = parseInt(userId, 10);
    this.candidatService.getCandidatDetails(userIdNumber).subscribe({
      next: (details: Candidatdetails) => {
        // Assigner les langues, diplômes, et expériences uniquement s'ils existent
        this.Langues = details.langues && details.langues.length > 0 ? details.langues : [{ id: 0, langue: '', niveau: '', candidatId: 0 }];
        this.diplomes = [
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
            type: 'Bac',
            candidatId: userIdNumber,
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
            candidatId: userIdNumber,
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
            candidatId: userIdNumber,
          },
        ];

        // Parcourir les diplômes récupérés et mettre à jour la liste
        details.diplomes.forEach((diplome) => {
          const index = this.diplomes.findIndex((d) => d.type.toLowerCase() === diplome.type.toLowerCase());
          if (index !== -1) {
            this.diplomes[index] = diplome;
          }
        });
        this.experiences = details.experiences && details.experiences.length > 0 ? details.experiences : [{
          id: 0,
          experience: '',
          etablissement: '',
          fonction: '',
          secteurActivite: '',
          dateDebut: '',
          dateFin: '',
          candidatId: 0
        }];

        // Assigner les autres détails
        this.candidatdetails.nom = details.nom;
        this.candidatdetails.prenom = details.prenom;
        this.candidatdetails.email = details.email;
        this.candidatdetails.telephone = details.telephone;
        this.candidatdetails.cin = details.cin;
        this.candidatdetails.situationFamiliale = details.situationFamiliale;
        this.candidatdetails.nationalite = details.nationalite;
        this.candidatdetails.prenomArabe = details.prenomArabe;
        this.candidatdetails.nomArabe = details.nomArabe;
        this.candidatdetails.payeNaissance = details.payeNaissance;
        this.candidatdetails.adresse = details.adresse;
        this.candidatdetails.codePostal = details.codePostal;
        this.candidatdetails.handicap = details.handicap;
        this.candidatdetails.professionPere = details.professionPere;
        this.candidatdetails.professionMere = details.professionMere;
        this.candidatdetails.provincePere = details.provincePere;
        this.candidatdetails.provinceMere = details.provinceMere;
        this.candidatdetails.profession = details.profession;
        this.candidatdetails.dateNaissance = details.dateNaissance;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails du candidat :', err);
      }
    });
  }
}

  


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

  // Messages
  successMessage: string = '';
  errorMessage: string = '';
  successMessageLangue: string = '';
  errorMessageLangue: string = '';
  successMessageExp: string = '';
  errorMessageExp: string = '';
  successMessageCivil: string = '';
  errorMessageCivil: string = '';
  successMessageDiplome: string = '';
  errorMessageDiplome: string = '';

  // Méthode pour ajouter une nouvelle langue au tableau
  ajouterNouvelleLangue() {
    this.Langues.push({ id: 0, langue: '', niveau: '', candidatId: 0 });
  }


  sauvegarderEtatCivil() {
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      this.errorMessageCivil = 'Utilisateur non authentifié. Veuillez vous reconnecter.';
      return;
    }
  
    const userIdNumber = parseInt(userId, 10);
  
    // Construire la requête pour l'état civil
    const candidatDetailsRequest = {
      situationFamiliale: this.candidatdetails.situationFamiliale,
      nationalite: this.candidatdetails.nationalite,
      prenomArabe: this.candidatdetails.prenomArabe,
      nomArabe: this.candidatdetails.nomArabe,
      payeNaissance: this.candidatdetails.payeNaissance,
      adresse: this.candidatdetails.adresse,
      codePostal: this.candidatdetails.codePostal,
      handicap: this.candidatdetails.handicap,
      professionPere: this.candidatdetails.professionPere,
      professionMere: this.candidatdetails.professionMere,
      provincePere: this.candidatdetails.provincePere,
      provinceMere: this.candidatdetails.provinceMere,
      profession: this.candidatdetails.profession,
      dateNaissance: this.candidatdetails.dateNaissance,
    };
  
    // Sauvegarder les détails de l'état civil via le service candidat
    this.candidatService.addDetails(userIdNumber, candidatDetailsRequest).subscribe({
      next: (response) => {
        console.log('Détails de l\'état civil sauvegardés :', response);
        this.successMessageCivil = 'État civil sauvegardé avec succès.';
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde des détails de l\'état civil :', err);
        this.errorMessageCivil = 'Une erreur est survenue lors de la sauvegarde de l\'état civil. Veuillez réessayer.';
      },
    });
  }
  
  sauvegarderLangues(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.errorMessageLangue = 'Utilisateur non authentifié. Veuillez vous reconnecter.';
      return;
    }
  
    const userIdNumber = parseInt(userId, 10);
    this.candidatService.addLangues(userIdNumber, this.Langues).subscribe({
      next: (response: string) => {
        console.log('Langues sauvegardées avec succès :', response);
        this.successMessageLangue = 'Langues sauvegardées avec succès.';
        setTimeout(() => {
          this.successMessageLangue = '';
        }, 5000); // Effacer le message de succès après 5 secondes
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde des langues :', err);
        this.errorMessageLangue = 'Une erreur est survenue lors de la sauvegarde des langues. Veuillez réessayer.';
        setTimeout(() => {
          this.errorMessageLangue = '';
        }, 5000); // Effacer le message d'erreur après 5 secondes
      },
    });
  }
  
  sauvegarderExperiences(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.errorMessageExp = 'Utilisateur non authentifié. Veuillez vous reconnecter.';
      return;
    }
  
    const userIdNumber = parseInt(userId, 10);
  
    // Créer une copie des expériences existantes avant de les sauvegarder
    const nouvellesExperiences: ExperienceProf[] = [];
    this.experiences.forEach((experience) => {
      if (!experience.id || experience.id === 0) {
        // Si l'expérience n'a pas d'identifiant, elle est considérée comme nouvelle
        nouvellesExperiences.push(experience);
      } else {
        // Sinon, elle existe déjà et on ne l'ajoute pas à nouveau
        const index = this.experiences.findIndex((exp) => exp.id === experience.id);
        if (index !== -1) {
          this.experiences[index] = experience; // Mise à jour de l'expérience existante
        }
      }
    });
  
    // Appeler le service pour ajouter uniquement les nouvelles expériences
    if (nouvellesExperiences.length > 0) {
      this.candidatService.addExperiences(userIdNumber, nouvellesExperiences).subscribe({
        next: (response: string) => {
          console.log('Nouvelles expériences sauvegardées avec succès :', response);
          this.successMessageExp = 'Expériences sauvegardées avec succès.';
          setTimeout(() => {
            this.successMessageExp = '';
          }, 5000); // Effacer le message de succès après 5 secondes
        },
        error: (err) => {
          console.error('Erreur lors de la sauvegarde des expériences :', err);
          this.errorMessageExp = 'Une erreur est survenue lors de la sauvegarde des expériences. Veuillez réessayer.';
          setTimeout(() => {
            this.errorMessageExp = '';
          }, 5000); // Effacer le message d'erreur après 5 secondes
        },
      });
    } else {
      this.successMessageExp = 'Aucune nouvelle expérience à ajouter.';
      setTimeout(() => {
        this.successMessageExp = '';
      }, 5000); // Effacer le message de succès après 5 secondes
    }
  }
  
  sauvegarderDiplomes(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.errorMessageDiplome = 'Utilisateur non authentifié. Veuillez vous reconnecter.';
      return;
    }

    const userIdNumber = parseInt(userId, 10);

    // Créer une copie des diplômes existants avant de les sauvegarder
    const nouveauxDiplomes: Diplome[] = [];
    this.diplomes.forEach((diplome) => {
      if (!diplome.id || diplome.id === 0) {
        // Si le diplôme n'a pas d'identifiant, il est considéré comme nouveau
        nouveauxDiplomes.push(diplome);
      } else {
        // Sinon, il existe déjà et on ne l'ajoute pas à nouveau
        const index = this.diplomes.findIndex((d) => d.id === diplome.id);
        if (index !== -1) {
          this.diplomes[index] = diplome; // Mise à jour du diplôme existant
        }
      }
    });

    // Appeler le service pour ajouter uniquement les nouveaux diplômes
    if (nouveauxDiplomes.length > 0) {
      this.candidatService.addDiplomes(userIdNumber, nouveauxDiplomes).subscribe({
        next: (response: string) => {
          console.log('Nouveaux diplômes sauvegardés avec succès :', response);
          this.successMessageDiplome = 'Diplômes sauvegardés avec succès.';
          setTimeout(() => {
            this.successMessageDiplome = '';
          }, 5000); // Effacer le message de succès après 5 secondes
        },
        error: (err) => {
          console.error('Erreur lors de la sauvegarde des diplômes :', err);
          this.errorMessageDiplome = 'Une erreur est survenue lors de la sauvegarde des diplômes. Veuillez réessayer.';
          setTimeout(() => {
            this.errorMessageDiplome = '';
          }, 5000); // Effacer le message d'erreur après 5 secondes
        },
      });
    } else {
      this.successMessageDiplome = 'Aucun nouveau diplôme à ajouter.';
      setTimeout(() => {
        this.successMessageDiplome = '';
      }, 5000); // Effacer le message de succès après 5 secondes
    }
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
    

    // Sauvegarder les informations des diplômes
   
     // Sauvegarder les expériences professionnelles
  }




  onLogout() {
    this.authService.logout();
  }
}