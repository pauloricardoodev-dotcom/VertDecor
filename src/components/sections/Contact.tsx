import { useEffect, useRef, useState } from 'react';
import { cta } from '../../data/content';
import { whatsappUrl } from '../../data/contact';
import { products } from '../../data/products';
import { useReveal } from '../../hooks/useReveal';

/**
 * Contato em formato "hero": formulário à esquerda, peça de mármore verde com a logo
 * estampada em dourado à direita. Ainda não há backend nem canal oficial: o envio é uma
 * demonstração (abre o WhatsApp quando o número existir em src/data/contact.ts).
 */
export function Contact() {
  const left = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      `Olá, Vert Decor! Meu nome é ${data.get('nome')}.`,
      data.get('interesse') ? `Tenho interesse em: ${data.get('interesse')}.` : '',
      data.get('mensagem') ? String(data.get('mensagem')) : '',
      `Contato: ${data.get('contato')}`,
    ].filter(Boolean).join('\n');
    const base = whatsappUrl();
    if (base) {
      window.open(`${base.split('?')[0]}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
    setSent(true);
  };

  return (
    <section id="contato" className="contact panel" aria-labelledby="contato-title">
      <div className="contact__left reveal" ref={left}>
        <p className="eyebrow-dark">07 — Contato</p>
        <h2 id="contato-title">Seu espaço conta uma história. <em>Escolha como ela será contada.</em></h2>
        <p className="contact__text">{cta.text}</p>

        {sent ? (
          <div className="contact__done" role="status">
            <h3>Obrigado pelo interesse!</h3>
            <p>{whatsappUrl() ? 'Abrimos o WhatsApp com a sua mensagem.' : cta.pending + ' Em breve a Vert Decor responderá por aqui.'}</p>
            <button type="button" className="contact__again" onClick={() => setSent(false)}>Enviar outra mensagem</button>
          </div>
        ) : (
          <form className="contact__form" onSubmit={onSubmit}>
            <label className="field">
              <span>Nome</span>
              <input name="nome" type="text" autoComplete="name" required placeholder="Como podemos te chamar?" />
            </label>
            <label className="field">
              <span>WhatsApp ou e-mail</span>
              <input name="contato" type="text" autoComplete="email" required placeholder="Seu melhor contato" />
            </label>
            <label className="field">
              <span>Peça de interesse</span>
              <select name="interesse" defaultValue="">
                <option value="">Ainda estou conhecendo</option>
                {products.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </label>
            <label className="field field--full">
              <span>Mensagem</span>
              <textarea name="mensagem" rows={4} placeholder="Conte um pouco sobre o seu ambiente" />
            </label>
            <button type="submit" className="btn-vert btn-vert--solid contact__submit"><span>{cta.button}</span></button>
          </form>
        )}
      </div>

      <div className="contact__right reveal" ref={right} style={{ '--d': 1 } as React.CSSProperties}>
        <Plaque />
      </div>
    </section>
  );
}

const MAX_TILT = 11; // graus: dá para "brincar", mas a placa nunca vira

/**
 * Placa de mármore verde com a logo em dourado. Inclina de leve com o mouse (hover) ou com o
 * dedo (arrastar na horizontal/vertical dentro da placa) e volta suavemente ao repouso.
 */
function Plaque() {
  const el = useRef<HTMLDivElement>(null);
  const state = useRef({ tx: 0, ty: 0, x: 0, y: 0, active: false, raf: 0 });

  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const st = state.current;

    const frame = () => {
      st.x += (st.tx - st.x) * 0.12;
      st.y += (st.ty - st.y) * 0.12;
      node.style.setProperty('--rx', `${(-st.y * MAX_TILT).toFixed(2)}deg`);
      node.style.setProperty('--ry', `${(st.x * MAX_TILT).toFixed(2)}deg`);
      node.style.setProperty('--gx', `${(50 + st.x * 45).toFixed(1)}%`);
      node.style.setProperty('--gy', `${(50 + st.y * 45).toFixed(1)}%`);
      node.style.setProperty('--px', `${(st.x * -10).toFixed(2)}px`);
      node.style.setProperty('--py', `${(st.y * -10).toFixed(2)}px`);
      const settled = !st.active && Math.abs(st.x) < 0.002 && Math.abs(st.y) < 0.002 && st.tx === 0 && st.ty === 0;
      st.raf = settled ? 0 : requestAnimationFrame(frame);
    };
    const kick = () => { if (!st.raf) st.raf = requestAnimationFrame(frame); };

    const aim = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      st.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      st.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      st.active = true;
      kick();
    };
    const release = () => { st.tx = 0; st.ty = 0; st.active = false; kick(); };

    const onMove = (e: PointerEvent) => { if (e.pointerType === 'mouse' || e.buttons) aim(e); };
    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerdown', aim);
    node.addEventListener('pointerleave', release);
    node.addEventListener('pointerup', release);
    node.addEventListener('pointercancel', release);
    return () => {
      cancelAnimationFrame(st.raf);
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerdown', aim);
      node.removeEventListener('pointerleave', release);
      node.removeEventListener('pointerup', release);
      node.removeEventListener('pointercancel', release);
    };
  }, []);

  return (
    <div className="plaque" ref={el}>
      <div className="plaque__body" role="img" aria-label="Logo Vert Decor estampada em dourado sobre uma placa de mármore verde">
        <span className="plaque__edge plaque__edge--2" />
        <span className="plaque__edge" />
        <div className="plaque__face">
          <span className="plaque__stone" />
          <span className="plaque__sheen" />
          <span className="plaque__logo plaque__logo--shadow" />
          <span className="plaque__logo" />
          <span className="plaque__glare" />
        </div>
      </div>
    </div>
  );
}
