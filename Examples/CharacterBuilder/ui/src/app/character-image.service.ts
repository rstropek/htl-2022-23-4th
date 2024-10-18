import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BASE_URL } from './app.config';

export type Eye = 'NoEye' | 'HalfOpen' | 'Closed' | 'Open';
export type Mouth = 'NoMouth' | 'Happy' | 'Normal' | 'Unhappy';
export type RightHand = 'NoHand' | 'Normal' | 'Victory';

export type ImageOptions = {
  eye: Eye;
  hasHammer: boolean;
  mouth: Mouth;
  rightHand: RightHand;
  hasTail: boolean;
};

export type BuildImageResponse = {
  url: string;
};

@Injectable({
  providedIn: 'root',
})
export class CharacterImageService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);

  public buildImage(imageOptions: ImageOptions): Promise<BuildImageResponse> {
    return firstValueFrom(this.httpClient.post<BuildImageResponse>(`${this.baseUrl}/build-image-url`, imageOptions));
  }

  public getRandomImageOptions(): Promise<ImageOptions> {
    return firstValueFrom(this.httpClient.get<ImageOptions>(`${this.baseUrl}/get-random-image-options`));
  }
}
