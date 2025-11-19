import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
 standalone: false,
})
export class SplashPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    // Mostramos el splash unos segundos
    setTimeout(() => {
      const current = this.auth.getCurrentUser();

      if (current) {
        // Si ya hay usuario guardado
        this.router.navigateByUrl('/login', { replaceUrl: true });
      } else {
        // Si no hay usuario, ir a registro
        this.router.navigateByUrl('/register', { replaceUrl: true });
      }
    }, 2500);
  }
}
