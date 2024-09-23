import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, zip } from 'rxjs';
import { BASE_URL } from './app.config';

export type ImageOptions = {
  eye: 'NoEye' | 'HalfOpen' | 'Closed' | 'Open';
  hasHammer: boolean;
  mouth: 'NoMouth' | 'Happy' | 'Normal' | 'Unhappy';
  rightHand: 'NoHand' | 'Normal' | 'Victory';
  hasTail: boolean;
};

export type BuildImageResponse = {
  url: string;
};

@Injectable({
  providedIn: 'root',
})
export class CharacterImageService {
  constructor(
    private httpClient: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  public buildImage(
    imageOptions: ImageOptions
  ): Observable<BuildImageResponse> {
    return this.httpClient.post<BuildImageResponse>(
      `${this.baseUrl}/build-image-url`,
      imageOptions
    );
  }

  public getRandomImageOptions(): Observable<ImageOptions> {
    return this.httpClient.get<ImageOptions>(
      `${this.baseUrl}/get-random-image-options`
    );
  }
}
