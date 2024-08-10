import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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

  game: Game = new Game();
  gameId: string = '';
  private unsubscribe: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      const docRef = doc(this.firestore, 'games', this.gameId);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const gameData = docSnap.data() as Game;
          this.game = Object.assign(new Game(), gameData);
        }
      });
      this.unsubscribe.add(unsubscribe);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      const card = this.game.stack.pop();
      this.game.currentCard = card !== undefined ? card : '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
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
