import { morseCodeAlphabet } from 'src/alphabet';
import { DecoderService } from './decoder.service';

describe('DecoderService', () => {
  const decoder = new DecoderService(morseCodeAlphabet);

  it('should encode a single word correctly', () => {
    expect(decoder.decode('... --- ...')).toBe('SOS');
  });

  it('should encode two words correctly', () => {
    expect(decoder.decode('...- .. . .-.. / . .-. ..-. --- .-.. --.')).toBe('VIEL ERFOLG');
  });

  it('should throw if unknown chars', () => {
    expect(() => decoder.decode('...!')).toThrowError();
  });

  it('should throw if unknown letter', () => {
    expect(() => decoder.decode('......')).toThrowError();
  });

  it('can verify correct text to convert', () => {
    expect(decoder.canDecode('.')).toBeTrue();
  });

  it('can detect incorrect text to convert', () => {
    expect(decoder.canDecode('!')).toBeFalse();
  });
});
