import { Inject, Injectable } from '@angular/core';

const A = 'A'.charCodeAt(0);
const morseToConvertRegex = /^[.\-\/ ]+$/;

@Injectable({
  providedIn: 'root'
})
export class DecoderService {

  constructor(@Inject('ALPHABET') private alphabet: string[]) { }

  public canDecode(morseToConvert: string): boolean {
    return morseToConvertRegex.test(morseToConvert);
  }

  public decode(morseToConvert: string): string {
    let textString = '';

    const words = morseToConvert.split(' / ');
    for (let word of words) {
      if (word !== '') {
        if (textString !== '' && !textString.endsWith(' ')) {
          textString += ' ';
        }

        const letters = word.split(' ');
        for (let letter of letters) {
          const letterIndex = this.alphabet.indexOf(letter);
          if (letterIndex === -1) {
            throw new Error(`Morse code contains invalid pattern ${letter}`);
          }

          textString += String.fromCharCode(A + letterIndex);
        }
      }
    }

    return textString;
  }
}
