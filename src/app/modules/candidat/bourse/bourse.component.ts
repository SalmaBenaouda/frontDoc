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
    this.authService.logout();
  }
}
