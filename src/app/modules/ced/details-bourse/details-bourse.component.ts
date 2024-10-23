import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-bourse',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './details-bourse.component.html',
  styleUrl: './details-bourse.component.css',
  encapsulation: ViewEncapsulation.None, 

})
export class DetailsBourseComponent {
  constructor( private authService: AuthService) {}
  
  onLogout() {
    this.authService.logout();
  }
  onReject(): void {
    
    alert('Bourse refusée');
  }
}
