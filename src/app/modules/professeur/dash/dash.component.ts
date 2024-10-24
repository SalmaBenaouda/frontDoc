import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DashComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
