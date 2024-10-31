export class DTOgene {
    idcandidature: number;
    idcandidat: number;
    idprof: number;
    date: Date;
    nomprenomprof: string;
    nomprenomcandidat: string;
    titresujet: string;
    nomstructure: string;
    etablissement: string;
    domaine: string;
  
    constructor(
      idcandidature: number,
      idcandidat: number,
      idprof: number,
      date: Date,
      nomprenomprof: string,
      nomprenomcandidat: string,
      titresujet: string,
      nomstructure: string,
      etablissement: string,
      domaine: string
    ) {
      this.idcandidature = idcandidature;
      this.idcandidat = idcandidat;
      this.idprof = idprof;
      this.date = date;
      this.nomprenomprof = nomprenomprof;
      this.nomprenomcandidat = nomprenomcandidat;
      this.titresujet = titresujet;
      this.nomstructure = nomstructure;
      this.etablissement = etablissement;
      this.domaine = domaine;
    }
  }
  