export function loadScore(key: string): number {
  const value = Number(localStorage.getItem(`mini-games:${key}`));
  return Number.isFinite(value) ? value : 0;
}

export function saveScore(key: string, score: number): void {
  localStorage.setItem(`mini-games:${key}`, String(score));
}
