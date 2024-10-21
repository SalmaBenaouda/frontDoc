export class Diplome {
    id!: number;
    nomEtablissement!: string;
    pays!: string;
    academie!: string;
    statut!: string; // public ou privé
    specialite!: string;
    anneeObtention!: string;
    mention!: string;
    moyenne!: number;
    type!: string;
    candidatId!: number;
    DiplomeScanne?: string;
    RelevetNoteScanne?: string;
  }
  