import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DroneStatusComponent } from './drone-status/drone-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExamineTreesComponent } from './examine-trees/examine-trees.component';
import { FormsModule } from '@angular/forms';

export const BASE_URL = new InjectionToken<string>('BaseUrl');

@NgModule({
  declarations: [AppComponent, DroneStatusComponent, ExamineTreesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: BASE_URL, useValue: 'http://localhost:5110' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
