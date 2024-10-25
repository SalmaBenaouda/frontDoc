import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planning-preselection',
  standalone: true,
  imports: [FullCalendarModule,FormsModule,CommonModule],
  templateUrl: './planning-preselection.component.html',
  styleUrl: './planning-preselection.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class PlanningPreselectionComponent {
  constructor(private authService: AuthService) {}

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


