export class ProfesseurDTO {
    nom: string;
    prenom: string;
    email: string;
    centre_id: number;
    structnom: string;
    etablissement: string;
    domaine: string ;
    structid: number;
    

    constructor(
      nom: string,
      prenom: string,
      email: string,
      centre_id: number,
      structnom: string,
      etablissement: string,
      domaine: string,
      structid: number ,
     
    ) {
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.centre_id = centre_id;
      this.structnom = structnom;
      this.etablissement = etablissement;
      this.domaine = domaine;
      this.structid = structid;
      
      
    }
  }
  