import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
export class EditPlayerComponent implements OnInit {
  allProfilePictures = ['1.png', '2.png', '3.png', '4.png', '5.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}

  ngOnInit(): void {}
}
