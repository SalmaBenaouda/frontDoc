import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bourse',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './bourse.component.html',
  styleUrl: './bourse.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BourseComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
