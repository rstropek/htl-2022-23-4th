import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { demoTickets, Ticket } from '../data';
import { BaseImageComponent } from '../base-image/base-image.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [BaseImageComponent, CommonModule],
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
