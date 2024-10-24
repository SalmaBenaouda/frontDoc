import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-planning-preselection',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './planning-preselection.component.html',
  styleUrl: './planning-preselection.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class PlanningPreselectionComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
