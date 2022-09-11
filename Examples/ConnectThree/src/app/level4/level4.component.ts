import { Component } from '@angular/core';
import { BoardCell } from '../level3/level3.component';
import { BoardService } from './board.service';

@Component({
  selector: 'app-connect-three',
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css'],
})
export class Level4Component {
  //#region Internal state variables

  /** Array with player names. */
  private playerNames = ['', 'X', 'O'];

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

  //#endregion

  /**
   * Initializes a new instance of the {@link Level4Component} class.
   */
  constructor(public board: BoardService) {
  }

  /**
   * Gets the CSS class representing the player who has occupied the given cell.
   * @returns CSS class of the player, or empty string if the cell is empty.
   */
   public getStyle(col: number, row: number): string {
    return this.playerToClass(this.board.boardContent[row][col]);
  }

  /**
   * Gets the player (X or O) who has occupied the given cell.
   * @returns Player (X or O), or empty string if the cell is empty.
   */
  public getPlayer(col: number, row: number): string {
    return this.playerNames[this.board.boardContent[row][col]];
  }

  /**
   * Gets the player (X or O) who has won the game.
   * @returns Player (X or O), or empty string if there is no winner yet.
   */
  public getWinningPlayer(): string {
    return this.playerNames[this.board.winner];
  }

  /**
   * Get a two-dimensional array representing the board's content.
   */
  public get content(): BoardCell[][] {
    const result: BoardCell[][] = [];
    for (let row of this.board.boardContent) {
      result.push(
        row.map((cellPlayer) => ({
          player: this.playerNames[cellPlayer],
          class: this.playerToClass(cellPlayer),
        }))
      );
    }

    return result;
  }
}
