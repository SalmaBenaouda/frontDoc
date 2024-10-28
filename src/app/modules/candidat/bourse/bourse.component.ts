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
  candidatDetails!: Candidatdetails; // Variable pour stocker les détails du candidat

  constructor(private candidatService: CandidatService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchCandidatDetails(); // Appel de la méthode pour récupérer les détails du candidat
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


  onLogout() {
    this.authService.logout();
  }
}
