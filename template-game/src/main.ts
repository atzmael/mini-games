import './style.css';
import { setupFullscreen } from '@mini-games/core';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app root');

app.innerHTML = `
  <main class="game-shell">
    <header class="game-header">
      <div>
        <p class="game-eyebrow">Mini Games</p>
        <h1>__GAME_TITLE__</h1>
      </div>
      <p>Renderer à définir dans ce chat : DOM, Canvas, Phaser, Three.js, D3.js…</p>
    </header>

    <section class="game-stage" aria-label="Zone de jeu">
      <div id="game-surface" class="game-surface">
        <section id="game-root" class="game-root"></section>
        <div id="game-hud" class="game-hud" aria-live="polite"></div>
        <button
          id="fullscreen-toggle"
          class="game-fullscreen"
          type="button"
          aria-label="Passer en plein écran"
          aria-pressed="false"
          title="Plein écran"
        >
          <span aria-hidden="true">⛶</span>
        </button>
      </div>
    </section>
  </main>
`;

const surface = document.querySelector<HTMLElement>('#game-surface');
const fullscreenButton = document.querySelector<HTMLButtonElement>('#fullscreen-toggle');
if (!surface || !fullscreenButton) throw new Error('Missing game surface');

setupFullscreen(surface, fullscreenButton);
