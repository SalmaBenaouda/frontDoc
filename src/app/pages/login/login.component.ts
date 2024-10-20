import { Component, ViewEncapsulation } from '@angular/core';
import { RegisterRequest } from '../../models/RegisterRequest.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  registerRequest: RegisterRequest = new RegisterRequest();
  email: string = '';
  password: string = '';
  
  successMessage: string = ''; // Message de succès
  errorMessage: string = ''; // Message d'erreur

  loginErrorMessage: string = '';

  constructor(private authService: AuthService,private router: Router) {}
  sInscrire() {
    // Réinitialiser les messages précédents
    this.successMessage = '';
    this.errorMessage = '';
  
    // Validation côté client pour vérifier que tous les champs sont remplis
    if (!this.registerRequest.nom || !this.registerRequest.prenom || !this.registerRequest.cin ||
        !this.registerRequest.telephone || !this.registerRequest.email || !this.registerRequest.password) {
      this.errorMessage = "Tous les champs sont obligatoires. Veuillez remplir tous les champs.";
      return;
    }
  
    // Validation supplémentaire de l'email
    if (!this.isValidEmail(this.registerRequest.email)) {
      this.errorMessage = "Veuillez entrer une adresse email valide.";
      return;
    }
  
    // Si toutes les validations sont passées, envoyer la requête au serveur
    console.log("Données d'inscription envoyées:", this.registerRequest);
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        console.log(response);
        // Afficher un message de succès
        this.successMessage = 'Inscription réussie ! Veuillez vous connecter.';
        document.getElementById('flip')?.click();
        // Vider les champs du formulaire
        this.registerRequest = new RegisterRequest();
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription :', err);
        // Vérifier le code de statut de l'erreur pour déterminer la cause
        if (err.status === 409) {
          // Code de statut 409 : Conflit, utilisé ici pour indiquer que l'email est déjà pris
          this.errorMessage = 'Email déjà inscrit, veuillez vérifier vos informations ou réessayer.';
        } else if (err.status === 400) {
          // Code de statut 400 : Mauvaise requête, utilisé pour une validation incorrecte
          this.errorMessage = 'Données d\'inscription incorrectes. Veuillez vérifier vos informations.';
        } else {
          // Autres erreurs génériques
          this.errorMessage = 'Une erreur s\'est produite, veuillez réessayer plus tard.';
        }
      },
    });
  } 
  seConnecter() {
    this.loginErrorMessage = '';
  
    this.authService.authenticate(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);  
        localStorage.setItem('role', response.role);
        
  
        // Rediriger l'utilisateur selon son rôle
        if (response.role === 'Candidat') {
          this.router.navigate(['/Candidat/dashboard']);
        } else if (response.role === 'Professeur') {
          this.router.navigate(['/Professeur/dashboard']);
        } else if (response.role === 'CED') {
          this.router.navigate(['/CED/dashboard']);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.loginErrorMessage = 'Email ou mot de passe incorrect. Veuillez vérifier vos informations.';
        } else {
          this.loginErrorMessage = 'Une erreur s\'est produite, veuillez réessayer plus tard.';
        }
      },
    });
  }

  // Validation d'email 
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}

