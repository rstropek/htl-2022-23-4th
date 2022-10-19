import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-qrcode',
  templateUrl: './ticket-qrcode.component.html',
  styleUrls: ['./ticket-qrcode.component.css']
})
export class TicketQRCodeComponent {
  @Input() ticketLink?: string;
}
