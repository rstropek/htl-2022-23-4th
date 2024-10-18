import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CharacterImageService, ImageOptions } from '../character-image.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.css'],
})
export class RandomizerComponent implements OnInit {
  public imageOptions = signal<ImageOptions | undefined>(undefined);
  public imageUrl = signal<string | undefined>(undefined);
  public scale = signal(0.5);
  public imageWidth = computed(() => 1024 * this.scale());
  public imageHeight = computed(() => 1124 * this.scale());
  public imageUrlWithScale = computed(() => `${this.imageUrl()}?scale=${this.scale()}`);

  private readonly characterImageService = inject(CharacterImageService);

  async ngOnInit() {
    const response = await this.characterImageService.getRandomImageOptions();
    this.imageOptions.set(response);
    await this.refreshImage();
  }

  async refreshImage() {
    if (this.imageOptions()) {
      const response = await this.characterImageService.buildImage(this.imageOptions()!);
      this.imageUrl.set(response.url);
    }
  }

  async zoomIn() {
    this.scale.update(scale => Math.min(1, scale + 0.1));
    await this.refreshImage();
  }

  async zoomOut() {
    this.scale.update(scale => Math.max(0.1, scale - 0.1));
    await this.refreshImage();
  }

  async next() {
    await this.ngOnInit();
  }
}
