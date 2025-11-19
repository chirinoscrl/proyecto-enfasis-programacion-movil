// src/app/services/stats.service.ts
import { Injectable } from '@angular/core';
import { WorldId } from './world.service';

export type AvatarId = 'cat-orange' | 'cat-gray' | 'cat-black';

export interface AvatarOption {
  id: AvatarId;
  name: string;
  color: string;   // aquí uso este color para pintar el gato en la UI
}

export interface RunResult {
  worldId: WorldId;
  worldName: string;
  distance: number;
  coins: number;
  livesLeft: number;
  completed: boolean;
  timeUsed: number;
  timestamp: number;
}

export interface PlayerStats {
  totalRuns: number;
  totalDistance: number;
  totalCoins: number;
  bestDistanceByWorld: Record<WorldId, number>;
  totalScore: number;
  currentLevel: number;
}

const STORAGE_RUNS_KEY = 'runner_multimundos_runs_v1';
const STORAGE_STATS_KEY = 'runner_multimundos_stats_v1';
const STORAGE_AVATAR_KEY = 'runner_multimundos_avatar_v1';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  // Aquí guardo el último run para la pantalla de Game Over
  private lastRun: RunResult | null = null;

  // Aquí defino los avatares disponibles
  private avatars: AvatarOption[] = [
    { id: 'cat-orange', name: 'Gato Naranja', color: '#ffb347' },
    { id: 'cat-gray', name: 'Gato Gris', color: '#b0bec5' },
    { id: 'cat-black', name: 'Gato Negro', color: '#424242' }
  ];

  getAvailableAvatars(): AvatarOption[] {
    return this.avatars;
  }

  getSelectedAvatar(): AvatarOption {
    const stored = localStorage.getItem(STORAGE_AVATAR_KEY) as AvatarId | null;
    const found = this.avatars.find(a => a.id === stored);
    return found ?? this.avatars[0];
  }

  setSelectedAvatar(id: AvatarId): void {
    localStorage.setItem(STORAGE_AVATAR_KEY, id);
  }

  saveRunResult(result: RunResult): void {
    // Primero guardo el último run en memoria
    this.lastRun = result;

    // Leo la lista de runs anterior
    const raw = localStorage.getItem(STORAGE_RUNS_KEY);
    const runs: RunResult[] = raw ? JSON.parse(raw) : [];

    runs.push(result);
    localStorage.setItem(STORAGE_RUNS_KEY, JSON.stringify(runs));

    // Ahora actualizo las estadísticas agregadas
    const stats = this.getPlayerStats();
    stats.totalRuns += 1;
    stats.totalDistance += result.distance;
    stats.totalCoins += result.coins;

    const world = result.worldId;
    stats.bestDistanceByWorld[world] = Math.max(
      stats.bestDistanceByWorld[world] ?? 0,
      result.distance
    );

    // Aquí calculo un puntaje simple para la corrida y lo acumulo
    const runScore = Math.floor(result.distance) + result.coins * 10;
    stats.totalScore = (stats.totalScore ?? 0) + runScore;

    // Aquí avanzo el nivel actual si la corrida terminó de forma exitosa
    if (result.completed) {
      const levelFromDistance = Math.floor(result.distance / 1000) + 1;
      stats.currentLevel = Math.max(stats.currentLevel ?? 1, levelFromDistance);
    }

    localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(stats));
  }

  getLastRun(): RunResult | null {
    return this.lastRun;
  }

  getPlayerStats(userEmail?: string | null): PlayerStats {
    const raw = localStorage.getItem(STORAGE_STATS_KEY);
    if (raw) {
      return JSON.parse(raw) as PlayerStats;
    }
    // Si no hay nada, yo creo stats por defecto
    return {
      totalRuns: 0,
      totalDistance: 0,
      totalCoins: 0,
      bestDistanceByWorld: {
        desert: 0,
        forest: 0,
        city: 0
      },
      totalScore: 0,
      currentLevel: 1
    };
  }

  getLeaderboard(worldId?: WorldId): RunResult[] {
    const raw = localStorage.getItem(STORAGE_RUNS_KEY);
    const runs: RunResult[] = raw ? JSON.parse(raw) : [];

    // Aquí filtro por mundo si me lo piden
    const filtered = worldId ? runs.filter(r => r.worldId === worldId) : runs;

    // Aquí ordeno por distancia y luego por monedas
    return filtered.sort((a, b) => {
      if (b.distance !== a.distance) {
        return b.distance - a.distance;
      }
      return b.coins - a.coins;
    });
  }

  resetPlayerStats(userEmail?: string | null): void {
    const defaultStats: PlayerStats = {
      totalRuns: 0,
      totalDistance: 0,
      totalCoins: 0,
      bestDistanceByWorld: {
        desert: 0,
        forest: 0,
        city: 0
      },
      totalScore: 0,
      currentLevel: 1
    };

    localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(defaultStats));
  }

  resetAll(): void {
    // Aquí borro todo: runs, stats y último run
    localStorage.removeItem(STORAGE_RUNS_KEY);
    localStorage.removeItem(STORAGE_STATS_KEY);
    this.lastRun = null;
  }

  clearForLogout(): void {
    // Si quisiera limpiar solo lo de sesión, podría hacerlo aquí.
    // De momento lo dejo igual que resetAll, pero lo separo por claridad.
    this.resetAll();
  }
}
