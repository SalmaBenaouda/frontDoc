// src/app/models/Candidatdetails.model.ts

import { Langue } from './Langue.model';
import { Diplome } from './Diplome.model';
import { ExperienceProf } from './ExperienceProf.model';
import { Candidature } from './candidature.model';

export class Candidatdetails {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  cin: string = '';
  telephone: string = '';
  situationFamiliale: string = '';
  nationalite: string = '';
  prenomArabe: string = '';
  nomArabe: string = '';
  payeNaissance: string = '';
  adresse: string = '';
  codePostal: number | null = null;
  handicap: string = '';
  professionPere: string = '';
  professionMere: string = '';
  provincePere: string = '';
  provinceMere: string = '';
  profession: string = '';
  dateNaissance: Date | null = null;
  candidatures: Candidature[] = [];
  langues: Langue[] = [];
  diplomes: Diplome[] = [];
  experiences: ExperienceProf[] = [];
}
