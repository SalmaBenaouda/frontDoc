import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-profil-candidat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profil-candidat.component.html',
  styleUrl: './profil-candidat.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class ProfilCandidatComponent {
  constructor(private authService: AuthService) {}

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
