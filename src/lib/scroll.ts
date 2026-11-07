/** Rola até a âncora respeitando reduced-motion e atualiza o hash sem salto. */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', hash);
  // Move o foco para a seção (acessibilidade) sem rolar de novo
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}
