import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pause',
  standalone: false,
  templateUrl: './pause.page.html',
  styleUrls: ['./pause.page.scss']
})
export class PausePage {

  world = 'Desierto';
  score = 0;
  distance = 0;
  coins = 0;
  completed = false;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const data = nav?.extras.state as any;
    if (data) {
      this.world = data.world || this.world;
      this.score = data.score || 0;
      this.distance = data.distance || 0;
      this.coins = data.coins || 0;
      this.completed = !!data.completed;
    }
  }

  resume(): void {
    this.router.navigateByUrl('/gameplay');
  }

  restart(): void {
    this.router.navigateByUrl('/gameplay', { replaceUrl: true });
  }

  backToMenu(): void {
    this.router.navigateByUrl('/menu', { replaceUrl: true });
  }
}
