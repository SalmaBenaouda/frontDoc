import { Candidat } from "./Candidat.model";

export class Langue {
    id!: number;
    langue!: string;
    niveau!: string;
    candidatId!: number;
    candidat?: Candidat;
}  