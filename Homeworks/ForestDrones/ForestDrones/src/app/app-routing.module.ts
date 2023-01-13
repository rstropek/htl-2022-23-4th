import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DroneStatusComponent } from './drone-status/drone-status.component';
import { ExamineTreesComponent } from './examine-trees/examine-trees.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'drones' },
  { path: 'drones', component: DroneStatusComponent },
  { path: 'examine', component: ExamineTreesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
