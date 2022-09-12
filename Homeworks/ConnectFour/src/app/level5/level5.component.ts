import { Component } from '@angular/core';
import { BoardService } from '../level4/board.service';

@Component({
  templateUrl: './level5.component.html',
  styleUrls: ['./level5.component.css'],
})
export class Level5Component {
  constructor(private board: BoardService) {}

  // TODO: Enhance solution from level 4 by using Angular pipes
}
