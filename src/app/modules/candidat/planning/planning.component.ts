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
  selectedEvents: any[] = [];

  // Stockez vos événements dans une variable distincte
  events = [
    {
      title: 'Entretien avec John Doe',
      start: '2024-10-18T12:00:00',
      end: '2024-10-18T13:00:00',
    },
    {
      title: 'Entretien avec John Doe',
      start: '2024-10-17T23:00:00',
      end: '2024-10-17T24:00:00',
    },
    {
      title: 'Entretien avec Jane Doe',
      start: '2024-10-18T15:00:00',
      end: '2024-10-18T16:00:00',
    },
    {
      title: 'Entretien avec John Doe',
      start: '2024-10-17T23:00:00',
      end: '2024-10-17T24:00:00',
    },
    {
      title: 'Entretien avec Jane Doe',
      start: '2024-10-18T15:00:00',
      end: '2024-10-18T16:00:00',
    },
    {
      title: 'Entretien avec John Doe',
      start: '2024-10-17T23:00:00',
      end: '2024-10-17T24:00:00',
    },
    {
      title: 'Entretien avec Jane Doe',
      start: '2024-10-18T15:00:00',
      end: '2024-10-18T16:00:00',
    },
    // Ajouter d'autres événements ici
  ];

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
    this.filterEventsByDate(today);
    this.fetchCandidatDetails();
    const userIdNumber = Number(localStorage.getItem('userId')); 
    this.loadPhoto(userIdNumber);
  }
  fetchCandidatDetails() {
    const userId = Number(localStorage.getItem('userId')); // Récupérez l'ID de l'utilisateur depuis localStorage

    if (userId) {
      this.candidatService.getCandidatDetails(userId).subscribe(
        (details) => {
          this.candidatDetails = details; // Stockez tous les détails récupérés
          console.log(this.candidatDetails.nom); // Affichez le nom dans la console
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du candidat:', error);
        }
      );
    } else {
      console.error('userId non trouvé dans localStorage');
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
        title: event.title,
        start: event.start?.toISOString(),
        end: event.end?.toISOString(),
      },
    ];
  }
}
