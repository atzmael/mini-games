import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(process.cwd(), '..');
const gamesDir = join(root, 'games');
const outputDir = join(process.cwd(), 'src', 'generated');
const outputFile = join(outputDir, 'games.json');

const games = [];

try {
  const entries = await readdir(gamesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      const raw = await readFile(join(gamesDir, entry.name, 'game.json'), 'utf8');
      const game = JSON.parse(raw);
      games.push({ ...game, path: `/games/${game.id}/` });
    } catch (error) {
      console.warn(`Skipping ${entry.name}: invalid or missing game.json`);
    }
  }
} catch {}

games.sort((a, b) => String(a.title).localeCompare(String(b.title), 'fr'));
await mkdir(outputDir, { recursive: true });
await writeFile(outputFile, JSON.stringify(games, null, 2) + '\n');
console.log(`Generated ${games.length} game entries.`);
