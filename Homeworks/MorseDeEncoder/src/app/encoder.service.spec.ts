import { morseCodeAlphabet } from 'src/alphabet';

import { EncoderService } from './encoder.service';

describe('EncoderService', () => {
  const encoder = new EncoderService(morseCodeAlphabet);

  it('should encode a single word correctly', () => {
    expect(encoder.encode('SOS')).toBe('... --- ...');
  });

  it('should encode two words correctly', () => {
    expect(encoder.encode('VIEL ERFOLG')).toBe('...- .. . .-.. / . .-. ..-. --- .-.. --.');
  });

  it('ignores blanks at beginning and end', () => {
    expect(encoder.encode('   VIEL ERFOLG   ')).toBe('...- .. . .-.. / . .-. ..-. --- .-.. --.');
  });

  it('should throw if unknown chars', () => {
    expect(() => encoder.encode('VIEL ERFOLG!')).toThrowError();
  });

  it('can verify correct text to convert', () => {
    expect(encoder.canEncode('VIEL ERFOLG')).toBeTrue();
  });

  it('can detect incorrect text to convert', () => {
    expect(encoder.canEncode('VIEL ERFOLG!')).toBeFalse();
  });
});
