import { Component, inject, OnInit, signal } from '@angular/core';
import { CharacterImageService, Eye, Mouth, RightHand } from '../character-image.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-build',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
})
export class BuildComponent implements OnInit {
  public imageUrl = signal<string | undefined>(undefined);
  public eye = signal<Eye>('NoEye');
  public hasHammer = signal(false);
  public mouth = signal<Mouth>('NoMouth');
  public rightHand = signal<RightHand>('NoHand');
  public hasTail = signal(false);

  private readonly characterImageService = inject(CharacterImageService);

  ngOnInit() {
    this.reload();
  }

  async reload() {
    const imageUrl = await this.characterImageService.buildImage({
      eye: this.eye(),
      hasHammer: this.hasHammer(),
      mouth: this.mouth(),
      rightHand: this.rightHand(),
      hasTail: this.hasTail(),
    });
    this.imageUrl.set(imageUrl.url);
  }

  async randomOptions() {
    const response = await this.characterImageService.getRandomImageOptions();

    this.eye.set(response.eye);
    this.hasHammer.set(response.hasHammer);
    this.mouth.set(response.mouth);
    this.rightHand.set(response.rightHand);
    this.hasTail.set(response.hasTail);

    await this.reload();
  }
}
