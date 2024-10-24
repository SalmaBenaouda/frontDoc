import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-prof',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profil-prof.component.html',
  styleUrl: './profil-prof.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class ProfilProfComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
