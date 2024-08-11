import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss',
})
export class PlayerMobileComponent {
  @Input() name: string = '';
  @Input() playerActive: boolean = false;
}
