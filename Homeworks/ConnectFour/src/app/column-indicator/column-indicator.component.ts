import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-column-indicator',
  templateUrl: './column-indicator.component.html',
  styleUrls: ['./column-indicator.component.css']
})
export class ColumnIndicatorComponent {
  @Input() public playerIndex = 1;
  @Input() public columnIndex = 0;

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
