import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ProfesseurService } from '../../../services/prof/professeur.service';
import { ProfesseurDTO } from '../../../models/ProfesseurDTO.model';
import { DTOgene } from '../../../models/DTOgene.model';

@Component({
  selector: 'app-planning-preselection',
  standalone: true,
  imports: [FullCalendarModule,FormsModule,CommonModule],
  templateUrl: './planning-preselection.component.html',
  styleUrl: './planning-preselection.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class PlanningPreselectionComponent implements OnInit{

  professeur: ProfesseurDTO = new ProfesseurDTO('', '', '', 0, '', '','',0);
  professeurId: number = Number(localStorage.getItem('userId')); 
  selectedEvents: any[] = [];
  events: any[] = [];
  constructor(private professeurService: ProfesseurService, private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
  

  // Stockez vos événements dans une variable distincte
 

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: this.events,
    eventClick: (arg: EventClickArg) => {
      this.displayEventDetails(arg.event);
    },
    dayMaxEventRows: true,
    unselectAuto: false,
    eventBackgroundColor: 'green',
  };

  ngOnInit() {
    const today = new Date().toISOString().slice(0, 10);
    this.filterEventsByDate(today);
    this.loadProfesseurData();
    this.loadCandidatureAcceptee();
  }

  loadCandidatureAcceptee(): void {
    if (this.professeurId) {
      this.professeurService.getCandidatureAccepteeByProfId(this.professeurId).subscribe({
        next: (candidatures: DTOgene[]) => {
          // Map les candidatures reçues pour créer des événements
          this.events = candidatures.map((candidature) => ({
            title: `Entretien avec ${candidature.nomprenomcandidat}`,
            start: candidature.date,
            end: new Date(new Date(candidature.date).getTime() + 60 * 60 * 1000).toISOString(),
            id: candidature.idcandidature,
            nomprenomcandidat: candidature.nomprenomcandidat,
            titresujet: candidature.titresujet,
            nomstructure: candidature.nomstructure,
            domaine: candidature.domaine,
            etablissement: candidature.etablissement,
          }));
  
          // Mise à jour des événements dans les options du calendrier
          this.calendarOptions = {
            ...this.calendarOptions,
            events: this.events,
          };
  
          // Après avoir chargé les événements, afficher les détails de l'événement du jour si disponible
          this.selectTodayEvent();
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des candidatures acceptées :', error);
        },
      });
    } else {
      console.error("userId introuvable dans localStorage");
    }
  }
  selectTodayEvent(): void {
    const today = new Date().toISOString().slice(0, 10);
    const todayEvents = this.events.filter((event: any) => {
      return new Date(event.start).toISOString().slice(0, 10) === today;
    });
  
    if (todayEvents.length > 0) {
      // S'il y a des événements aujourd'hui, les afficher par défaut
      this.selectedEvents = todayEvents.map(event => ({
        nomprenomcandidat: event.nomprenomcandidat,
        date: event.start,
        titresujet: event.titresujet,
        nomstructure: event.nomstructure,
        domaine: event.domaine,
        etablissement: event.etablissement,
      }));
    } else {
      // Sinon, réinitialiser les détails
      this.selectedEvents = [];
    }
  }
  
  loadProfesseurData(): void {
    const userId = Number(localStorage.getItem('userId')); // Récupère `userId` depuis localStorage
    if (userId) {
      this.professeurService.findProfesseurById(userId).subscribe(
        (data: ProfesseurDTO) => {
          this.professeur = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des données du professeur:', error);
        }
      );
    } else {
      console.error('userId introuvable dans localStorage');
    }
  }

  

  filterEventsByDate(date: string) {
    this.selectedEvents = this.events.filter((event: any) => {
      return new Date(event.start).toISOString().slice(0, 10) === date;
    });
  }

  displayEventDetails(event: any) {
    this.selectedEvents = [
      {
        nomprenomcandidat: event.extendedProps.nomprenomcandidat,
        date: event.start?.toISOString(),
        titresujet: event.extendedProps.titresujet,
        nomstructure: event.extendedProps.nomstructure,
        domaine: event.extendedProps.domaine,
        etablissement: event.extendedProps.etablissement,
      },
    ];
  }
  
}


