import { Injectable } from '@angular/core';

/**
 * Logic for a TicTacTow board.
 */
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  //#region Internal state variables

  /** Gets the winner (1 or 2) or 0 if there is no winner yet. */
  private currentWinnerIx = 0;

  /** Gets the player (1 or 2) whose turn it currently is. */
  private currentPlayerIx!: number;

  //#endregion

  //#region Internal helper functions

  /**
   * Gets the player (1 or 2) who has won the game.
   * @returns Player (1 or 2), or 0 if there is no winner yet.
   */
  private getWinnerIndex(): number {
    // Check rows
    for (let row = 0; row < 3; row++) {
      const first = this.boardContent[row][0];
      if (
        first !== 0 &&
        this.boardContent[row][1] === first &&
        this.boardContent[row][2] === first
      ) {
        return first;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      const first = this.boardContent[0][col];
      if (
        first !== 0 &&
        this.boardContent[1][col] === first &&
        this.boardContent[2][col] === first
      ) {
        return first;
      }
    }

    // Check diagonals
    const first = this.boardContent[1][1];
    if (first !== 0) {
      if (
        this.boardContent[0][0] === first &&
        this.boardContent[2][2] === first
      ) {
        return first;
      }
      if (
        this.boardContent[2][0] === first &&
        this.boardContent[0][2] === first
      ) {
        return first;
      }
    }

    return 0;
  }

  //#endregion

  /** Content of the board (3*3 array elements). 0 means empty, 1 means X, 2 means O. */
  public boardContent!: number[][];

  /**
   * Initializes a new instance of the {@link BoardService} class.
   */
  constructor() {
    this.restart();
  }

  /**
   * Sets the given cell to the current player ({@link currentPlayerIx}) and switches the current player.
   *
   * Set operation is ignored if there is already a winner or if the cell is already occupied.
   */
  public set(col: number, row: number): void {
    if (this.getWinnerIndex() === 0 && this.boardContent[row][col] === 0) {
      this.boardContent[row][col] = this.currentPlayerIx;
      this.currentPlayerIx = this.currentPlayerIx === 1 ? 2 : 1;
    }

    this.currentWinnerIx = this.getWinnerIndex();
  }

  /**
   * Gets the winner (1 or 2) or 0 if there is no winner yet.
   */
  public get winnerIndex(): number {
    return this.currentWinnerIx;
  }

  /**
   * Resets game to its original state.
   */
  public restart(): void {
    this.boardContent = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.currentPlayerIx = 1;
    this.currentWinnerIx = 0;
  }
}
