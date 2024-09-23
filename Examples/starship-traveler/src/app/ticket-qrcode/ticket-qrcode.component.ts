import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket-qrcode',
  imports: [RouterLink],
  templateUrl: './ticket-qrcode.component.html',
  standalone: true,
  styleUrls: ['./ticket-qrcode.component.css']
})
export class TicketQRCodeComponent {
  @Input() ticketLink?: string;
}
