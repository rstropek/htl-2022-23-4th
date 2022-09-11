import { Component } from '@angular/core';

@Component({
  selector: 'app-connect-three',
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {
  //#region Internal state variables

  /** Array with player names. */
  private playerNames = ['', 'X', 'O'];

  /** Gets the winner (1 or 2) or 0 if there is no winner yet. */
  private currentWinner = 0;

  /** Gets the player (1 or 2) whose turn it currently is. */
  private currentPlayer!: number;

  //#endregion

  //#region Internal helper functions

  /**
   * Helper method to get the CSS class of the given player.
   * @returns CSS class of the player (1 or 2), or empty string if the player is 0.
   */
   private playerToClass(player: number): string {
    if (player !== 0) {
      return `occupied-${this.playerNames[player]}`;
    }

    return '';
  }

  /**
   * Gets the player (1 or 2) who has won the game.
   * @returns Player (1 or 2), or 0 if there is no winner yet.
   */
  private getWinner(): number {
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

  /** Initializes a new instance of the {@link Level2Component} class. */
  constructor() {
    this.restart();
  }

  /**
   * Gets the CSS class representing the player who has occupied the given cell.
   * @returns CSS class of the player, or empty string if the cell is empty.
   */
  public getStyle(col: number, row: number): string {
    return this.playerToClass(this.boardContent[row][col]);
  }

  /**
   * Gets the player (X or O) who has occupied the given cell.
   * @returns Player (X or O), or empty string if the cell is empty.
   */
  public getPlayer(col: number, row: number): string {
    return this.playerNames[this.boardContent[row][col]];
  }

  /**
   * Sets the given cell to the current player ({@link currentPlayer}) and switches the current player.
   *
   * Set operation is ignored if there is already a winner or if the cell is already occupied.
   */
  public set(col: number, row: number): void {
    if (this.currentWinner === 0 && this.boardContent[row][col] === 0) {
      this.boardContent[row][col] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    this.currentWinner = this.getWinner();
  }

  /**
   * Gets the winner (1 or 2) or 0 if there is no winner yet.
   */
  public get winner() {
    return this.currentWinner;
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
    this.currentPlayer = 1;
    this.currentWinner = 0;
  }

  /**
   * Gets the player (X or O) who has won the game.
   * @returns Player (X or O), or empty string if there is no winner yet.
   */
  public getWinningPlayer(): string {
    return this.playerNames[this.currentWinner];
  }
}
