import { Candidature } from "./candidature.model";
import { Professeur } from "./Professeur.model";
import { StructureRecherche } from "./StructureRecherche.model";


export class Sujet {
  titre!: string;
  description!: string;
  thematique?: string;
  professeur_id!:number;
  structureRecherche_id!:number;
  professeur!: Professeur;
  structureRecherche!: StructureRecherche;
  candidature?: Candidature;

}