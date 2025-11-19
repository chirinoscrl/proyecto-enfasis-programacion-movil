import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StatsService, PlayerStats } from '../../services/stats.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  stats: PlayerStats | null = null;
  musicEnabled = true;
  effectsEnabled = true;

  constructor(
    private auth: AuthService,
    private statsService: StatsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ionViewWillEnter(): void {
    this.load();
  }

  private load(): void {
    const user = this.auth.getCurrentUser();
    this.stats = this.statsService.getPlayerStats(user ? user.email : null);
  }

  resetStats(): void {
    const user = this.auth.getCurrentUser();
    this.statsService.resetPlayerStats(user ? user.email : null);
    this.load();
  }

  backToMenu(): void {
    this.router.navigateByUrl('/menu');
  }
}
