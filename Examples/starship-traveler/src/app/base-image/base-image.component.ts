import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-base-image',
  templateUrl: './base-image.component.html',
  styleUrls: ['./base-image.component.css']
})
export class BaseImageComponent {
  @Input() base: string = '';

  constructor(@Inject('BASES') private bases: Map<string, string>) {}

  get baseImage(): string {
    if (this.base) {
      return this.bases.get(this.base) || '';
    }

    return '';
  }
}
