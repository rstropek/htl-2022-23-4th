import { Component, OnInit } from '@angular/core';
import { DroneService, Position } from '../drone.service';

@Component({
  selector: 'app-examine-trees',
  templateUrl: './examine-trees.component.html',
  styleUrls: ['./examine-trees.component.css'],
})
export class ExamineTreesComponent implements OnInit {
  public droneIds?: number[];
  public pos: Position = { x: 0, y: 0 };
  public selectedDroneId: number = 0;
  public treePosAbsolute?: Position;
  public treePosRelative?: Position;
  public scanning: boolean = false;

  constructor(private droneServices: DroneService) {}

  ngOnInit(): void {
    this.droneServices.getDroneStatus().subscribe((droneStatus) => {
      this.droneIds = droneStatus.filter((d) => d.isActive).map((d) => d.id);
      if (this.droneIds.length > 0) {
        this.selectedDroneId = this.droneIds[0];
      }
    });
  }

  public findNearestTree(): void {
    this.scanning = true;
    this.droneServices
      .flyTo(this.selectedDroneId, this.pos)
      .subscribe((position) => {
        this.droneServices
          .scan(this.selectedDroneId)
          .subscribe((scanResult) => {
            const sortedTrees = scanResult.damagedTrees
              .map((t) => {
                return {
                  pos: t,
                  dist: Math.abs(t.x - this.pos.x) + Math.abs(t.y - this.pos.y),
                };
              })
              .sort((a, b) => a.dist - b.dist);
            if (sortedTrees.length > 0) {
              this.treePosAbsolute = sortedTrees[0].pos;
              this.treePosRelative = {
                x: this.treePosAbsolute.x - position.x,
                y: this.treePosAbsolute.y - position.y,
              };
            } else {
              delete this.treePosAbsolute;
              delete this.treePosRelative;
            }
            this.scanning = false;
          });
      });
  }

  public markAsExamined(): void {
    if (this.treePosAbsolute) {
      this.droneServices.markAsExamined(this.treePosAbsolute).subscribe();
    }
  }

  public goToNextTree(): void {
    if (this.treePosAbsolute && this.selectedDroneId) {
      this.pos = this.treePosAbsolute;
      this.findNearestTree();
    }
  }
}
