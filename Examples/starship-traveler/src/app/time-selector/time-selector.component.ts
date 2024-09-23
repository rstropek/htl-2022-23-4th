import { Component, effect, EventEmitter, input, Input, model, OnInit, output, Output } from '@angular/core';

export enum TimeRelation {
  Past,
  Upcoming,
}

@Component({
  selector: 'app-time-selector',
  standalone: true,
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.css']
})
export class TimeSelectorComponent {
  timeRelation = model(TimeRelation.Past);
  timeRelationChange = output<TimeRelation>();

  eTimeRelation = TimeRelation;

  onClick(time: TimeRelation) {
    this.timeRelation.set(time);
    this.timeRelationChange.emit(this.timeRelation());
  }
}
