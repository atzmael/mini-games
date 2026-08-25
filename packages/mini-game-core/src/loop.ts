export function createGameLoop(update: (delta: number) => void) {
  let frame = 0;
  let previous = performance.now();

  const tick = (now: number) => {
    const delta = Math.min((now - previous) / 1000, 0.1);
    previous = now;
    update(delta);
    frame = requestAnimationFrame(tick);
  };

  return {
    start() {
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(frame);
    },
  };
}
