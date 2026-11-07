import { useRef } from 'react';
import { contact } from '../../data/contact';
import { navigation } from '../../data/navigation';
import { useNear } from '../../hooks/useNear';
import { scrollToHash } from '../../lib/scroll';
import { Logo } from '../ui/Logo';
import './Footer.scss';

/**
 * Rodapé como uma laje de mármore verde (largura total): veios dourados que se desenham ao entrar na tela,
 * brilho de polimento e uma luz champagne que segue o cursor.
 * Texturas só são pedidas quando o rodapé se aproxima (não disputam banda com o LCP).
 */
export function Footer() {
  const [ref, near] = useNear<HTMLElement>('250px 0px');
  const raf = useRef(0);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(href);
  };

  // luz do cursor: só mouse; atualiza variáveis CSS (sem re-render do React)
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - r.left}px`);
      el.style.setProperty('--my', `${clientY - r.top}px`);
    });
  };

  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : null;
  const ig = contact.instagram ? `https://instagram.com/${contact.instagram.replace('@', '')}` : null;

  return (
    <footer
      ref={ref}
      className={`site-footer${near ? ' is-in' : ''}`}
      onPointerMove={onMove}
    >
      <span className="site-footer__stone" aria-hidden="true" />
      <svg className="site-footer__veins" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <path pathLength="1" style={{ '--n': 0 } as React.CSSProperties} d="M-20 420C160 360 240 470 420 400S700 250 860 310 1080 450 1220 380" />
        <path pathLength="1" style={{ '--n': 1 } as React.CSSProperties} d="M300 -20C340 90 280 170 380 250S560 300 600 420 660 560 720 620" />
        <path pathLength="1" style={{ '--n': 2 } as React.CSSProperties} d="M820 -20C860 80 980 100 1020 190S1090 330 1220 360" />
        <path pathLength="1" className="is-thin" style={{ '--n': 3 } as React.CSSProperties} d="M-20 120C100 150 170 90 260 120S400 210 480 180" />
      </svg>
      <span className="site-footer__sheen" aria-hidden="true" />
      <span className="site-footer__glow" aria-hidden="true" />

      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Logo variant="light" width={170} />
          <p>Mesas de pedra, estruturas de ferro e peças de design para ambientes com personalidade.</p>
        </div>
        <nav aria-label="Rodapé">
          <h2>Navegação</h2>
          <ul>
            {navigation.map((n) => (
              <li key={n.id}><a href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>Contato</h2>
          <ul>
            <li>{wa ? <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a> : <span>WhatsApp — em breve</span>}</li>
            <li>{ig ? <a href={ig} target="_blank" rel="noopener noreferrer">Instagram</a> : <span>Instagram — em breve</span>}</li>
            <li>{contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <span>E-mail — em breve</span>}</li>
          </ul>
        </div>
      </div>

      <p className="site-footer__legal">© {new Date().getFullYear()} Vert Decor. Todos os direitos reservados.</p>
    </footer>
  );
}
