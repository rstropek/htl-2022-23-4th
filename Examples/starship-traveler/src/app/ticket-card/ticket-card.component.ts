import { Component, Input } from '@angular/core';
import { Ticket } from '../data';
import { CommonModule } from '@angular/common';
import { TicketQRCodeComponent } from '../ticket-qrcode/ticket-qrcode.component';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule, TicketQRCodeComponent],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent {
  @Input() ticket?: Ticket;
}
