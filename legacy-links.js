// Preserve recognizable links to sections of the former root VIP page.
(() => {
  const sections = new Set(['home', 'about', 'research', 'team', 'news', 'contact']);
  function routeLegacyLink() {
    if (sections.has(window.location.hash.slice(1))) {
      const destination = new URL('VIP/', window.location.href);
      destination.hash = window.location.hash;
      window.location.replace(destination.href);
    }
  }
  routeLegacyLink();
  window.addEventListener('hashchange', routeLegacyLink);
})();
