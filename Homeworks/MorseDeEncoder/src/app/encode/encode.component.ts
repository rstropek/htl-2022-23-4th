import { Component } from '@angular/core';
import { EncoderService } from '../encoder.service';

@Component({
  selector: 'app-encode',
  templateUrl: './encode.component.html',
  styleUrls: ['./encode.component.css']
})
export class EncodeComponent {
  public input: string = 'HELLO WORLD';
  public morseCode: string = '';

  constructor(public encoder: EncoderService) { }

  public onEncode() {
    this.morseCode = this.encoder.encode(this.input);
  }

}
