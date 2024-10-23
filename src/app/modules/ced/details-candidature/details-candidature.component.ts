import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-candidature',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './details-candidature.component.html',
  styleUrl: './details-candidature.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DetailsCandidatureComponent {
  constructor( private authService: AuthService) {}
  
  onLogout() {
    this.authService.logout();
  }
  showModal: boolean = false;
  showDocumentModal: boolean = false;
  interviewDate: string = '';
  selectedDocumentUrl: string = '';

  onAccept(): void {
    this.showModal = true;
  }

  onReject(): void {
    // Logique pour refuser le candidat (statique pour l'instant)
    alert('Candidature refusée');
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveInterviewDate(): void {
    // Logique pour sauvegarder la date d'entretien (statique pour l'instant)
    alert(`Entretien planifié pour le ${this.interviewDate}`);
    this.closeModal();
  }

  openDocument(documentType: string): void {
    // Logique pour ouvrir un document scanné (statique pour l'instant)
    switch (documentType) {
      case 'baccalaureat':
        this.selectedDocumentUrl = 'images/Documents/bac.jpg';
        break;
      case 'licence':
        this.selectedDocumentUrl = 'images/Documents/licence.png';
        break;
      case 'releve-licence':
        this.selectedDocumentUrl = 'images/Documents/releve.jpg';
        break;
      case 'master':
        this.selectedDocumentUrl = 'images/Documents/master.jpg';
        break;
      case 'releve-master':
        this.selectedDocumentUrl = 'images/Documents/releve.jpg';
        break;
      case 'carte-nationale':
        this.selectedDocumentUrl = 'images/Documents/cin.jpeg';
        break;
      case 'cv':
        this.selectedDocumentUrl = 'images/Documents/cv.jpg';
        break;
      default:
        this.selectedDocumentUrl = '';
    }
    this.showDocumentModal = true;
  }

  closeDocumentModal(): void {
    this.showDocumentModal = false;
  }
}
