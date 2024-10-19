import { Component } from '@angular/core';
import { Candidat } from '../../../models/Candidat.model';
import { CandidatService } from '../../../services/candidat/candidat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidat-component',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './candidat-component.component.html',
  styleUrl: './candidat-component.component.css'
})
export class CandidatComponentComponent {
  
  nouveauCandidat: Candidat = new Candidat();

  constructor(private candidatService: CandidatService) {}

  ajouterCandidat() {
    console.log("Données envoyées:", this.nouveauCandidat);
    this.candidatService.addCandidat(this.nouveauCandidat).subscribe({
      next: (response) => {
        console.log(response.message);
        alert('Candidat ajouté avec succès: ' + response.message);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du candidat:', err);
        alert('Erreur: ' + err.error.message);
      },
    });
  }
  candidatAMettreAJour: Candidat = new Candidat();
  mettreAJourCandidat() {
    if (!this.candidatAMettreAJour.id) {
      alert("Veuillez entrer un ID valide pour mettre à jour le candidat.");
      return;
    }
  
    console.log("Données envoyées pour la mise à jour:", this.candidatAMettreAJour);
    this.candidatService.updateCandidat(this.candidatAMettreAJour.id, this.candidatAMettreAJour).subscribe({
      next: (candidatMisAJour) => {
        console.log('Candidat mis à jour:', candidatMisAJour);
        alert('Candidat mis à jour avec succès.');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du candidat:', err);
        if (err.error && err.error.message) {
          alert('Erreur: ' + err.error.message);
        } else {
          alert('Erreur: une erreur s\'est produite, mais aucune information supplémentaire n\'a été fournie.');
        }
      },
    });
  }
  
  }
  
  
  


