import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './modules/candidat/dashboard/dashboard.component';
import { ProfilComponent } from './modules/candidat/profil/profil.component';
import { SujetsComponent } from './modules/candidat/sujets/sujets.component';
import { PlanningComponent } from './modules/candidat/planning/planning.component';
import { RoleGuard } from './guards/role.guard';
import { DashComponent } from './modules/professeur/dash/dash.component';
import { DashCedComponent } from './modules/ced/dash-ced/dash-ced.component';


export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    
    
    { path: 'Candidat/dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/profil', component: ProfilComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/choixSujet', component: SujetsComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/planning', component: PlanningComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  

    // Path de prof
    { path: 'Professeur/dashboard', component: DashComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    // Path de ced
    { path: 'CED/dashboard', component: DashCedComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
]