import { Candidat } from "./Candidat.model";


export class ExperienceProf {
  id!: number;
  experience!: string;
  etablissement!: string;
  fonction!: string;
  secteurActivite!: string;
  dateDebut!: Date;
  dateFin?: Date;
  candidatId!: number;
  candidat?: Candidat;
}
