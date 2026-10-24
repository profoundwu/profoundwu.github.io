/* A single sliding highlight follows the hovered outline entry. */
(() => {
  const panel = document.getElementById('toc-popup-content');
  const dialog = document.getElementById('toc-popup');
  if (!panel || !dialog) return;

  let glow;
  let current;

  function highlight(link) {
    if (!link || !panel.contains(link)) return;
    if (!glow?.isConnected) {
      glow = document.createElement('div');
      glow.className = 'bo-toc-glow';
      glow.setAttribute('aria-hidden', 'true');
      panel.append(glow);
    }
    if (current !== link) {
      current?.classList.remove('bo-toc-hover');
      current = link;
      current.classList.add('bo-toc-hover');
    }
    const item = link.getBoundingClientRect();
    const container = panel.getBoundingClientRect();
    const left = Math.max(8, item.left - container.left + panel.scrollLeft - 4);
    glow.style.width = `${Math.min(item.width + 8, panel.clientWidth - left - 8)}px`;
    glow.style.height = `${item.height}px`;
    glow.style.transform = `translate3d(${left}px, ${item.top - container.top + panel.scrollTop}px, 0)`;
    glow.classList.add('is-visible');
  }

  function clear() {
    glow?.classList.remove('is-visible');
    current?.classList.remove('bo-toc-hover');
    current = null;
  }

  panel.addEventListener('pointerover', (event) => {
    if (event.pointerType !== 'touch') highlight(event.target.closest('a.toc-link'));
  });
  panel.addEventListener('pointerleave', clear);
  panel.addEventListener('focusin', (event) => highlight(event.target.closest('a.toc-link')));
  panel.addEventListener('focusout', (event) => {
    if (!panel.contains(event.relatedTarget)) clear();
  });
  dialog.addEventListener('close', clear);
  new ResizeObserver(() => {
    if (current?.isConnected && dialog.open) highlight(current);
  }).observe(panel);
})();
