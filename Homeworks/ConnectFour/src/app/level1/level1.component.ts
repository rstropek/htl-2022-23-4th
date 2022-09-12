import { Component } from '@angular/core';

@Component({
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.css'],
})
export class Level1Component {
  public currentPlayerIndex = 1;

  public drop(colIx: number) {
    console.log(`Coin dropped in column ${colIx}`);
    this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
  }
}
