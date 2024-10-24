import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class SelectionComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
