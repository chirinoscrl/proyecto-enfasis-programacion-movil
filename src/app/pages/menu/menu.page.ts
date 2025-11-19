// src/app/pages/menu/menu.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface RunnerStats {
  level: number;
  totalDistance: number;
  totalCoins: number;
  runs: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {

  // Aquí defino los datos visibles del perfil
  playerName = 'Invitado';

  // Clave del avatar y ruta de imagen
  avatarKey = 'cat-black';
  avatarSrc = 'assets/cats/cat-black.png';

  level = 1;
  totalRuns = 0;
  totalDistance = 0;
  totalCoins = 0;

  // Aquí marco si el jugador es invitado
  isGuest = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadPlayerInfo();
    this.loadAvatar();
    this.loadStats();
  }

  // Aquí intento leer la info del usuario desde localStorage
  private loadPlayerInfo(): void {
    try {
      // Aquí pruebo varias claves posibles para evitar depender de un solo nombre
      const possibleKeys = ['userProfile', 'currentUser', 'user'];

      let profile: any = null;

      for (const key of possibleKeys) {
        const raw = window.localStorage.getItem(key);
        if (raw) {
          profile = JSON.parse(raw);
          break;
        }
      }

      if (!profile) {
        this.isGuest = true;
        this.playerName = 'Invitado';
        return;
      }

      // Aquí intento sacar un nombre legible del perfil
      const name =
        profile.name ??
        profile.fullName ??
        profile.username ??
        profile.email;

      this.playerName = name || 'Jugador';
      this.isGuest = false;

    } catch {
      this.isGuest = true;
      this.playerName = 'Invitado';
    }
  }

  // Aquí cargo el avatar guardado en localStorage
  private loadAvatar(): void {
    let storedKey: string | null = null;

    try {
      // Aquí intento varias claves por si la pantalla de avatar usa otro nombre
      storedKey =
        window.localStorage.getItem('selectedAvatarKey') ||
        window.localStorage.getItem('avatarKey') ||
        window.localStorage.getItem('avatar');
    } catch {
      storedKey = null;
    }

    if (!storedKey) {
      this.setAvatarFromKey('cat-black');
      return;
    }

    this.setAvatarFromKey(storedKey);
  }

  // Aquí convierto la clave en una ruta de imagen
  private setAvatarFromKey(key: string): void {
    // Si la clave ya parece una ruta completa, la uso tal cual
    if (key.includes('/') || key.endsWith('.png') || key.endsWith('.jpg')) {
      this.avatarSrc = key;
      this.avatarKey = key;
      return;
    }

    // Si solo recibo la clave, la convierto a ruta dentro de assets/cats
    this.avatarKey = key;
    this.avatarSrc = `assets/cats/${key}.png`;
  }

  // Aquí manejo el error si la imagen del avatar no carga
  onAvatarError(): void {
    // Si algo falla siempre vuelvo al gato negro
    this.setAvatarFromKey('cat-black');
  }

  // Aquí cargo las estadísticas del jugador
  private loadStats(): void {
    // Si es invitado no leo estadísticas guardadas
    if (this.isGuest) {
      this.level = 1;
      this.totalRuns = 0;
      this.totalDistance = 0;
      this.totalCoins = 0;
      return;
    }

    try {
      const raw = window.localStorage.getItem('runnerStats');
      if (!raw) {
        return;
      }

      const data: RunnerStats = JSON.parse(raw);

      this.level = data.level ?? 1;
      this.totalRuns = data.runs ?? 0;
      this.totalDistance = data.totalDistance ?? 0;
      this.totalCoins = data.totalCoins ?? 0;

    } catch {
      // Si algo falla dejo los valores por defecto
    }
  }

  // Aquí navego a la pantalla de selección de mundos
  goToWorldSelect(): void {
    this.router.navigate(['/world-select'], {
      state: {
        avatarKey: this.avatarKey,
        isGuest: this.isGuest,
      },
    });
  }

  // Aquí navego a la pantalla de selección de avatar
  goToAvatar(): void {
    this.router.navigate(['/avatar']);
  }

  // Aquí navego a la pantalla de tablas
  goToLeaderboard(): void {
    this.router.navigate(['/leaderboard'], {
      state: {
        isGuest: this.isGuest,
      },
    });
  }

  // Aquí manejo el botón SALIR de abajo
  logout(): void {
    // Borro solo los datos de usuario real
    window.localStorage.removeItem('userProfile');
    window.localStorage.removeItem('currentUser');
    window.localStorage.removeItem('user');

    window.localStorage.removeItem('selectedAvatarKey');
    window.localStorage.removeItem('avatarKey');
    window.localStorage.removeItem('avatar');

    if (!this.isGuest) {
      window.localStorage.removeItem('runnerStats');
    }

    // Restauro estado visual del menú
    this.playerName = 'Invitado';
    this.isGuest = true;
    this.level = 1;
    this.totalRuns = 0;
    this.totalDistance = 0;
    this.totalCoins = 0;

    this.setAvatarFromKey('cat-black');

    // Aquí envío al login
    this.router.navigate(['/login']);
  }
}
