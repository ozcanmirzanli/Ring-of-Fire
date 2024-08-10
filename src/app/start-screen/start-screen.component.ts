import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addDoc, collection } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Game } from '../../models/game';
@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent implements OnInit {
  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {}

  async newGame() {
    // Start game
    // Add a new document to the 'games' collection
    let game = new Game();
    try {
      const gamesCollection = collection(this.firestore, 'games');
      await addDoc(gamesCollection, game.toJson()).then((gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
      console.log('Document added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
}
