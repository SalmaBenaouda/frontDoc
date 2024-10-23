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
import { InscriptionDoctorantComponent } from './modules/ced/inscription-doctorant/inscription-doctorant.component';
import { DetailsBourseComponent } from './modules/ced/details-bourse/details-bourse.component';
import { BourseComponent } from './modules/candidat/bourse/bourse.component';


export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    
    
    { path: 'Candidat/dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/profil', component: ProfilComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/choixSujet', component: SujetsComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/planning', component: PlanningComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },
  { path: 'Candidat/bourse', component: BourseComponent, canActivate: [RoleGuard], data: { role: 'Candidat' } },


    // Path de prof
    { path: 'Professeur/dashboard', component: DashComponent, canActivate: [RoleGuard], data: { role: 'Professeur' } },
    

    // Path de ced
    { path: 'CED/dashboard', component: DashCedComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/gestionProfesseurs', component: GestionProfComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/ajouterProfesseur', component: AddProfComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/ajouterStructure', component: AddStructureComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/gestionStructures', component: GestionStructureComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
   
    { path: 'CED/preselection', component: PreselectionComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
    { path: 'CED/candidature', component: DetailsCandidatureComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
   // { path: 'CED/candidature/:id ', component: DetailsCandidatureComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
   { path: 'CED/bourse', component: InscriptionDoctorantComponent, canActivate: [RoleGuard], data: { role: 'CED' } },
   { path: 'CED/doctorant', component: DetailsBourseComponent, canActivate: [RoleGuard], data: { role: 'CED' } },

]