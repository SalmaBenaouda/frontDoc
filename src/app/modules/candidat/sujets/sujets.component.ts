import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Sujet {
  nom: string;
  etablissement: string;
  description: string;
  thematiques?: string;
  enseignant?: string;
  showDetails?: boolean;  // Optionnel: Gère l'affichage des détails
  candidature?: Candidature;
}

interface Candidature {
  id: number;
  idCandidat: number;
  idSujet: number;
  statut: string;
  dateEntretien: string;
}
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
    'CED Physique': ['Optique', 'Mécanique', 'Astrophysique'],
  };

  sujetsDisponibles: { [formation: string]: Sujet[] } = {
    'IA': [
      { nom: 'Réseaux de Neurones', etablissement: 'Faculté des Sciences', description: 'Sujet sur l’apprentissage profond.', thematiques: 'Sciences Humaines et Sociales', enseignant: 'Dr. Dupont' },
      { nom: 'Systèmes Experts1', etablissement: 'Faculté des Sciences', description: 'Étude des systèmes basés sur des règles.', thematiques: 'Technologies et Sciences', enseignant: 'Dr. Martin' },
      { nom: 'Systèmes Experts2', etablissement: 'Faculté des Sciences', description: 'Étude des systèmes basés sur des règles.', thematiques: 'Technologies et Scieynces', enseignant: 'Dr. Martin' },
      { nom: 'Systèmes Experts3', etablissement: 'Faculté des Sciences', description: 'Étude des systèmes basés sur des règles.', thematiques: 'Technologies et Scddiences', enseignant: 'Dr. Martin' },
    ],
    'Sécurité': [
      { nom: 'Cryptographie Avancée', etablissement: 'Faculté de Technologie', description: 'Sécurisation par chiffrement.', thematiques: 'Mathématiques Appliquées', enseignant: 'Prof. Lemoine' },
      { nom: 'Détection d’Intrusion', etablissement: 'Faculté de Technologie', 
        description: 'Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.Détection des menaces en ligne.', 
        thematiques: 'Systèmes de Sécurité', enseignant: 'Dr. Renault' },
    ],
  };
 
  cedSelectionne: string = '';
  formationSelectionnee: string = '';
  sujets: Sujet[] = [];
  sujetActuel: Sujet | null = null;
  sujetsSelectionnes: Sujet[] = JSON.parse(localStorage.getItem('sujetsSelectionnes') || '[]');
  showCart: boolean = false;

  onFormationChange() {
    this.sujets = this.sujetsDisponibles[this.formationSelectionnee] || [];
    this.sujets = this.sujets.filter((sujet) => !this.sujetsSelectionnes.some(selected => selected.nom === sujet.nom));
  }

  ouvrirModale(sujet: Sujet) {
    this.sujetActuel = sujet;
  }

  fermerModale() {
    this.sujetActuel = null;
  }

  selectSujet(sujet: Sujet) {
    if (this.sujetsSelectionnes.length < 3) {
      if (!this.sujetsSelectionnes.some(selected => selected.nom === sujet.nom)) {
        const newCandidature: Candidature = {
          id: Date.now(),
          idCandidat: 123, // Example value for candidate ID
          idSujet: Date.now(), // Example value for sujet ID
          statut: 'En cours',
          dateEntretien: '',
        };
        sujet.candidature = newCandidature;
        this.sujetsSelectionnes.push(sujet);
        this.sujets = this.sujets.filter((s) => s.nom !== sujet.nom);
        localStorage.setItem('sujetsSelectionnes', JSON.stringify(this.sujetsSelectionnes));
      }
      this.fermerModale();
    } else {
      alert('Vous ne pouvez sélectionner que 3 sujets au maximum.');
    }
  }

  isSelected(sujet: Sujet): boolean {
    return this.sujetsSelectionnes.some(selected => selected.nom === sujet.nom);
  }

  ouvrirCart() {
    this.showCart = true;
  }

  fermerCart() {
    this.showCart = false;
  }

  retirerSujet(sujet: Sujet) {
    if (sujet.candidature?.statut === 'En cours') {
      const index = this.sujetsSelectionnes.findIndex(selected => selected.nom === sujet.nom);
      if (index !== -1) {
        this.sujetsSelectionnes.splice(index, 1);
        delete sujet.candidature;
        this.sujets.push(sujet);
        localStorage.setItem('sujetsSelectionnes', JSON.stringify(this.sujetsSelectionnes));
      }
    }
  }
}