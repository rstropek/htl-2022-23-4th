import { Component } from '@angular/core';
import { DecoderService } from '../decoder.service';

@Component({
  selector: 'app-decode',
  templateUrl: './decode.component.html',
  styleUrls: ['./decode.component.css']
})
export class DecodeComponent {
  public input: string = '...- .. . .-.. / . .-. ..-. --- .-.. --.';
  public plainText: string = '';
  public errorMessage: string = '';

  constructor(public decoder: DecoderService) { }

  public onDecode() {
    try {
      this.plainText = this.decoder.decode(this.input);
      this.errorMessage = '';
    } catch (ex: any) {
      this.errorMessage = ex;
    }
  }
}
