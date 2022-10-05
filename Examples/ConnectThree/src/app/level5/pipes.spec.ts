import { PlayerIntoNamePipe, PlayerNameIntoToClassPipe } from "./pipes";

describe('Pipes', () => {
  describe('Player into name', () => {
    const pipe = new PlayerIntoNamePipe();

    it('transforms 1 into X', () => {
      expect(pipe.transform(1)).toBe('X');
    });

    it('transforms 2 into O', () => {
      expect(pipe.transform(2)).toBe('O');
    });

    it('throws on invalid player ID', () => {
      expect(() => pipe.transform(3)).toThrowError();
    });
  });

  describe('Player name into class', () => {
    const pipe = new PlayerNameIntoToClassPipe();

    it('transforms X into occupied-X', () => {
      expect(pipe.transform('X')).toBe('occupied-X');
    });

    it('transforms O into occupied-O', () => {
      expect(pipe.transform('O')).toBe('occupied-O');
    });
  });
});
