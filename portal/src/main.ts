import './style.css';
import games from './generated/games.json';

type Game = {
  id: string;
  title: string;
  description: string;
  renderer: string;
  tags: string[];
  players: number;
  mobile: boolean;
  status: string;
  path: string;
};

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app root');

const published = (games as Game[]).filter((game) => game.status === 'published');
const baseUrl = import.meta.env.BASE_URL;

const gameCards = published.map((game) => `
  <article class="game-card">
    <a class="game-preview" href="${baseUrl}${game.path}" aria-label="Jouer à ${game.title}">
      <div class="preview-sky">
        <span class="cloud cloud--one"></span>
        <span class="cloud cloud--two"></span>
        <span class="preview-block">$</span>
        <span class="preview-coin"></span>
        <span class="preview-player"></span>
        <span class="preview-ground"></span>
      </div>
      <span class="new-badge">Nouveau</span>
    </a>
    <div class="game-card__body">
      <div class="game-card__topline">
        <span class="game-type">${game.renderer}</span>
        <span>${game.players} joueur${game.players > 1 ? 's' : ''}</span>
      </div>
      <h3>${game.title}</h3>
      <p>${game.description || 'Description à venir.'}</p>
      <div class="game-card__footer">
        <div class="game-card__tags">${game.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
        <a class="play-button" href="${baseUrl}${game.path}">Jouer <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </article>
`).join('');

app.innerHTML = `
  <div class="site-shell">
    <header class="topbar">
      <a class="brand" href="${baseUrl}">
        <span class="brand-mark" aria-hidden="true">✦</span>
        <span>Mini <strong>Games</strong></span>
      </a>
      <nav aria-label="Navigation principale">
        <a class="active" href="#accueil">Accueil</a>
        <a href="#jeux">Jeux</a>
        <a href="https://github.com/atzmael/mini-games">GitHub</a>
      </nav>
    </header>

    <main>
      <section class="hero" id="accueil">
        <div class="hero-orb hero-orb--one"></div>
        <div class="hero-orb hero-orb--two"></div>
        <div class="hero-grid"></div>
        <div class="hero-content">
          <p class="eyebrow">Mini Games</p>
          <h1>Petits jeux,<br><span>grands moments.</span></h1>
          <p class="hero-copy">Une collection de mini-jeux web courts, légers et centrés sur une mécanique simple.</p>
          <a class="primary-cta" href="#jeux">Découvrir les jeux <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section class="games-section" id="jeux">
        <div class="section-heading">
          <div>
            <p class="section-kicker">Collection</p>
            <h2>Jeux disponibles</h2>
            <p>Choisis un jeu et joue directement dans ton navigateur.</p>
          </div>
          <span class="count-pill">${published.length} jeu${published.length > 1 ? 'x' : ''}</span>
        </div>

        <div class="games-grid">
          ${published.length ? gameCards : '<p class="empty-state">Aucun jeu publié pour le moment.</p>'}
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>Mini Games</span>
      <span>Des expériences courtes, sans installation.</span>
    </footer>
  </div>
`;
