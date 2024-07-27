import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { NgModule } from '@angular/core';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
