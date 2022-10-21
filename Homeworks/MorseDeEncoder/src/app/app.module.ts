import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { morseCodeAlphabet } from 'src/alphabet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncodeComponent } from './encode/encode.component';
import { DecodeComponent } from './decode/decode.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EncodeComponent,
    DecodeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'ALPHABET', useValue: morseCodeAlphabet }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
