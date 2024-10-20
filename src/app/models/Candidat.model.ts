import { Diplome } from "./Diplome.model";
import { ExperienceProf } from "./ExperienceProf.model";
import { Langue } from "./Langue.model";

export class Candidat {
    id!: number;
    nom!: string;
    prenom!: string;
    email!: string;
    cin!: string;
    telephone!: string;
    situationFamiliale!: string;
    nationalite!: string;
    prenomArabe!: string;
    nomArabe!: string;
    paysNaissance!: string;
    adresse!: string;
    codePostal!: number;
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