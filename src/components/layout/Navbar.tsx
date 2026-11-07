import { useCallback, useEffect, useMemo, useState } from 'react';
import { navigation } from '../../data/navigation';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useScrolled } from '../../hooks/useScrolled';
import { Logo } from '../ui/Logo';
import { MobileMenu } from './MobileMenu';
import { scrollToHash } from '../../lib/scroll';
import './Navbar.scss';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const ids = useMemo(() => navigation.map((n) => n.id), []);
  const active = useScrollSpy(ids);

  // Menu aberto: trava o scroll e torna o restante da página inerte (foco fica no header)
  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    document.getElementById('main')?.toggleAttribute('inert', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Fecha o menu mobile se a tela crescer para desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleNavigate = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToHash(href));
  }, []);

  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#home" onClick={(e) => handleNavigate(e, '#home')}>
          <Logo variant={open ? 'light' : 'color'} width={150} />
        </a>

        <nav className="site-nav__desktop" aria-label="Navegação principal">
          <ul>
            {navigation.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
                <a
                  href={item.href}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={(e) => handleNavigate(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="site-nav__toggle-label" aria-hidden="true">{open ? 'Fechar' : 'Menu'}</span>
          <span className="site-nav__toggle-icon" aria-hidden="true"><span /><span /></span>
        </button>
      </div>

      <MobileMenu open={open} active={active} onNavigate={handleNavigate} />
    </header>
  );
}
