import { BoardService } from './board.service';

describe('Board service', () => {
  it('can compare two numbers', () => {
    // This is for demo purposes only
    expect(1).toBe(1);
  });

  it('can set pieces on board', () => {
    const board = new BoardService();

    // Set a single piece, verify that cell is occupied by player 1
    board.set(0, 0);
    expect(board.boardContent[0][0]).toBe(1);

    // Set another piece, verify that second sell belongs to player 2
    board.set(1, 1);
    expect(board.boardContent[1][1]).toBe(2);
  });

  it('ignores duplicate sets on a single cell', () => {
    const board = new BoardService();

    board.set(0, 0); // Cell occupied by player 1
    board.set(0, 0); // Second call has to be ignored
    expect(board.boardContent[0][0]).toBe(1);
  });

  it('detect winner in row', () => {
    const board = new BoardService();

    // Build the following board:
    // X X X
    // O O -
    // - - -
    for (let col = 0; col < 3; col++) {
      board.set(col, 0);
      if (col < 2) {
        board.set(col, 1);
      }
    }

    // Verify that player 1 is the winner
    expect(board.winnerIndex).toBe(1);
  });

  it('detect winner in col', () => {
    const board = new BoardService();

    // Build the following board:
    // X O -
    // X O -
    // X - -
    for (let row = 0; row < 3; row++) {
      board.set(0, row);
      if (row < 2) {
        board.set(1, row);
      }
    }

    // Verify that player 1 is the winner
    expect(board.winnerIndex).toBe(1);
  });

  it('detect winner in diagonal', () => {
    const board = new BoardService();

    // Build the following board:
    // X - -
    // O X -
    // - O X
    for (let rowCol = 0; rowCol < 3; rowCol++) {
      board.set(rowCol, rowCol);
      if (rowCol < 2) {
        board.set(rowCol, rowCol + 1);
      }
    }

    // Verify that player 1 is the winner
    expect(board.winnerIndex).toBe(1);
  });

  it('clears the board on restart correctly', () => {
    const board = new BoardService();
    board.set(0, 0);

    board.restart();

    // Verify that the board is empty
    expect(
      board.boardContent.filter(
        (row) => row.filter((cell) => cell !== 0).length > 0
      ).length
    ).toBe(0);
  });
});
