import { Injectable } from '@angular/core';
import { GameUser } from './auth.service';

export interface RunResult {
  playerEmail: string;
  playerName: string;
  world: string;
  score: number;
  distance: number;
  coins: number;
  date: string;     // ISO string
}

export interface PlayerStats {
  email: string;
  name: string;
  totalScore: number;
  totalDistance: number;
  totalCoins: number;
  runs: number;
  currentLevel: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private readonly RUNS_KEY = 'rm_runs';
  private readonly STATS_KEY = 'rm_stats';

  private runs: RunResult[] = [];
  private stats: PlayerStats[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const rawRuns = localStorage.getItem(this.RUNS_KEY);
    const rawStats = localStorage.getItem(this.STATS_KEY);

    this.runs = rawRuns ? JSON.parse(rawRuns) : [];
    this.stats = rawStats ? JSON.parse(rawStats) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.RUNS_KEY, JSON.stringify(this.runs));
    localStorage.setItem(this.STATS_KEY, JSON.stringify(this.stats));
  }

  // Registrar una carrera al terminar o al morir
  registerRun(
    user: GameUser | null,
    world: string,
    score: number,
    distance: number,
    coins: number
  ): void {
    if (!user) {
      return;
    }

    const entry: RunResult = {
      playerEmail: user.email,
      playerName: user.name,
      world,
      score,
      distance,
      coins,
      date: new Date().toISOString()
    };

    this.runs.push(entry);

    // Actualizar estadísticas por jugador
    let st = this.stats.find(s => s.email === user.email);
    if (!st) {
      st = {
        email: user.email,
        name: user.name,
        totalScore: 0,
        totalDistance: 0,
        totalCoins: 0,
        runs: 0,
        currentLevel: 1
      };
      this.stats.push(st);
    }

    st.totalScore += score;
    st.totalDistance += distance;
    st.totalCoins += coins;
    st.runs += 1;

    // Regla sencilla de nivel: cada 3 carreras sube de nivel
    st.currentLevel = 1 + Math.floor(st.runs / 3);

    this.saveToStorage();
  }

  getPlayerStats(email: string | null): PlayerStats | null {
    if (!email) {
      return null;
    }
    const st = this.stats.find(s => s.email === email);
    return st ? { ...st } : null;
  }

  // Ranking global o por mundo
  getLeaderboard(world?: string): RunResult[] {
    const filtered = world ? this.runs.filter(r => r.world === world) : this.runs;
    return [...filtered].sort((a, b) => b.score - a.score).slice(0, 20);
  }

  resetPlayerStats(email: string | null): void {
    if (!email) {
      return;
    }
    this.runs = this.runs.filter(r => r.playerEmail !== email);
    this.stats = this.stats.filter(s => s.email !== email);
    this.saveToStorage();
  }
}
