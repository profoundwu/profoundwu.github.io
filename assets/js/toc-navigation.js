/* Close the mobile outline before following a chapter link, without motion. */
(() => {
  const panel = document.getElementById('toc-popup-content');
  const dialog = document.getElementById('toc-popup');
  if (!panel || !dialog) return;

  panel.addEventListener('click', (event) => {
    const link = event.target.closest('a.toc-link');
    if (!link || !dialog.open || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    // Skip the theme's delayed close while keeping native fragment navigation.
    event.stopPropagation();
    const root = document.documentElement;
    const behavior = root.style.getPropertyValue('scroll-behavior');
    const priority = root.style.getPropertyPriority('scroll-behavior');
    root.style.setProperty('scroll-behavior', 'auto', 'important');
    root.classList.remove('overflow-hidden');
    document.body.classList.remove('overflow-hidden');
    dialog.removeAttribute('closing');
    dialog.close();

    // The link's default action runs before the next animation frame.
    requestAnimationFrame(() => {
      if (behavior) root.style.setProperty('scroll-behavior', behavior, priority);
      else root.style.removeProperty('scroll-behavior');
    });
  }, { capture: true });
})();
