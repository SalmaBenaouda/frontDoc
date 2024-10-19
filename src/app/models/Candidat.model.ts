import { Diplome } from "./Diplome.model";
import { ExperienceProf } from "./ExperienceProf.model";
import { Langue } from "./Langue.model";

export class Candidat {
    id!: number;
    nom!: string;
    prenom!: string;
    email!: string;
    CIN!: string;
    telephone!: string;
    situationFamiliale!: string;
    nationalite!: string;
    prenomArabe!: string;
    nomArabe!: string;
    payeNaissance!: string;
    adresse!: string;
    codePostal!: number;
    handicap!: string;
    professionPere!: string;
    professionMere!: string;
    provincePere!: string;
    provinceMere!: string;
    profession!: string;
    cvScanne!: string;
    cinScanne!: string;
  
    langues?: Langue[];
    diplomes?: Diplome[];
    experiences?: ExperienceProf[]; 
 
  }