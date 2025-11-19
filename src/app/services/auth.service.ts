import { Injectable } from '@angular/core';

export interface GameUser {
  email: string;
  password: string;
  name: string;
  avatarType?: string;  // tipo de gato elegido
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USERS_KEY = 'rm_users';
  private readonly CURRENT_KEY = 'rm_current_user';

  private users: GameUser[] = [];
  private currentUser: GameUser | null = null;

  constructor() {
    this.loadFromStorage();
  }

  // Carga usuarios y usuario actual desde localStorage
  private loadFromStorage(): void {
    const rawUsers = localStorage.getItem(this.USERS_KEY);
    const rawCurrent = localStorage.getItem(this.CURRENT_KEY);

    this.users = rawUsers ? JSON.parse(rawUsers) : [];
    this.currentUser = rawCurrent ? JSON.parse(rawCurrent) : null;
  }

  // Guarda usuarios y usuario actual en localStorage
  private saveToStorage(): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));
    localStorage.setItem(this.CURRENT_KEY, JSON.stringify(this.currentUser));
  }

  getCurrentUser(): GameUser | null {
    return this.currentUser;
  }

  isGuest(): boolean {
    return !!this.currentUser && this.currentUser.email === 'guest@runner';
  }

  // Registrar jugador normal
  register(name: string, email: string, password: string): { ok: boolean; message: string } {
    email = email.trim().toLowerCase();
    const exists = this.users.some(u => u.email === email);
    if (exists) {
      return { ok: false, message: 'Ya existe una cuenta con ese correo.' };
    }

    const user: GameUser = { name, email, password };
    this.users.push(user);
    this.currentUser = user;
    this.saveToStorage();

    return { ok: true, message: 'Registro exitoso.' };
  }

  // Login normal
  login(email: string, password: string): { ok: boolean; message: string } {
    email = email.trim().toLowerCase();
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { ok: false, message: 'Correo o contraseña incorrectos.' };
    }
    this.currentUser = user;
    this.saveToStorage();
    return { ok: true, message: 'Bienvenido de nuevo.' };
  }

  // Login como invitado, se guarda también como usuario "guest"
  loginAsGuest(): GameUser {
    let guest = this.users.find(u => u.email === 'guest@runner');
    if (!guest) {
      guest = {
        email: 'guest@runner',
        password: '',
        name: 'Invitado'
      };
      this.users.push(guest);
    }
    this.currentUser = guest;
    this.saveToStorage();
    return guest;
  }

  // Actualizar info de usuario (por ejemplo avatar)
  updateUser(user: GameUser): void {
    const index = this.users.findIndex(u => u.email === user.email);
    if (index !== -1) {
      this.users[index] = { ...user };
      if (this.currentUser && this.currentUser.email === user.email) {
        this.currentUser = { ...user };
      }
      this.saveToStorage();
    }
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.CURRENT_KEY);
  }

  // Para debug si lo necesitas
  getAllUsers(): GameUser[] {
    return [...this.users];
  }
}
