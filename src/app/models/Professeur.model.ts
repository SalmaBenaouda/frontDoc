import { StructureRecherche } from "./StructureRecherche.model";
import { Sujet } from "./Sujet.model";

export class Professeur {
    id!: number;
    nom!: string;
    prenom!: string;
    email!: string;
    centreId!: number;
    structureRecherche!: StructureRecherche; 
    sujets?: Sujet[]; 
  
    
  }
  