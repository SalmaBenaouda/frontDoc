import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { CedService } from '../../../services/ced/ced.service';
import { StructureRecherche } from '../../../models/StructureRecherche.model';

@Component({
  selector: 'app-add-structure',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-structure.component.html',
  styleUrl: './add-structure.component.css',
  encapsulation: ViewEncapsulation.None, 

})
export class AddStructureComponent implements OnInit{
  constructor(private cedService: CedService, private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
  structure: StructureRecherche = new StructureRecherche();
  cedId: number = 328; // 
  ngOnInit(): void {
    // Récupérer l'ID du CED depuis le localStorage
    const storedCedId = localStorage.getItem('userId');
    if (storedCedId) {
      this.cedId = +storedCedId;
      this.structure.ced_id = this.cedId;
    }
  }
  onSubmit(): void {
    this.structure.ced_id = this.cedId;
    console.log('Structure ajoutée:', this.structure);
    // Logique pour envoyer la structure au service
    this.cedService.addStructure(this.structure).subscribe(
      response => {
        console.log('Réponse du backend:', response);
      },
      error => {
        console.error('Erreur lors de l`ajout de la structure:', error);
      }
    );
  }
}


