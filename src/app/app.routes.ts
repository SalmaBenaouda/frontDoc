import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './modules/candidat/dashboard/dashboard.component';
import { ProfilComponent } from './modules/candidat/profil/profil.component';
import { SujetsComponent } from './modules/candidat/sujets/sujets.component';
import { PlanningComponent } from './modules/candidat/planning/planning.component';
import { CandidatComponentComponent } from './modules/candidat/candidat-component/candidat-component.component';
import { RoleGuard } from './guards/role.guard';


export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    
    
    { path: 'candidat/dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'candidat/profil', component: ProfilComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'candidat/choixSujet', component: SujetsComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'candidat/planning', component: PlanningComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'candidat/test', component: CandidatComponentComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },

    // Path de prof
    { path: 'professeur/dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    // Path de ced
    ];
