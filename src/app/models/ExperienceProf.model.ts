import { Candidat } from "./Candidat.model";


export class ExperienceProf {
  id!: number;
  experience!: string;
  etablissement!: string;
  fonction!: string;
  secteurActivite!: string;
  dateDebut!: string;
  dateFin?: string;
  candidatId!: number;
  candidat?: Candidat;
}
