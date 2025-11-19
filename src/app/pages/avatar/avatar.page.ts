// src/app/pages/avatar/avatar.page.ts
// En este archivo manejo la lógica de selección de avatar:
// aquí muestro las opciones de gatos, dejo seleccionar uno y guardo la elección en el GameUser.

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService, GameUser } from '../../services/auth.service';

interface AvatarOption {
  id: string;
  name: string;
  src: string;
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.page.html',
  styleUrls: ['./avatar.page.scss'],
  standalone: false,
})
export class AvatarPage implements OnInit {
  // Aquí defino las opciones de avatar que quiero mostrar.
  avatars: AvatarOption[] = [
    {
      id: 'tabby',
      name: 'Gato Atigrado',
      src: 'assets/cats/cat-tabby.png',
    },
    {
      id: 'persian',
      name: 'Gato Persa',
      src: 'assets/cats/cat-persian.png',
    },
    {
      id: 'siamese',
      name: 'Gato Siamés',
      src: 'assets/cats/cat-siamese.png',
    },
    {
      id: 'black',
      name: 'Gato Negro',
      src: 'assets/cats/cat-black.png',
    },
  ];

  // Aquí guardo cuál avatar está seleccionado actualmente.
  selectedId = 'tabby';

  // Aquí guardo el usuario actual para reutilizarlo al guardar.
  private currentUser: GameUser | null = null;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService
  ) {}

  ngOnInit() {
    // Aquí obtengo el usuario actual desde AuthService.
    this.currentUser = this.auth.getCurrentUser();

    // Aquí intento usar el avatar guardado anteriormente.
    if (this.currentUser?.avatarType) {
      this.selectedId = this.currentUser.avatarType;
    }
  }

  // Aquí actualizo el avatar seleccionado cuando hago clic en una tarjeta.
  selectAvatar(id: string) {
    this.selectedId = id;
  }

  // Aquí guardo la elección en el usuario actual y regreso al menú.
  saveAvatar() {
    if (this.currentUser) {
      const updated: GameUser = {
        ...this.currentUser,
        avatarType: this.selectedId,
      };
      // Aquí actualizo el usuario en el servicio, lo que también persiste en localStorage.
      this.auth.updateUser(updated);
      this.currentUser = updated;
    }

    // Después de guardar vuelvo al menú.
    this.navCtrl.navigateBack('/menu');
  }

  // Aquí vuelvo al menú sin guardar cambios.
  goBack() {
    this.navCtrl.navigateBack('/menu');
  }
}
