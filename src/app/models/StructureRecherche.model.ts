import { CED } from "./CED.model";
import { Professeur } from "./Professeur.model";
import { Sujet } from "./Sujet.model";


export class StructureRecherche {
  id!: number;
  nom!: string;
  domaine!: string;
  etablissement!: string;
  ced_id!: number;
  ced?: CED; 
  professeurs?: Professeur[];  
  sujets?: Sujet[]; 

}
