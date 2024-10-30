import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CedService } from '../../../services/ced/ced.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../services/message/message.service';
import { CandidatureDetailsDTO } from '../../../models/CandidatureDetailsDTO.model';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details-candidature',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './details-candidature.component.html',
  styleUrl: './details-candidature.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DetailsCandidatureComponent implements OnInit{
  constructor( private authService: AuthService,
    private cedService: CedService,
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
      this.cedService.getCandidatureDetails(candidatId).subscribe(
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
  
      this.cedService.getPhoto(candidatId).subscribe({
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
  candidatureDetails: CandidatureDetailsDTO | undefined;
  showModal: boolean = false;
  showDocumentModal: boolean = false;
  interviewDate: string = '';
  selectedDocumentUrl: string = '';
  photoUrl: SafeUrl | undefined;
  successMessage: string = '';

  onAccept(): void {
    if (this.candidatureDetails) {
      const candidatureId = Number(this.route.snapshot.paramMap.get('id'));
  
      this.cedService.accepterCandidature(candidatureId).subscribe({
        next: (response) => {
         
          this.messageService.setSuccessMessage('La candidature a été acceptée avec succès.');
  
          this.router.navigate(['/CED/preselection']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'acceptation de la candidature :', err);
        }
      });
    } else {
      console.error('Impossible de trouver l\'id de la candidature.');
    }
  }
  

  onReject(): void {
    if (this.candidatureDetails) {
      const candidatureId = Number(this.route.snapshot.paramMap.get('id'));
    
      this.cedService.refuserCandidature(candidatureId).subscribe({
        next: (response) => {
         
          this.messageService.setSuccessMessage('La candidature a été refusée avec succès.');
          
          this.router.navigate(['/CED/preselection']);
        },
        error: (err) => {
          console.error('Erreur lors du refus de la candidature :', err);
        }
      });
    } else {
      console.error('Impossible de trouver l\'id de la candidature.');
    }
  }
  


  

  openDocument(documentType: string): void {
    if (this.candidatureDetails && this.candidatureDetails.candidatdetails.diplomes.length > 0) {
      const candidatId = this.candidatureDetails.candidatdetails.diplomes[0].candidat_id;
  
      switch (documentType) {
        case 'baccalaureat':
          this.cedService.getDiplomeBac(candidatId).subscribe(blob => this.displayDocument(blob, 'baccalaureat.pdf'));
          break;
        case 'licence':
          this.cedService.getDiplomeLicence(candidatId).subscribe(blob => this.displayDocument(blob, 'licence.pdf'));
          break;
        case 'releve-licence':
          this.cedService.getLicenceReleve(candidatId).subscribe(blob => this.displayDocument(blob, 'releve-licence.pdf'));
          break;
        case 'master':
          this.cedService.getDiplomeMaster(candidatId).subscribe(blob => this.displayDocument(blob, 'master.pdf'));
          break;
        case 'releve-master':
          this.cedService.getMasterReleve(candidatId).subscribe(blob => this.displayDocument(blob, 'releve-master.pdf'));
          break;
        case 'carte-nationale':
          this.cedService.getCin(candidatId).subscribe(blob => this.displayDocument(blob, 'cin.pdf'));
          break;
        case 'cv':
          this.cedService.getCv(candidatId).subscribe(blob => this.displayDocument(blob, 'cv.pdf'));
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
