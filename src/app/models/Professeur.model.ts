import { StructureRecherche } from "./StructureRecherche.model";
import { Sujet } from "./Sujet.model";

export class Professeur {
    id!: number;
    nom!: string;
    prenom!: string;
    email!: string;
    centre_id!: number;
    structureRecherche?: StructureRecherche; 
    sujets?: Sujet[]; 
    structnom?: string; // Nom de la structure de recherche
  etablissement?: string; 
  
    
  }
  