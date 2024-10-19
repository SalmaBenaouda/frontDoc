import { Candidature } from "./candidature.model";
import { Professeur } from "./Professeur.model";
import { StructureRecherche } from "./StructureRecherche.model";


export class Sujet {
  nom!: string;
  etablissement!: string;
  description!: string;
  thematiques?: string;
  enseignant?: string;
  showDetails?: boolean;
  candidature?: Candidature;
  constructor(init?: Partial<Sujet>) {
    Object.assign(this, init);
  }
}