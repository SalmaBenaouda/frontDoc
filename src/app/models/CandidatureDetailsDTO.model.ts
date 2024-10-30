import { SujetDTO } from './SujetDTO.model';
import { Candidatdetails } from './Candidatdetails.model';

export interface CandidatureDetailsDTO {
  candidatdetails: Candidatdetails;
  sujet: SujetDTO;
}
