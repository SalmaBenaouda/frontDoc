import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { CandidatureDetails } from '../../../models/CandidatureDetails.model';
import { ProfesseurService } from '../../../services/prof/professeur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidatdetails } from '../../../models/Candidatdetails.model';
import { CandidatureDetailsDTO } from '../../../models/CandidatureDetailsDTO.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-profil-candidat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profil-candidat.component.html',
  styleUrl: './profil-candidat.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class ProfilCandidatComponent implements OnInit {
  candidatureDetails: CandidatureDetailsDTO | undefined;
  showModal: boolean = false;
  showDocumentModal: boolean = false;
  interviewDate: string = '';
  selectedDocumentUrl: string = '';
  photoUrl: SafeUrl | undefined;
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private professeurService: ProfesseurService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCandidatureDetails();

  }

  loadCandidatureDetails(): void {
    const candidatId = Number(this.route.snapshot.paramMap.get('id'));
    if (candidatId) {
      this.professeurService.getCandidatureDetails(candidatId).subscribe(
        (details: CandidatureDetailsDTO) => {
          this.candidatureDetails = details;
          this.loadPhoto();
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du candidat :', error);
        }
      );
    } else {
      console.error('candidatId non trouvé');
    }
  }

  loadPhoto(): void {
    if (this.candidatureDetails && this.candidatureDetails.candidatdetails) {
      const candidatId = this.candidatureDetails.candidatdetails.diplomes[0].candidat_id; // Utiliser l'id correct du candidat
  
      this.professeurService.getPhoto(candidatId).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.photoUrl = reader.result as string;
          };
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la photo :', err);
        }
      });
    } else {
      console.error("Impossible de trouver l'id du candidat.");
    }
  }
  
  onLogout() {
    this.authService.logout();
  }

  onAccept(): void {
    this.showModal = true;
  }

  onReject(): void {
    if (this.candidatureDetails) {
      const candidatureId = Number(this.route.snapshot.paramMap.get('id'));
    
      this.professeurService.refuserCandidature(candidatureId).subscribe({
        next: (response) => {
          this.messageService.setSuccessMessage('La candidature a été refusée ! ');
        this.router.navigate(['Professeur/selection']);
        },
        error: (err) => {
          console.error('Erreur lors du refus de la candidature :', err);
        }
      });
    } else {
      console.error('Impossible de trouver l\'id de la candidature.');
    }
  }
  

  closeModal(): void {
    this.showModal = false;
  }

  saveInterviewDate(): void {
    if (this.candidatureDetails && this.interviewDate) {
      const candidatureId = Number(this.route.snapshot.paramMap.get('id'));
  
      this.professeurService.accepterCandidature(candidatureId, this.interviewDate).subscribe({
        next: (response) => {
          this.closeModal();
          this.messageService.setSuccessMessage('Candidature a été acceptée avec succès ! ');
        this.router.navigate(['Professeur/selection']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'acceptation de la candidature :', err);
        }
      });
    } else {
      alert("Veuillez sélectionner une date d'entretien valide.");
    }
  }
  

  openDocument(documentType: string): void {
    if (this.candidatureDetails && this.candidatureDetails.candidatdetails.diplomes.length > 0) {
      const candidatId = this.candidatureDetails.candidatdetails.diplomes[0].candidat_id;
  
      switch (documentType) {
        case 'baccalaureat':
          this.professeurService.getDiplomeBac(candidatId).subscribe(blob => this.displayDocument(blob, 'baccalaureat.pdf'));
          break;
        case 'licence':
          this.professeurService.getDiplomeLicence(candidatId).subscribe(blob => this.displayDocument(blob, 'licence.pdf'));
          break;
        case 'releve-licence':
          this.professeurService.getLicenceReleve(candidatId).subscribe(blob => this.displayDocument(blob, 'releve-licence.pdf'));
          break;
        case 'master':
          this.professeurService.getDiplomeMaster(candidatId).subscribe(blob => this.displayDocument(blob, 'master.pdf'));
          break;
        case 'releve-master':
          this.professeurService.getMasterReleve(candidatId).subscribe(blob => this.displayDocument(blob, 'releve-master.pdf'));
          break;
        case 'carte-nationale':
          this.professeurService.getCin(candidatId).subscribe(blob => this.displayDocument(blob, 'cin.pdf'));
          break;
        case 'cv':
          this.professeurService.getCv(candidatId).subscribe(blob => this.displayDocument(blob, 'cv.pdf'));
          break;
        default:
          console.error("Type de document non reconnu :", documentType);
      }
    } else {
      console.error("Impossible de trouver l'id du candidat.");
    }
  }
  
  
  displayDocument(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  
  

}
