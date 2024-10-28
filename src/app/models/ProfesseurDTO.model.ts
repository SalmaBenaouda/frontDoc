export class ProfesseurDTO {
    nom: string;
    prenom: string;
    email: string;
    centre_id: number;
    structureNom: string;
    etablissement: string;
    structureId: number;
  
    constructor(
      nom: string,
      prenom: string,
      email: string,
      centre_id: number,
      structureNom: string,
      etablissement: string,
      structureId: number
    ) {
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.centre_id = centre_id;
      this.structureNom = structureNom;
      this.etablissement = etablissement;
      this.structureId = structureId;
    }
  }
  