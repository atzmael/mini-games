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
const player = { x: 185, y: groundY - 52, w: 50, h: 52, vy: 0 };
const block = { x: 155, y: 275, w: 110, h: 68, bump: 0 };
type Coin = { x: number; y: number; r: number; vy: number; life: number; spin: number };
const coins: Coin[] = [];
let score = 0;
let best = loadScore('mario-gripsou-best');
let hitCooldown = 0;
let squash = 0;

bestEl.textContent = String(best);

function jump() {
  const onGround = player.y >= groundY - player.h - 0.5;
  if (onGround) {
    // Enough impulse to reach the block bottom at y=343 with margin.
    player.vy = -960;
    squash = 1;
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
  coins.push({
    x: block.x + block.w / 2,
    y: block.y - 4,
    r: 14,
    vy: -430,
    life: 0.8,
    spin: 0,
  });

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
  block.bump = Math.max(0, block.bump - delta * 7);
  squash = Math.max(0, squash - delta * 7);

  player.vy += 2000 * delta;
  const previousY = player.y;
  player.y += player.vy * delta;

  const headBefore = previousY;
  const headNow = player.y;
  const blockBottom = block.y + block.h;
  const overlapsBlockX = player.x + player.w > block.x && player.x < block.x + block.w;
  const crossedBlockBottom = headBefore >= blockBottom && headNow <= blockBottom;

  if (player.vy < 0 && overlapsBlockX && crossedBlockBottom) {
    player.y = blockBottom;
    player.vy = 165;
    if (hitCooldown <= 0) {
      spawnCoin();
      hitCooldown = 0.12;
      block.bump = 1;
    }
  }

  if (player.y + player.h >= groundY) {
    player.y = groundY - player.h;
    player.vy = 0;
  }

  for (let index = coins.length - 1; index >= 0; index -= 1) {
    const coin = coins[index];
    coin.vy += 1150 * delta;
    coin.y += coin.vy * delta;
    coin.life -= delta;
    coin.spin += delta * 12;
    if (coin.life <= 0) coins.splice(index, 1);
  }

  draw();
}

function roundedRect(x: number, y: number, w: number, h: number, radius: number, fill: string) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawCloud(x: number, y: number, scale: number, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 18 * scale, 0, Math.PI * 2);
  ctx.arc(x + 20 * scale, y - 10 * scale, 23 * scale, 0, Math.PI * 2);
  ctx.arc(x + 45 * scale, y, 17 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x - 2 * scale, y, 50 * scale, 16 * scale);
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#4a9ff2');
  sky.addColorStop(0.72, '#9bd8ff');
  sky.addColorStop(1, '#d8f1ff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  drawCloud(52, 120, 0.95, 0.92);
  drawCloud(310, 165, 0.72, 0.78);

  ctx.fillStyle = '#63b96a';
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(82, 455);
  ctx.lineTo(155, groundY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#54a75f';
  ctx.beginPath();
  ctx.moveTo(230, groundY);
  ctx.lineTo(330, 430);
  ctx.lineTo(420, groundY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#50b65d';
  ctx.fillRect(0, groundY, width, 16);
  ctx.fillStyle = '#81552f';
  ctx.fillRect(0, groundY + 16, width, height - groundY - 16);
  ctx.strokeStyle = 'rgba(52, 31, 18, .28)';
  ctx.lineWidth = 2;
  for (let x = 0; x < width; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, groundY + 16);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = groundY + 42; y < height; y += 26) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const bumpOffset = Math.sin(block.bump * Math.PI) * 10;
  const blockY = block.y - bumpOffset;
  roundedRect(block.x, blockY, block.w, block.h, 7, '#c8782c');
  ctx.strokeStyle = '#704018';
  ctx.lineWidth = 4;
  ctx.strokeRect(block.x + 2, blockY + 2, block.w - 4, block.h - 4);
  ctx.fillStyle = '#f6d776';
  ctx.font = '900 42px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('$', block.x + block.w / 2, blockY + block.h / 2 + 1);

  for (const coin of coins) {
    const widthScale = Math.max(0.25, Math.abs(Math.cos(coin.spin)));
    ctx.save();
    ctx.translate(coin.x, coin.y);
    ctx.scale(widthScale, 1);
    ctx.beginPath();
    ctx.arc(0, 0, coin.r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd84d';
    ctx.fill();
    ctx.strokeStyle = '#a96a00';
    ctx.lineWidth = 3 / widthScale;
    ctx.stroke();
    ctx.restore();
  }

  const playerScaleY = player.vy === 0 ? 1 - squash * 0.08 : 1;
  const playerScaleX = player.vy === 0 ? 1 + squash * 0.08 : 1;
  ctx.save();
  ctx.translate(player.x + player.w / 2, player.y + player.h);
  ctx.scale(playerScaleX, playerScaleY);
  ctx.translate(-(player.x + player.w / 2), -(player.y + player.h));

  roundedRect(player.x + 5, player.y + 16, player.w - 10, player.h - 16, 7, '#283756');
  roundedRect(player.x + 10, player.y + 6, player.w - 20, 24, 7, '#efc08b');
  roundedRect(player.x + 5, player.y, player.w - 10, 10, 5, '#b52f42');
  ctx.fillStyle = '#101827';
  ctx.fillRect(player.x + 29, player.y + 14, 4, 4);
  ctx.fillStyle = '#b52f42';
  ctx.fillRect(player.x + 3, player.y + 27, 8, 14);
  ctx.fillRect(player.x + player.w - 11, player.y + 27, 8, 14);
  ctx.restore();

  ctx.fillStyle = 'rgba(8, 15, 30, .22)';
  ctx.beginPath();
  ctx.ellipse(player.x + player.w / 2, groundY + 3, 28, 6, 0, 0, Math.PI * 2);
  ctx.fill();
}

createGameLoop(update).start();
