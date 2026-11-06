(() => {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#vip-menu');
  const narrow = window.matchMedia('(max-width: 800px)');
  function closeMenu(returnFocus = false) {
    button.setAttribute('aria-expanded', 'false');
    menu.hidden = narrow.matches;
    if (returnFocus) button.focus();
  }
  function syncMenu() {
    button.hidden = !narrow.matches;
    closeMenu();
  }
  syncMenu();
  narrow.addEventListener('change', syncMenu);
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  const former = document.querySelector('#former-members');
  function revealFormer() {
    if (location.hash === '#former-members') former.open = true;
  }
  revealFormer();
  window.addEventListener('hashchange', revealFormer);
  const dialog = document.querySelector('.photo-dialog');
  const photo = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  let trigger;
  document.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('click', event => {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      trigger = link;
      photo.src = link.getAttribute('href');
      photo.alt = link.dataset.caption;
      caption.textContent = link.dataset.caption;
      dialog.showModal();
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { if (trigger) trigger.focus(); });
})();
