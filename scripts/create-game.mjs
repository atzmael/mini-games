import { cp, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(process.cwd());
const templateDir = join(root, 'template-game');
const gamesDir = join(root, 'games');

const rawName = process.argv[2];
if (!rawName) {
  console.error('Usage: pnpm new <game-name>');
  process.exit(1);
}

const id = rawName
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!id) {
  console.error('Invalid game name.');
  process.exit(1);
}

const title = rawName
  .trim()
  .replace(/[-_]+/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const targetDir = join(gamesDir, id);

try {
  await stat(targetDir);
  console.error(`Game already exists: games/${id}`);
  process.exit(1);
} catch {}

await mkdir(gamesDir, { recursive: true });
await cp(templateDir, targetDir, { recursive: true });

async function replaceTokens(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await replaceTokens(path);
      continue;
    }

    const content = await readFile(path, 'utf8');
    const next = content
      .replaceAll('__GAME_ID__', id)
      .replaceAll('__GAME_TITLE__', title);
    await writeFile(path, next);
  }
}

await replaceTokens(targetDir);
console.log(`Created games/${id}`);
console.log(`Next: pnpm install && pnpm --filter @mini-games/${id} dev`);
