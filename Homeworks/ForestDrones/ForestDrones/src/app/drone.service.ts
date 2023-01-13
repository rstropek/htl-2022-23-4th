import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './app.module';

export type DroneStatus = {
  id: number;
  isActive: boolean;
  position: Position
}

export type Position = {
  x: number;
  y: number;
}

export type ScanResult = {
  dronePosition: Position;
  damagedTrees: Position[];
}

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  constructor(private httpClient: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }

  public getDroneStatus(): Observable<DroneStatus[]> {
    return this.httpClient.get<DroneStatus[]>(`${this.baseUrl}/drones`);
  }

  public activateDrone(droneId: number): Observable<unknown> {
    return this.httpClient.post(`${this.baseUrl}/drones/${droneId}/activate`, {});
  }

  public shutdownDrone(droneId: number): Observable<unknown> {
    return this.httpClient.post(`${this.baseUrl}/drones/${droneId}/shutdown`, {});
  }

  public flyTo(droneId: number, position: Position): Observable<Position> {
    return this.httpClient.post<Position>(`${this.baseUrl}/drones/${droneId}/flyTo`, position);
  }

  public scan(droneId: number): Observable<ScanResult> {
    return this.httpClient.get<ScanResult>(`${this.baseUrl}/drones/${droneId}/scan`);
  }

  public markAsExamined(position: Position): Observable<unknown> {
    return this.httpClient.post(`${this.baseUrl}/trees/markAsExamined`, position);
  }
}
