import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';
import { RandomizerComponent } from './randomizer/randomizer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'build' },
  { path: 'build', component: BuildComponent },
  { path: 'randomizer', component: RandomizerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
