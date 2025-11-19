// src/app/services/world.service.ts
import { Injectable } from '@angular/core';

export type WorldId = 'desert' | 'forest' | 'city';

export interface WorldConfig {
  id: WorldId;
  name: string;
  description: string;
  timeLimit: number;     // en segundos
  length: number;        // largo del nivel en píxeles
  background: string;    // solo informativo, lo uso en el HUD
}

const WORLD_CONFIGS: Record<WorldId, WorldConfig> = {
  desert: {
    id: 'desert',
    name: 'Desierto',
    description: 'Arena caliente y plataformas largas.',
    timeLimit: 50,
    length: 3800,
    background: 'desert'
  },
  forest: {
    id: 'forest',
    name: 'Bosque',
    description: 'Salta entre troncos y raíces.',
    timeLimit: 55,
    length: 4200,
    background: 'forest'
  },
  city: {
    id: 'city',
    name: 'Ciudad',
    description: 'Edificios, puentes y tráfico.',
    timeLimit: 60,
    length: 4500,
    background: 'city'
  }
};

@Injectable({
  providedIn: 'root'
})
export class WorldService {
  // Aquí guardo el mundo actual en memoria
  private currentWorldId: WorldId = 'desert';

  setCurrentWorld(id: WorldId) {
    this.currentWorldId = id;
  }

  getCurrentWorld(): WorldConfig {
    return WORLD_CONFIGS[this.currentWorldId];
  }

  getWorldConfig(id: WorldId): WorldConfig {
    return WORLD_CONFIGS[id];
  }

  getAllWorlds(): WorldConfig[] {
    return Object.values(WORLD_CONFIGS);
  }
}
