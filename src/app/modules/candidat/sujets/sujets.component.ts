import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sujet } from '../../../models/Sujet.model';
import { Candidature } from '../../../models/candidature.model';
import { AuthService } from '../../../services/auth/auth.service';
import { Professeur } from '../../../models/Professeur.model';
import { StructureRecherche } from '../../../models/StructureRecherche.model';

@Component({
  selector: 'app-sujets',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sujets.component.html',
  styleUrl: './sujets.component.css',
  encapsulation: ViewEncapsulation.None, 
})

export class SujetsComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
  ceds = ['CED Informatique', 'CED Mathématiques', 'CED Physique'];

  formations: { [key: string]: string[] } = {
    'CED Informatique': ['IA', 'Sécurité', 'Développement Web'],
    'CED Mathématiques': ['Algèbre', 'Analyse', 'Statistiques'],
    'CED Physique': ['Optique', 'Mécanique', 'Astrophysique'],
  };

  sujetsDisponibles: { [formation: string]: Sujet[] } = {
    'IA': [
      {
        id:0,
        titre: 'Réseaux de Neurones',
        description: 'Sujet sur l’apprentissage profond.',
        thematique: 'Sciences Humaines et Sociales',
        professeur: { nom: 'Dr. Dupont' } as Professeur,
        professeur_id: 1,
        structureRecherche_id: 1,
        structureRecherche: {} as StructureRecherche,
      },
      {
        id:0,
        titre: 'Systèmes Experts',
        description: 'Étude des systèmes basés sur des règles.',
        thematique: 'Technologies et Sciences',
        professeur: { nom: 'Dr. Martin' } as Professeur,
        professeur_id: 2,
        structureRecherche_id: 2,
        structureRecherche: {} as StructureRecherche,
      },
    ],
    'Sécurité': [
      {
        id:0,
        titre: 'Cryptographie Avancée',
        description: 'Sécurisation par chiffrement.',
        thematique: 'Mathématiques Appliquées',
        professeur: { nom: 'Prof. Lemoine' } as Professeur,
        professeur_id: 3,
        structureRecherche_id: 3,
        structureRecherche: {} as StructureRecherche,
      },
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
    this.sujets = this.sujets.filter((sujet) => !this.sujetsSelectionnes.some(selected => selected.titre === sujet.titre));
  }

  ouvrirModale(sujet: Sujet) {
    this.sujetActuel = sujet;
  }

  fermerModale() {
    this.sujetActuel = null;
  }

  selectSujet(sujet: Sujet) {
    if (this.sujetsSelectionnes.length < 3) {
      if (!this.sujetsSelectionnes.some(selected => selected.titre === sujet.titre)) {
        const newCandidature = new Candidature({
          id: Date.now(),
          idCandidat: 123,  // Exemple de valeur
          idSujet: Date.now(),  // Exemple de valeur
          statut: 'En cours',
          dateEntretien: '',
        });
        sujet.candidature = newCandidature;
        this.sujetsSelectionnes.push(sujet);
        this.sujets = this.sujets.filter((s) => s.titre !== sujet.titre);
        localStorage.setItem('sujetsSelectionnes', JSON.stringify(this.sujetsSelectionnes));
      }
      this.fermerModale();
    } else {
      alert('Vous ne pouvez sélectionner que 3 sujets au maximum.');
    }
  }

  isSelected(sujet: Sujet): boolean {
    return this.sujetsSelectionnes.some(selected => selected.titre === sujet.titre);
  }

  ouvrirCart() {
    this.showCart = true;
  }

  fermerCart() {
    this.showCart = false;
  }

  retirerSujet(sujet: Sujet) {
    if (sujet.candidature?.statut === 'En cours') {
      const index = this.sujetsSelectionnes.findIndex(selected => selected.titre === sujet.titre);
      if (index !== -1) {
        this.sujetsSelectionnes.splice(index, 1);
        delete sujet.candidature;
        this.sujets.push(sujet);
        localStorage.setItem('sujetsSelectionnes', JSON.stringify(this.sujetsSelectionnes));
      }
    }
  }
}