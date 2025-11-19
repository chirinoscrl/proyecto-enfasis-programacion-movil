// src/app/pages/world-select/world-select.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface WorldOption {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-world-select',
  templateUrl: './world-select.page.html',
  styleUrls: ['./world-select.page.scss'],
  standalone: false,
})
export class WorldSelectPage {

  // Aquí defino la lista de mundos que muestro en el HTML
  worlds: WorldOption[] = [
    { id: 0, name: 'Desierto', description: 'Arena caliente y plataformas largas.' },
    { id: 1, name: 'Bosque', description: 'Salta entre troncos y raíces.' },
    { id: 2, name: 'Ciudad', description: 'Edificios, puentes y tráfico.' },
  ];

  // Aquí guardo el avatar actual para pasarlo al gameplay
  avatarKey = 'cat-black';

  constructor(private router: Router) {
    // Aquí intento leer el avatar que viene desde el menú
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state && typeof state.avatarKey === 'string') {
      this.avatarKey = state.avatarKey;
    }
  }

  // Aquí reacciono cuando el usuario elige un mundo
  selectWorld(worldId: number): void {
    this.router.navigate(['/gameplay'], {
      state: {
        worldIndex: worldId,   // 0 = desierto, 1 = bosque, 2 = ciudad
        avatarKey: this.avatarKey,
      },
    });
  }

  // Aquí vuelvo al menú principal
  goBackToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
