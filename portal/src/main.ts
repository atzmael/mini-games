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

app.innerHTML = `
  <main class="portal-shell">
    <header class="portal-header">
      <p class="eyebrow">Mini Games</p>
      <h1>Des jeux courts, une mécanique forte.</h1>
      <p>${published.length} jeu${published.length > 1 ? 'x' : ''} publié${published.length > 1 ? 's' : ''}</p>
    </header>
    <section class="games-grid">
      ${published.length ? published.map((game) => `
        <article class="game-card">
          <div class="game-card__meta">
            <span>${game.renderer}</span>
            <span>${game.players} joueur${game.players > 1 ? 's' : ''}</span>
          </div>
          <h2>${game.title}</h2>
          <p>${game.description || 'Description à venir.'}</p>
          <div class="game-card__tags">${game.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
          <a href="${game.path}">Jouer</a>
        </article>
      `).join('') : '<p class="empty-state">Aucun jeu publié pour le moment.</p>'}
    </section>
  </main>
`;
