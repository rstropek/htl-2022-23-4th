import { Component, OnInit } from '@angular/core';
import {
  CharacterImageService,
  ImageOptions,
} from '../character-image.service';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.css'],
})
export class RandomizerComponent implements OnInit {
  public imageOptions?: ImageOptions;
  public imageUrl?: string;
  public scale = 0.5;
  public imageWidth: number = 0;
  public imageHeight: number = 0;

  constructor(public characterImageService: CharacterImageService) {}

  ngOnInit(): void {
    this.characterImageService.getRandomImageOptions().subscribe((response) => {
      this.imageOptions = response;
      this.refreshImage();
    });
  }

  refreshImage(): void {
    if (this.imageOptions) {
      this.characterImageService
        .buildImage(this.imageOptions)
        .subscribe((response) => {
          this.imageUrl = response.url;
          this.imageWidth = 1024 * this.scale;
          this.imageHeight = 1124 * this.scale;
        });
    }
  }

  zoomIn(): void {
    this.scale = Math.min(1, this.scale + 0.1);
    this.refreshImage();
  }

  zoomOut(): void {
    this.scale = Math.max(0.1, this.scale - 0.1);
    this.refreshImage();
  }

  next(): void {
    this.ngOnInit();
  }
}
