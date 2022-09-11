import { Component } from '@angular/core';
import { BoardService } from '../level4/board.service';

@Component({
  selector: 'app-connect-three',
  templateUrl: './level5.component.html',
  styleUrls: ['./level5.component.css'],
})
export class Level5Component {
  /**
   * Initializes a new instance of the {@link Level5Component} class.
   */
  constructor(public board: BoardService) {
  }
}
