import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BuildComponent } from './build/build.component';
import { RandomizerComponent } from './randomizer/randomizer.component';

export const BASE_URL = new InjectionToken<string>('BaseUrl');

@NgModule({
  declarations: [AppComponent, BuildComponent, RandomizerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: BASE_URL, useValue: 'https://htl-characterbuilder.azurewebsites.net/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
