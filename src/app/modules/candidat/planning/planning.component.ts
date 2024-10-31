import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { CandidatService } from '../../../services/candidat/candidat.service';
import { Candidatdetails } from '../../../models/Candidatdetails.model';
import { FormsModule } from '@angular/forms';
import { DTOgene } from '../../../models/DTOgene.model';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [FullCalendarModule,FormsModule, CommonModule],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PlanningComponent implements OnInit {
  candidatDetails!: Candidatdetails; // Variable pour stocker les détails du candidat
  photoUrl: string | undefined;
  candidatId: number = Number(localStorage.getItem('userId')); // Récupère l'id du candidat
  selectedEvents: any[] = [];
  events: any[] = [];
  constructor(private candidatService: CandidatService, private authService: AuthService) {}
  loadPhoto(userId: number): void {
    this.candidatService.getPhoto(userId).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.photoUrl = reader.result as string;
        };
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la photo :', err);
      }
    });
  }
  onLogout() {
    this.authService.logout();
  }
  

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
    dayMaxEventRows: true, // Limite le nombre d'événements par jour
    unselectAuto: false, // Garde la sélection active
    eventBackgroundColor: 'green', // Colore le fond des cases ayant des événements
  };

  ngOnInit() {
    const today = new Date().toISOString().slice(0, 10);
    this.loadCandidatureAcceptee();
    this.filterEventsByDate(today);
    const userIdNumber = Number(localStorage.getItem('userId')); 
    this.loadPhoto(userIdNumber);


  }
  
  loadCandidatureAcceptee(): void {
    if (this.candidatId) {
      this.candidatService.getCandidatureAccepteeByCandidatId(this.candidatId).subscribe({
        next: (candidatures: DTOgene[]) => {
          // Map les candidatures reçues pour créer des événements
          this.events = candidatures.map((candidature) => ({
            title: `Entretien avec ${candidature.nomprenomprof}`,
            start: candidature.date,
            end: new Date(new Date(candidature.date).getTime() + 60 * 60 * 1000).toISOString(),
            id: candidature.idcandidature,
            nomprenomprof: candidature.nomprenomprof,
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
        nomprenomprof: event.nomprenomprof,
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

  filterEventsByDate(date: string) {
    this.selectedEvents = this.events.filter((event: any) => {
      return new Date(event.start).toISOString().slice(0, 10) === date;
    });
  }

  displayEventDetails(event: any) {
    this.selectedEvents = [
      {
        nomprenomprof: event.extendedProps.nomprenomprof,
        date: event.start?.toISOString(),
        titresujet: event.extendedProps.titresujet,
        nomstructure: event.extendedProps.nomstructure,
        domaine: event.extendedProps.domaine,
        etablissement: event.extendedProps.etablissement,
      },
    ];
  }
}
