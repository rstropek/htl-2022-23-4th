import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-column-indicator',
  templateUrl: './column-indicator.component.html',
  styleUrls: ['./column-indicator.component.css']
})
export class ColumnIndicatorComponent {
  /**
   * Index of the player (1 or 2) whose turn it is
   */
  @Input() public playerIndex = 1;

  /**
   * Index of the column that this indicator is for
   */
  @Input() public columnIndex = 0;

  /**
   * Event that is emitted when the user clicks on this indicator.
   *
   * The event payload is the index of the column that the user clicked on.
   */
  @Output() public drop = new EventEmitter<number>();
}

@Pipe({
  name: 'playerClass'
})
export class PlayerIndexIntoToClassPipe implements PipeTransform {
  transform(player: number, ...args: unknown[]): string {
    return `player-${player}`;
  }
}
