import { Component } from '@angular/core';
import { EncoderService } from '../encoder.service';
import { LETTER_BREAK, PlayMorseCodeService, SYMBOL_BREAK, WORD_BREAK } from '../play-morse-code.service';

@Component({
  selector: 'app-encode',
  templateUrl: './encode.component.html',
  styleUrls: ['./encode.component.css']
})
export class EncodeComponent {
  public input: string = 'HELLO WORLD';
  public morseCode: string = '';

  constructor(public encoder: EncoderService, private playService: PlayMorseCodeService) { }

  public onEncode() {
    this.morseCode = this.encoder.encode(this.input);
  }

  public onPlay() {
    this.playService.initializeAudioContext();
    const words = this.morseCode.split(' / ');
    this.playSentence(words);
  }

  private async playLetter(letter: string) {
    for (let dashdot of letter) {
      if (dashdot === '-') {
        await this.playService.playDash();
      } else if (dashdot === '.') {
        await this.playService.playDot();
      }
  
      await this.playService.sleep(SYMBOL_BREAK);
    }
  }
  
  private async playWord(word: string) {
    for (let letter of word) {
      await this.playLetter(letter);
      await this.playService.sleep(LETTER_BREAK);
    }
  }
  
  private async playSentence(words: string[]) {
    for (let word of words) {
      await this.playWord(word);
      await this.playService.sleep(WORD_BREAK);
    }
  }
}
