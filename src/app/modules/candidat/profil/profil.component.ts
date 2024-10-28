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
            type: 'Baccalaureat',
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

  

  successMessage: string = '';
  errorMessage: string = '';

  // Méthode pour ajouter une nouvelle langue au tableau
  ajouterNouvelleLangue() {
    this.Langues.push({ id: 0, langue: '', niveau: '', candidatId: 0 });
  }


  sauvegarderEtatCivil() {
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      this.errorMessage = 'Utilisateur non authentifié. Veuillez vous reconnecter.';
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
        this.successMessage = 'État civil sauvegardé avec succès.';
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde des détails de l\'état civil :', err);
        this.errorMessage = 'Une erreur est survenue lors de la sauvegarde de l\'état civil. Veuillez réessayer.';
      },
    });
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