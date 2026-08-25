import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) throw new Error('Missing #app root');

app.innerHTML = `
  <main class="game-shell">
    <header class="game-header">
      <h1>__GAME_TITLE__</h1>
      <p>Renderer à définir dans ce chat : DOM, Canvas, Phaser, Three.js, D3.js…</p>
    </header>
    <section id="game-root" class="game-root" aria-label="Zone de jeu"></section>
  </main>
`;
