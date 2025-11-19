// src/app/pages/leaderboard/leaderboard.page.ts
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatsService, RunResult } from '../../services/stats.service';
import { WorldId } from '../../services/world.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: false,
})
export class LeaderboardPage {
  runs: RunResult[] = [];
  activeFilter: WorldId | 'all' = 'all';

  constructor(
    private statsService: StatsService,
    private navCtrl: NavController
  ) {
    this.loadRuns();
  }

  private loadRuns() {
    this.runs =
      this.activeFilter === 'all'
        ? this.statsService.getLeaderboard()
        : this.statsService.getLeaderboard(this.activeFilter);
  }

  setFilter(filter: WorldId | 'all') {
    this.activeFilter = filter;
    this.loadRuns();
  }

  goBack() {
    this.navCtrl.navigateBack('/menu');
  }
}
