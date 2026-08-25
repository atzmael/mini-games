export function setupFullscreen(
  target: HTMLElement,
  button: HTMLButtonElement,
) {
  if (typeof target.requestFullscreen !== 'function') {
    button.hidden = true;
    return () => {};
  }

  const sync = () => {
    const active = document.fullscreenElement === target;
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute(
      'aria-label',
      active ? 'Quitter le plein écran' : 'Passer en plein écran',
    );
    button.dataset.fullscreen = active ? 'exit' : 'enter';
  };

  const toggle = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (document.fullscreenElement === target) {
      await document.exitFullscreen();
    } else {
      await target.requestFullscreen();
    }
  };

  button.addEventListener('click', toggle);
  document.addEventListener('fullscreenchange', sync);
  sync();

  return () => {
    button.removeEventListener('click', toggle);
    document.removeEventListener('fullscreenchange', sync);
  };
}
