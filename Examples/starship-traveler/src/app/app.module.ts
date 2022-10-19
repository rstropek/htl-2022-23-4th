import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TicketQRCodeComponent } from './ticket-qrcode/ticket-qrcode.component';
import { TicketCardComponent } from './ticket-card/ticket-card.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { BaseImageComponent } from './base-image/base-image.component';
import { bases, demoTickets } from './data';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TicketQRCodeComponent,
    TicketCardComponent,
    TicketListComponent,
    TimeSelectorComponent,
    TicketDetailsComponent,
    BaseImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    { provide: 'TICKETS', useValue: demoTickets },
    { provide: 'BASES', useValue: bases },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
