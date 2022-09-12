import { Component } from '@angular/core';

@Component({
  selector: 'app-connect-three',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.css'],
})
export class Level1Component {
  public boardContent: number[][] = [];

  constructor() {
    for(let row = 0; row < 6; row++) {
      this.boardContent.push([]);
      for(let col = 0; col < 7; col++) {
        this.boardContent[row].push(0);
      }
    }
  }

  public drop(colIx: number) {
    for(let row = 5; row >= 0; row--) {
      if (this.boardContent[row][colIx] === 0) {
        this.boardContent[row][colIx] = 1;
        break;
      }
    }
  }
}
