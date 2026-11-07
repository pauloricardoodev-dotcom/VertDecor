import { useCallback, useEffect, useRef, useState } from 'react';
import './Carousel.scss';

interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Carrossel leve: scroll-snap nativo + botões redondos + barra de progresso.
 * Arraste com mouse, deslize com o dedo, setas do teclado. Cada slide leva `data-slide`.
 */
export function Carousel({ label, children, className = '' }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });
  const [st, setSt] = useState({ prev: false, next: true, progress: 0 });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setSt({ prev: el.scrollLeft > 4, next: el.scrollLeft < max - 4, progress: max > 0 ? el.scrollLeft / max : 1 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => { el.removeEventListener('scroll', onScroll); ro.disconnect(); cancelAnimationFrame(raf); };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>('[data-slide]');
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = (slide?.offsetWidth ?? el.clientWidth * 0.8) + gap;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = track.current!;
    drag.current = { active: true, moved: false, x: e.clientX, left: el.scrollLeft };
    const move = (ev: PointerEvent) => {
      const d = drag.current;
      const dx = ev.clientX - d.x;
      if (!d.moved && Math.abs(dx) > 6) { d.moved = true; el.classList.add('is-dragging'); }
      if (d.moved) el.scrollLeft = d.left - dx;
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      el.classList.remove('is-dragging');
      drag.current.active = false;
      setTimeout(() => { drag.current.moved = false; }, 0);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div className={`carousel ${className}`}>
      <div
        ref={track}
        className="carousel__track"
        role="group"
        aria-roledescription="carrossel"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); } }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
        }}
      >
        {children}
      </div>
      <div className="carousel__bar">
        <span className="carousel__progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${Math.max(0.12, st.progress)})` }} />
        </span>
        <div className="carousel__buttons">
          <button type="button" onClick={() => go(-1)} disabled={!st.prev} aria-label="Anterior">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M12 4l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" onClick={() => go(1)} disabled={!st.next} aria-label="Próximo">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M8 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
