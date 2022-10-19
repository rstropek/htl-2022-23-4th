import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum TimeRelation {
  Past,
  Upcoming,
}

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.css']
})
export class TimeSelectorComponent {
  @Input() timeRelation: TimeRelation = TimeRelation.Past;
  @Output() timeRelationChange = new EventEmitter<TimeRelation>();

  eTimeRelation = TimeRelation;

  onClick(time: TimeRelation) {
    this.timeRelation = time;
    this.timeRelationChange.emit(this.timeRelation);
  }
}
