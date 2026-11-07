import { useEffect, useState } from 'react';
import './ThemeToggle.scss';

type Theme = 'light' | 'dark';
const KEY = 'vd-theme';

const read = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0C1713' : '#F7F5EF');
  try { localStorage.setItem(KEY, theme); } catch { /* modo privado */ }
}

/** Botão flutuante (canto inferior direito) para alternar entre tema claro e escuro. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  // o script em index.html já aplicou o tema salvo antes da pintura; aqui só sincroniza o estado
  useEffect(() => setTheme(read()), []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

    if (!doc.startViewTransition || reduce) {
      apply(next);
      setTheme(next);
      return;
    }
    // revelação circular a partir do botão (View Transitions API)
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = doc.startViewTransition(() => { apply(next); setTheme(next); });
    t.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => {});
  };

  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className={`theme-toggle${dark ? ' is-dark' : ''}`}
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      title={dark ? 'Tema claro' : 'Tema escuro'}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="theme-toggle__icon">
        <g className="theme-toggle__sun" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
        </g>
        <path className="theme-toggle__moon" d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
