// src/app/pages/leaderboard/leaderboard.page.ts
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatsService as GameStateService, PlayerStats } from '../../services/game-state.service';

type WorldFilter = 'all' | 'desert' | 'forest' | 'city';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: false,
})
export class LeaderboardPage {
  players: PlayerStats[] = [];
  activeFilter: WorldFilter = 'all';

  constructor(
    private gameState: GameStateService,
    private navCtrl: NavController
  ) {
    this.loadPlayers();
  }

  private loadPlayers() {
    if (this.activeFilter === 'all') {
      this.players = this.gameState.getPlayerLeaderboard();
    } else {
      this.players = this.gameState.getPlayerLeaderboard(this.activeFilter);
    }
  }

  setFilter(filter: WorldFilter) {
    this.activeFilter = filter;
    this.loadPlayers();
  }

  goBack() {
    this.navCtrl.navigateBack('/menu');
  }
}
