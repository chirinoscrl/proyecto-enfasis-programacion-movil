import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  onRegister(): void {
    this.errorMessage = '';

    if (!this.name.trim() || !this.email.trim() || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    if (this.password.length < 4) {
      this.errorMessage = 'La contraseña debe tener al menos 4 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const res = this.auth.register(this.name, this.email, this.password);
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

  goToLogin(): void {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
