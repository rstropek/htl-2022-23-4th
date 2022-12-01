import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { AirtableAuthInterceptor } from './airtable-auth.interceptor';

// Injection tokens are used for injecting values like strings.
// For details see https://angular.io/api/core/InjectionToken.
export const BASE_URL = new InjectionToken<string>('BaseUrl');
export const AIRTABLE_PAT = new InjectionToken<string>('AirtablePat');

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    // Add constants for Airtable
    { provide: BASE_URL, useValue: 'https://api.airtable.com/v0/appDmElwqvyUFLXWx' },
    { provide: AIRTABLE_PAT, useValue: 'patkcjEZa4vIWOaWb.93d5d5f369916b153513653d737a29f136d0af42bb4402385d8e3d6cc8217496' },

    // Add interceptor adding bearer token to Airtable requests
    { provide: HTTP_INTERCEPTORS, useClass: AirtableAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
