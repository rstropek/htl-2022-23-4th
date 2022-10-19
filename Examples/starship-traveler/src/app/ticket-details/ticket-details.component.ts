import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { demoTickets, Ticket } from '../data';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent {
  ticket?: Ticket;

  constructor(route: ActivatedRoute) {
    route.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.ticket = demoTickets.filter(t => t.id === id)[0];
      }
    })
  }

}
