import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-dash-ced',
  standalone: true,
  imports: [],
  templateUrl: './dash-ced.component.html',
  styleUrl: './dash-ced.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DashCedComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
