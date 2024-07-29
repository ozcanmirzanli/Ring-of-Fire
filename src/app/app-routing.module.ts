import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { NgModule } from '@angular/core';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from './game-info/game-info.component';
export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'game', component: GameComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'dialog', component: DialogAddPlayerComponent },
  { path: 'app-game-info', component: GameInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatButtonModule, MatIconModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
