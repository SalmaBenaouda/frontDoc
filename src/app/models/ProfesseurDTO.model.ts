export class ProfesseurDTO {
    nom: string;
    prenom: string;
    email: string;
    centre_id: number;
    structnom: string;
    etablissement: string;
    structid: number;
  
    constructor(
      nom: string,
      prenom: string,
      email: string,
      centre_id: number,
      structnom: string,
      etablissement: string,
      structid: number
    ) {
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.centre_id = centre_id;
      this.structnom = structnom;
      this.etablissement = etablissement;
      this.structid = structid;
    }
  }
  