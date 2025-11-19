// src/app/pages/game-over/game-over.page.ts
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatsService, RunResult } from '../../services/stats.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
  standalone: false,
})
export class GameOverPage {
  run: RunResult | null;

  constructor(
    private statsService: StatsService,
    private navCtrl: NavController
  ) {
    // Aquí leo el último run que guardé al terminar el nivel
    this.run = this.statsService.getLastRun();
  }

  tryAgain() {
    this.navCtrl.navigateBack('/world-select');
  }

  goToMenu() {
    this.navCtrl.navigateBack('/menu');
  }

  goToLeaderboard() {
    this.navCtrl.navigateForward('/leaderboard');
  }
}
