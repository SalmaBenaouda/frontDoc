import { Candidat } from "./Candidat.model";
import { Sujet } from "./Sujet.model";

export class Candidature {
    id!: number;
    idCandidat!: number;
    idSujet!: number;
    statut!: string;
    dateEntretien!: string;
    candidat!: Candidat;
    sujet!: Sujet;
  
    constructor(init?: Partial<Candidature>) {
      Object.assign(this, init);
    }
  }
  