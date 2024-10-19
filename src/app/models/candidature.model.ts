export class Candidature {
    id!: number;
    idCandidat!: number;
    idSujet!: number;
    statut!: string;
    dateEntretien!: string;
  
    constructor(init?: Partial<Candidature>) {
      Object.assign(this, init);
    }
  }
  