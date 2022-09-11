import { Component } from '@angular/core';
import { Level2Component } from '../level2/level2.component';

/**
 * Represents a board cell.
 */
export interface BoardCell {
  /**
   * Player (X or O) occupying the cell, empty string if the cell is empty.
   */
  playerName: string;

  /**
   * CSS class of the player occupying the cell, empty string if the cell is empty.
   */
  class: string;
}

@Component({
  selector: 'app-connect-three',
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.css'],
})
export class Level3Component extends Level2Component {
  /**
   * Initializes a new instance of the {@link Level3Component} class.
   */
  constructor() {
    super();
  }

  /**
   * Get a two-dimensional array representing the board's content.
   */
  public getCells(): BoardCell[][] {
    const result: BoardCell[][] = [];
    for (let row = 0; row < 3; row++) {
      result.push([]);
      for (let col = 0; col < 3; col++) {
        result[row][col] = {
          playerName: this.getPlayerName(col, row),
          class: this.getStyle(col, row),
        };
      }
    }

    return result;
  }
}
