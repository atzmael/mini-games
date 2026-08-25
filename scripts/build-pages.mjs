import { cp, mkdir, rm, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(process.cwd());
const outDir = join(root, 'dist-pages');
const gamesDir = join(root, 'games');

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

execFileSync('pnpm', ['--dir', 'portal', 'build'], { stdio: 'inherit' });
await cp(join(root, 'portal', 'dist'), outDir, { recursive: true });

const entries = await readdir(gamesDir, { withFileTypes: true });
for (const entry of entries) {
  if (!entry.isDirectory()) continue;

  const packageDir = join(gamesDir, entry.name);
  try {
    execFileSync('pnpm', ['--dir', packageDir, 'build'], { stdio: 'inherit' });
  } catch {
    process.exitCode = 1;
    throw new Error(`Build failed for ${entry.name}`);
  }

  const target = join(outDir, 'games', entry.name);
  await mkdir(target, { recursive: true });
  await cp(join(packageDir, 'dist'), target, { recursive: true });
}

console.log(`GitHub Pages bundle ready in ${outDir}`);
