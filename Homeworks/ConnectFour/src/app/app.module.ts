import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Level1Component } from './level1/level1.component';
import { ColumnIndicatorComponent, PlayerIndexIntoToClassPipe } from './column-indicator/column-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    Level1Component,
    ColumnIndicatorComponent,
    PlayerIndexIntoToClassPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
