import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sujets',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sujets.component.html',
  styleUrl: './sujets.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class SujetsComponent {
  ceds = ['CED Informatique', 'CED Mathématiques', 'CED Physique'];
  
  formations: { [key: string]: string[] } = {
    'CED Informatique': ['IA', 'Sécurité', 'Développement Web'],
    'CED Mathématiques': ['Algèbre', 'Analyse', 'Statistiques'],
    'CED Physique': ['Optique', 'Mécanique', 'Astrophysique']
  };

  sujetsDisponibles: { [key: string]: string[] } = {
    'IA': ['Réseaux de neurones', 'Apprentissage supervisé'],
    'Sécurité': ['Chiffrement', 'Détection d’intrusion'],
    'Développement Web': ['Frameworks modernes', 'Web sémantique'],
  };

  cedSelectionne: string = '';
  formationSelectionnee: string = '';
  sujets: string[] = [];

  onFormationChange() {
    this.sujets = this.sujetsDisponibles[this.formationSelectionnee] || [];
  }
}