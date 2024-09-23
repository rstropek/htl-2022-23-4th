import { Component, Inject } from '@angular/core';
import { Ticket } from '../data';
import { TimeRelation, TimeSelectorComponent } from '../time-selector/time-selector.component';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [TimeSelectorComponent, TicketCardComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent {
  time: TimeRelation = TimeRelation.Past;

  constructor(@Inject('TICKETS') private demoTickets: Ticket[]) {}

  get tickets(): Ticket[] {
    return this.demoTickets.filter(
      (t) =>
        (this.time === TimeRelation.Past && t.date < new Date()) ||
        (this.time === TimeRelation.Upcoming && t.date >= new Date())
    );
  }
}
