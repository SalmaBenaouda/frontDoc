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
import { GestionProfComponent } from './modules/ced/gestion-prof/gestion-prof.component';
import { GestionStructureComponent } from './modules/ced/gestion-structure/gestion-structure.component';
import { PreselectionComponent } from './modules/ced/preselection/preselection.component';
import { AddProfComponent } from './modules/ced/add-prof/add-prof.component';
import { AddStructureComponent } from './modules/ced/add-structure/add-structure.component';
import { DetailsCandidatureComponent } from './modules/ced/details-candidature/details-candidature.component';
import { DepotSujetComponent } from './modules/professeur/depot-sujet/depot-sujet.component';
import { PlanningPreselectionComponent } from './modules/professeur/planning-preselection/planning-preselection.component';
import { ProfilProfComponent } from './modules/professeur/profil-prof/profil-prof.component';
import { SelectionComponent } from './modules/professeur/selection/selection.component';
import { AjouterSujetComponent } from './modules/professeur/ajouter-sujet/ajouter-sujet.component';
import { ProfilCandidatComponent } from './modules/professeur/profil-candidat/profil-candidat.component';


export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    
    
    { path: 'Candidat/dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/profil', component: ProfilComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/choixSujet', component: SujetsComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/planning', component: PlanningComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },


    // Path de prof
    { path: 'Professeur/dashboard', component: DashComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    { path: 'Professeur/depotSujet', component: DepotSujetComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    { path: 'Professeur/ajouterSujet', component: AjouterSujetComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    { path: 'Professeur/planning', component: PlanningPreselectionComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    { path: 'Professeur/profil', component: ProfilProfComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    { path: 'Professeur/selection', component: SelectionComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    { path: 'Professeur/profilCandidat/:id', component: ProfilCandidatComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },


    // Path de ced
    { path: 'CED/dashboard', component: DashCedComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/gestionProfesseurs', component: GestionProfComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/ajouterProfesseur', component: AddProfComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/ajouterStructure', component: AddStructureComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/gestionStructures', component: GestionStructureComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
   
    { path: 'CED/preselection', component: PreselectionComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/candidature/:id', component: DetailsCandidatureComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
  

]