import { Component, Input } from '@angular/core';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [PlayerComponent],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss',
})
export class PlayerMobileComponent {
  @Input() name: string = '';
  @Input() image: string = '1.png';
  @Input() playerActive: boolean = false;
}
