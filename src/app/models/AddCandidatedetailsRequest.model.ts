// src/app/models/AddCandidatedetailsRequest.model.ts

export class AddCandidatedetailsRequest {
  situationFamiliale: string = '';
  nationalite: string = '';
  prenomArabe: string = '';
  nomArabe: string = '';
  payeNaissance: string = '';
  adresse: string = '';
  codePostal: number | null = null;
  handicap: string = '';
  professionPere: string = '';
  professionMere: string = '';
  provincePere: string = '';
  provinceMere: string = '';
  profession: string = '';
  dateNaissance: Date | null = null;
}
