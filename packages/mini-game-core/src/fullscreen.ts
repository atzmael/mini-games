export function setupFullscreen(
  target: HTMLElement,
  button: HTMLButtonElement,
) {
  let fallbackActive = false;

  const sync = () => {
    const nativeActive = document.fullscreenElement === target;
    const active = nativeActive || fallbackActive;
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute(
      'aria-label',
      active ? 'Quitter le plein écran' : 'Passer en plein écran',
    );
    button.dataset.fullscreen = active ? 'exit' : 'enter';
  };

  const enterFallback = () => {
    fallbackActive = true;
    target.classList.add('is-fallback-fullscreen');
    document.documentElement.classList.add('game-fullscreen-active');
    document.body.classList.add('game-fullscreen-active');
    sync();
  };

  const exitFallback = () => {
    fallbackActive = false;
    target.classList.remove('is-fallback-fullscreen');
    document.documentElement.classList.remove('game-fullscreen-active');
    document.body.classList.remove('game-fullscreen-active');
    sync();
  };

  const toggle = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (fallbackActive) {
      exitFallback();
      return;
    }

    if (document.fullscreenElement === target) {
      await document.exitFullscreen();
      return;
    }

    try {
      if (typeof target.requestFullscreen === 'function') {
        await target.requestFullscreen();
      } else {
        enterFallback();
      }
    } catch {
      enterFallback();
    }
  };

  button.hidden = false;
  button.addEventListener('click', toggle);
  document.addEventListener('fullscreenchange', sync);
  sync();

  return () => {
    if (fallbackActive) exitFallback();
    button.removeEventListener('click', toggle);
    document.removeEventListener('fullscreenchange', sync);
  };
}
