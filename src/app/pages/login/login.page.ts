import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  async onLogin(): Promise<void> {
    this.errorMessage = '';
    const res = this.auth.login(this.email, this.password);
    if (!res.ok) {
      this.errorMessage = res.message;
      return;
    }
    this.router.navigateByUrl('/menu', { replaceUrl: true });
  }

  onGuest(): void {
    this.auth.loginAsGuest();
    this.router.navigateByUrl('/menu', { replaceUrl: true });
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
