import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './modules/candidat/dashboard/dashboard.component';
import { ProfilComponent } from './modules/candidat/profil/profil.component';
import { SujetsComponent } from './modules/candidat/sujets/sujets.component';

export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'candidat/dashboard', component: DashboardComponent },
    { path: 'candidat/profil', component: ProfilComponent },
    { path: 'candidat/choixSujet', component: SujetsComponent },
    ];
