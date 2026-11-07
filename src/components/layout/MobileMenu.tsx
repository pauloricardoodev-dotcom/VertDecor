import { useEffect, useRef } from 'react';
import { navigation } from '../../data/navigation';

interface Props {
  open: boolean;
  active: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({ open, active, onNavigate }: Props) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) firstLink.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} inert={!open}>
      <nav aria-label="Navegação principal (mobile)">
        <ol className="mobile-menu__list">
          {navigation.map((item, i) => (
            <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
              <a
                ref={i === 0 ? firstLink : undefined}
                href={item.href}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={(e) => onNavigate(e, item.href)}
              >
                <span className="mobile-menu__index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="mobile-menu__label">{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="mobile-menu__footer">
        <p>Vert Collection — Nº 001</p>
        <p>Design que encontra a natureza.</p>
      </div>
    </div>
  );
}
