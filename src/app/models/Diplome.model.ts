import { Candidat } from "./Candidat.model";

export class Diplome {
    id!: number;
    nomEtablissement!: string;
    pays!: string;
    academie!: string;
    statut!: string;
    specialite!: string;
    anneeObtention!: string;
    mention!: string;
    moyenne!: number;
    type!: string;
    relevetNoteScanne?: string; 
    diplomeScanne!: string;
    candidatId!: number;
    candidat?: Candidat; 
}