import { Component, OnInit } from '@angular/core';
import { DroneService, DroneStatus } from '../drone.service';

@Component({
  selector: 'app-drone-status',
  templateUrl: './drone-status.component.html',
  styleUrls: ['./drone-status.component.css']
})
export class DroneStatusComponent implements OnInit {
  public drones?: DroneStatus[];

  constructor(private droneServices: DroneService) {}

  ngOnInit(): void {
    this.droneServices.getDroneStatus().subscribe((droneStatus) => {
      this.drones = droneStatus;
    });
  }

  public activate(droneId: number) {
    this.droneServices.activateDrone(droneId).subscribe(() => {
      this.ngOnInit();
    });
  }

  public shutdown(droneId: number) {
    this.droneServices.shutdownDrone(droneId).subscribe(() => {
      this.ngOnInit();
    });
  }
}
