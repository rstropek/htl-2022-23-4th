import { Component } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css'],
})
export class Level4Component {
  constructor(private board: BoardService) {}

  // TODO: Enhance solution from level 3 by extracting the logic in a separate Angular service.
}
