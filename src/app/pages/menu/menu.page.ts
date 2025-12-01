// src/app/pages/menu/menu.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StatsService as GameStateService } from '../../services/game-state.service';

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

  constructor(
    private router: Router,
    private auth: AuthService,
    private gameState: GameStateService
  ) {}

  ngOnInit(): void {
    this.loadPlayerInfo();
    this.loadAvatar();
    this.loadStats();
  }

  // Aquí recargo datos cada vez que vuelvo a esta página
  ionViewWillEnter(): void {
    this.loadPlayerInfo();
    this.loadAvatar();
    this.loadStats();
  }

  // Aquí leo la info del usuario desde AuthService
  private loadPlayerInfo(): void {
    const currentUser = this.auth.getCurrentUser();

    if (!currentUser) {
      this.isGuest = true;
      this.playerName = 'Invitado';
      return;
    }

    this.isGuest = this.auth.isGuest();
    this.playerName = currentUser.name || 'Jugador';
  }

  // Aquí cargo el avatar guardado desde AuthService
  private loadAvatar(): void {
    const currentUser = this.auth.getCurrentUser();

    if (currentUser?.avatarType) {
      this.setAvatarFromKey(currentUser.avatarType);
    } else {
      this.setAvatarFromKey('black');
    }
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
    this.avatarSrc = `assets/cats/cat-${key}.png`;
  }

  // Aquí manejo el error si la imagen del avatar no carga
  onAvatarError(): void {
    // Si algo falla siempre vuelvo al gato negro
    this.setAvatarFromKey('cat-black');
  }

  // Aquí cargo las estadísticas del jugador
  private loadStats(): void {
    const currentUser = this.auth.getCurrentUser();

    // Si es invitado o no hay usuario, muestro valores por defecto
    if (!currentUser || this.isGuest) {
      this.level = 1;
      this.totalRuns = 0;
      this.totalDistance = 0;
      this.totalCoins = 0;
      return;
    }

    // Obtengo las estadísticas del jugador desde GameStateService
    const stats = this.gameState.getPlayerStats(currentUser.email);

    if (stats) {
      this.level = stats.currentLevel ?? 1;
      this.totalRuns = stats.runs ?? 0;
      this.totalDistance = stats.totalDistance ?? 0;
      this.totalCoins = stats.totalCoins ?? 0;
    } else {
      // Si no hay estadísticas aún, muestro valores por defecto
      this.level = 1;
      this.totalRuns = 0;
      this.totalDistance = 0;
      this.totalCoins = 0;
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
    // Uso el método logout del AuthService
    this.auth.logout();

    // Restauro estado visual del menú
    this.playerName = 'Invitado';
    this.isGuest = true;
    this.level = 1;
    this.totalRuns = 0;
    this.totalDistance = 0;
    this.totalCoins = 0;

    this.setAvatarFromKey('black');

    // Aquí envío al login
    this.router.navigate(['/login']);
  }
}
