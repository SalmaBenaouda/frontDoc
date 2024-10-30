export class candidaturedashboard
{
    sujetNom: string;
    thematique: string ; // Peut être null
    etablissement: string;
    statuts: string;
    candidature_id: number;
  
    constructor(
      sujetNom: string,
      thematique: string ,
      etablissement: string,
      statuts: string,
      candidature_id: number
    ) {
      this.sujetNom = sujetNom;
      this.thematique = thematique;
      this.etablissement = etablissement;
      this.statuts = statuts;
      this.candidature_id = candidature_id;
    }
  }
  
