import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'gameplay',
    loadChildren: () =>
      import('./pages/gameplay/gameplay.module').then(m => m.GameplayPageModule)
  },
  {
    path: 'avatar',
    loadChildren: () =>
      import('./pages/avatar/avatar.module').then(m => m.AvatarPageModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () =>
      import('./pages/leaderboard/leaderboard.module').then(m => m.LeaderboardPageModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'pause',
    loadChildren: () =>
      import('./pages/pause/pause.module').then(m => m.PausePageModule)
  },
  {
    path: 'game-over',
    loadChildren: () =>
      import('./pages/game-over/game-over.module').then(m => m.GameOverPageModule)
  },
  {
    path: 'world-select',
    loadChildren: () =>
      import('./pages/world-select/world-select.module').then(m => m.WorldSelectPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
