import { AuthService } from '../../../services/auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CandidatService } from '../../../services/candidat/candidat.service';
import { Candidatdetails } from '../../../models/Candidatdetails.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  candidatDetails!: Candidatdetails; // Variable pour stocker les détails du candidat
  photoUrl: string | undefined;
  constructor(private candidatService: CandidatService, private authService: AuthService) {}

  ngOnInit() {
    const userIdNumber = Number(localStorage.getItem('userId')); 
    this.loadPhoto(userIdNumber);
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
    this.authService.logout(); // Déconnexion de l'utilisateur
  }
}
