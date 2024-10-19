import { Component, ViewEncapsulation } from '@angular/core';
import { RegisterRequest } from '../../models/RegisterRequest.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(private authService: AuthService) {}

 
  sInscrire() {
    this.successMessage = '';
    this.errorMessage = '';

    // Valider l'email avant d'envoyer le formulaire
    if (!this.isValidEmail(this.registerRequest.email)) {
      this.errorMessage = "Veuillez entrer une adresse email valide.";
      return;
    }

    console.log("Données d'inscription envoyées:", this.registerRequest);
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        console.log(response);
        // Afficher un message de succès
        this.successMessage = 'Inscription réussie ! Veuillez vous connecter.';
        // Vider les champs du formulaire
        this.registerRequest = new RegisterRequest();
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription :', err);
        this.errorMessage = 'Email déjà inscrit, veuillez vérifier vos informations ou réessayer.';
      },
    });
  }


  seConnecter() {
    console.log("Tentative de connexion avec :", this.email);
    this.authService.authenticate(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.Token); // Stocker le jeton dans le stockage local
        alert('Connexion réussie. Bienvenue!');
      },
      error: (err) => {
        console.error('Erreur lors de la connexion :', err);
        alert('Erreur lors de la connexion, veuillez vérifier vos informations.');
      },
    });
  }

  // Méthode pour valider l'email
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}

