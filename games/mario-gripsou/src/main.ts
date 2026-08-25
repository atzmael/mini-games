import './style.css';
import { createGameLoop, loadScore, saveScore } from '@mini-games/core';

function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing DOM element: ${selector}`);
  return element;
}

const canvas = getRequiredElement<HTMLCanvasElement>('#game');
const scoreEl = getRequiredElement<HTMLElement>('#score');
const bestEl = getRequiredElement<HTMLElement>('#best');
const context = canvas.getContext('2d');
if (!context) throw new Error('Canvas 2D unavailable');
const ctx: CanvasRenderingContext2D = context;

const width = 420;
const height = 640;
canvas.width = width;
canvas.height = height;

const groundY = 560;
const player = { x: 185, y: groundY - 48, w: 50, h: 48, vy: 0 };
const block = { x: 160, y: 260, w: 100, h: 70 };
let coin = { x: 200, y: 220, r: 14, vy: 0, active: false };
let score = 0;
let best = loadScore('mario-gripsou-best');
let hitCooldown = 0;

bestEl.textContent = String(best);

function jump() {
  if (player.y >= groundY - player.h - 0.5) {
    player.vy = -720;
  }
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    event.preventDefault();
    jump();
  }
});
canvas.addEventListener('pointerdown', jump);

function spawnCoin() {
  coin = { x: block.x + block.w / 2, y: block.y - 8, r: 14, vy: -360, active: true };
  score += 1;
  scoreEl.textContent = String(score);
  if (score > best) {
    best = score;
    bestEl.textContent = String(best);
    saveScore('mario-gripsou-best', best);
  }
}

function update(delta: number) {
  hitCooldown = Math.max(0, hitCooldown - delta);

  player.vy += 1900 * delta;
  const previousY = player.y;
  player.y += player.vy * delta;

  const headBefore = previousY;
  const headNow = player.y;
  const overlapsBlockX = player.x + player.w > block.x && player.x < block.x + block.w;
  const crossedBlockBottom = headBefore >= block.y + block.h && headNow <= block.y + block.h;

  if (player.vy < 0 && overlapsBlockX && crossedBlockBottom) {
    player.y = block.y + block.h;
    player.vy = 120;
    if (hitCooldown <= 0) {
      spawnCoin();
      hitCooldown = 0.12;
    }
  }

  if (player.y + player.h >= groundY) {
    player.y = groundY - player.h;
    player.vy = 0;
  }

  if (coin.active) {
    coin.vy += 1200 * delta;
    coin.y += coin.vy * delta;
    if (coin.y > block.y + 10) coin.active = false;
  }

  draw();
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#8fd3ff');
  sky.addColorStop(1, '#eaf8ff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#6fcf5b';
  ctx.fillRect(0, groundY, width, height - groundY);

  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(block.x, block.y, block.w, block.h);
  ctx.strokeStyle = '#5d3a1c';
  ctx.lineWidth = 4;
  ctx.strokeRect(block.x, block.y, block.w, block.h);
  ctx.fillStyle = '#f3d47a';
  ctx.font = 'bold 42px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText('$', block.x + block.w / 2, block.y + 48);

  if (coin.active) {
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd84d';
    ctx.fill();
    ctx.strokeStyle = '#b88600';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  ctx.fillStyle = '#25324a';
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = '#f1c27d';
  ctx.fillRect(player.x + 12, player.y + 8, 26, 18);
  ctx.fillStyle = '#b22222';
  ctx.fillRect(player.x + 8, player.y, 34, 10);
}

createGameLoop(update).start();
