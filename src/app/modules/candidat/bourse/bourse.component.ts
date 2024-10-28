import { Component, ViewEncapsulation,OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidatService } from '../../../services/candidat/candidat.service';
import { Candidatdetails } from '../../../models/Candidatdetails.model';
@Component({
  selector: 'app-bourse',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './bourse.component.html',
  styleUrl: './bourse.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BourseComponent implements OnInit {
  candidatDetails!: Candidatdetails;
  photoUrl: string | undefined;

  constructor(private candidatService: CandidatService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchCandidatDetails(); 
    const userIdNumber = Number(localStorage.getItem('userId')); 
    this.loadPhoto(userIdNumber);
  }

  fetchCandidatDetails() {
    const userId = Number(localStorage.getItem('userId')); // Récupérez l'ID de l'utilisateur depuis localStorage

    if (userId) {
      this.candidatService.getCandidatDetails(userId).subscribe(
        (details) => {
          this.candidatDetails = details; // Stockez tous les détails récupérés
          console.log(this.candidatDetails.nom); // Affichez le nom dans la console
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du candidat:', error);
        }
      );
    } else {
      console.error('userId non trouvé dans localStorage');
    }
  }

  loadPhoto(userId: number): void {
    this.candidatService.getPhoto(userId).subscribe({
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
  }
  onLogout() {
    this.authService.logout();
  }
}
