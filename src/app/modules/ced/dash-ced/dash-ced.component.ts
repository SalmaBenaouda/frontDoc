import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CedService } from '../../../services/ced/ced.service';

@Component({
  selector: 'app-dash-ced',
  standalone: true,
  imports: [],
  templateUrl: './dash-ced.component.html',
  styleUrl: './dash-ced.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class DashCedComponent implements OnInit{
  constructor(private authService: AuthService,private cedService: CedService) {}
  totalCandidatures: number = 0;
  totalStructures: number = 0;


  ngOnInit(): void {
    this.loadTotalCandidatures();
    this.loadTotalStructures();
  }
  loadTotalCandidatures(): void {
    const cedId = localStorage.getItem('userId');
    if (cedId) {
      this.cedService.getCandidaturesByCedId(parseInt(cedId)).subscribe({
        next: (candidatures) => {
          this.totalCandidatures = candidatures.length;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des candidatures :', err);
        }
      });
    } else {
      console.error("Impossible de trouver l'id du CED.");
    }
  }
  loadTotalStructures(): void {
    const cedId = localStorage.getItem('userId');
    if (cedId) {
      this.cedService.getStructuresByCedId(parseInt(cedId)).subscribe({
        next: (structures) => {
          this.totalStructures = structures.length;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des structures :', err);
        }
      });
    } else {
      console.error("Impossible de trouver l'id du CED.");
    }
  }
  calculatePercentage(total: number): number {
    const maxCandidatures = 100; // Par exemple, si vous avez un maximum de 100 candidatures
    return Math.round((total / maxCandidatures) * 100);
  }
  calculateStructuresGrowthPercentage(total: number): number {
    const lastYearTotal = 5; // Exemple: si l'année dernière vous aviez 10 structures
    return Math.round(((total - lastYearTotal) / lastYearTotal) * 100);
  }
  
  

  onLogout() {
    this.authService.logout();
  }
}
