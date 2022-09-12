import { Component } from '@angular/core';

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {
  public currentPlayerIndex = 1;

  public drop(colIx: number) {
    console.log(`Coin dropped in column ${colIx}`);
    this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
  }

  // TODO: Complete this class by adding the appropriate code
  // At the end, this should become a working connect-four-game on a 4 x 4 board.
}
