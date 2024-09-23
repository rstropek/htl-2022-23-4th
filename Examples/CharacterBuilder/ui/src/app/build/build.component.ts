import { Component, OnInit } from '@angular/core';
import {
  CharacterImageService,
  ImageOptions,
} from '../character-image.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-build',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
})
export class BuildComponent implements OnInit {
  public imageUrl?: string;
  public imageOptions: ImageOptions = {
    eye: 'NoEye',
    hasHammer: false,
    mouth: 'NoMouth',
    rightHand: 'NoHand',
    hasTail: false,
  };

  constructor(private characterImageService: CharacterImageService) {}

  ngOnInit(): void {
    this.characterImageService
      .buildImage(this.imageOptions)
      .subscribe((response) => {
        this.imageUrl = response.url;
      });
  }

  randomOptions(): void {
    this.characterImageService.getRandomImageOptions().subscribe((response) => {
      this.imageOptions = response;

      // This is an advanced requirement
      this.ngOnInit();
    });
  }
}
