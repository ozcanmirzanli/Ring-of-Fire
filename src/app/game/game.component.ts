import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();
  gameId: string = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const docRef = doc(this.firestore, 'games', params['id']);
      this.gameId = params['id'];
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const gameData = docSnap.data() as Game;
        this.game = Object.assign(new Game(), gameData);
      }
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      this.currentCard = card !== undefined ? card : '';
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      this.game.players.push(name);
      this.saveGame();
    });
  }

  async saveGame() {
    const docRef = doc(this.firestore, 'games', this.gameId);
    const gameData = this.game.toJson();
    await updateDoc(docRef, gameData);
  }
}
