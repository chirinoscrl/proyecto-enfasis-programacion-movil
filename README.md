# Runner Multimundos

"Runner Multimundos" es un juego móvil 2D de plataformas/runner desarrollado con Ionic y Angular, y desplegado en Android utilizando Capacitor. Los jugadores controlan un avatar de gato que navega a través de tres mundos diferentes (Desierto, Bosque y Ciudad), construidos con el motor de juegos Phaser 3.

## Cómo Empezar

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu máquina local para desarrollo y pruebas.

### Pre-requisitos

Necesitarás tener Node.js y npm instalados en tu sistema. También es recomendable tener Android Studio para el desarrollo en Android.

### Instalación

1.  Clona el repositorio.
2.  Navega al directorio del proyecto.
3.  Instala las dependencias de npm:
    ```bash
    npm install
    ```

### Comandos de Desarrollo

#### Ejecutando la Aplicación
```bash
npm start              # Inicia el servidor de desarrollo (ng serve)
npm run build          # Compilación para producción
npm run watch          # Modo de observación con configuración de desarrollo
```

#### Pruebas y Calidad
```bash
npm test               # Ejecuta las pruebas con Jasmine/Karma
npm run lint           # Ejecuta ESLint en archivos TypeScript y HTML
```

#### Capacitor/Android
```bash
npx cap sync           # Sincroniza los assets web con las plataformas nativas
npx cap open android   # Abre Android Studio
npx cap run android    # Compila y ejecuta en un dispositivo/emulador Android
```

## Características del Juego

- **4 avatares de gatos**: Negro, Persa, Siamés y Atigrado, generados mediante código.
- **3 mundos temáticos**: Cada uno con diferentes peligros, plataformas y obstáculos.
- **Controles táctiles y de teclado**: Controles para dispositivos móviles y para teclado (flechas + barra espaciadora).
- **Sistema de vidas**: 3 vidas iniciales, con la posibilidad de ganar más al recolectar 10 monedas (máximo 5 vidas).
- **Coleccionables y peligros**: Monedas, águilas voladoras (peligros) y peligros terrestres (hongos/escorpiones/perros).
- **Obstáculos ambientales**: Palmeras, árboles y edificios según el mundo.
- **Portal de final de nivel**: Un portal al final de cada nivel para completarlo.
- **Sistema de reaparición**: Con un período de invulnerabilidad de 5 segundos.

## Arquitectura

La aplicación sigue una arquitectura de enrutamiento basada en páginas con carga diferida (lazy-loaded) de Ionic.

- **Punto de entrada**: `splash` page → `login`/`register` → `menu` → juego/características.
- **Flujo del juego**: `menu` → `world-select` → `avatar` → `gameplay` → `game-over`/`pause`.
- **Características adicionales**: `leaderboard`, `settings` accesibles desde el menú.

### Servicios Clave (Singleton, Root-Injected)

1.  **AuthService** (`src/app/services/auth.service.ts`): Gestiona la autenticación y el registro de usuarios.
2.  **StatsService** (`src/app/services/stats.service.ts`): Realiza un seguimiento de las estadísticas de los jugadores y los resultados de las partidas.
3.  **WorldService** (`src/app/services/world.service.ts`): Gestiona las configuraciones de los tres mundos.

### Integración con Phaser 3

La lógica principal del juego se encuentra en **GameplayPage** (`src/app/pages/gameplay/gameplay.page.ts`), dentro de la clase `CatPlatformerScene`.

- **Generación de niveles**: Plataformas generadas proceduralmente con niveles horizontales de 60000px.
- **Comunicación Angular-Phaser**: El componente de Angular controla la escena de Phaser a través de una referencia estática (`CatPlatformerScene.current`).

### Persistencia de Datos

Todos los datos se almacenan en el `localStorage` del navegador:
- Cuentas de usuario: `rm_users`, `rm_current_user`
- Estadísticas del juego: `rm_runs`, `rm_stats`
- Progresión del jugador: `runnerStats` (nivel, distancia total, monedas totales, partidas)

## Estilos

- Se utiliza SCSS para los estilos (`src/global.scss`, `src/theme/variables.scss`).
- Las variables de temas de Ionic se encuentran en `src/theme/variables.scss`.

## Tecnologías Utilizadas

- **Framework**: [Ionic](https://ionicframework.com/) con [Angular](https://angular.io/)
- **Motor de Juego**: [Phaser 3](https://phaser.io/)
- **Plataforma Nativa**: [Capacitor](https://capacitorjs.com/) para Android
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Pruebas**: [Jasmine](https://jasmine.github.io/) y [Karma](https://karma-runner.github.io/)

