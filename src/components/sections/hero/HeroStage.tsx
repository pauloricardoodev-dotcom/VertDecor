import { lazy, Suspense, useEffect, useState } from 'react';
import { materials } from '../../../data/materials';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { getDeviceTier, onIdle, prefersSaveData, supportsWebGL, type DeviceTier } from '../../../lib/device';

// Three.js fica em um chunk separado e só é baixado depois da primeira interação
const TableScene = lazy(() => import('../../three/TableScene'));

// Mesmo valor do preload em index.html
const POSTER_SIZES = '(min-width: 992px) min(56vw, calc(100svh - 8.5rem)), (min-width: 768px) 34rem, calc(100vw - 2.5rem)';

const INTERACTION_EVENTS = ['pointerdown', 'pointermove', 'touchstart', 'keydown', 'wheel', 'scroll'] as const;

interface Props {
  materialId: string;
}

/**
 * Palco do Hero. Estratégia de performance (docs/03-performance.md):
 * 1. Poster estático (render da própria mesa) é o LCP e aparece imediatamente.
 * 2. O 3D é carregado na primeira interação do visitante, em ocioso.
 * 3. Sem WebGL ou com economia de dados, o poster permanece e troca de pedra.
 */
export function HeroStage({ materialId }: Props) {
  const reducedMotion = useReducedMotion();
  const [load3d, setLoad3d] = useState(false);
  const [ready3d, setReady3d] = useState(false);
  const [tier, setTier] = useState<DeviceTier>('low');
  // posters já exibidos ficam montados para permitir o crossfade
  const [seen, setSeen] = useState<string[]>([materialId]);

  useEffect(() => {
    if (ready3d) return; // com o 3D ativo os posters não são mais necessários
    setSeen((s) => (s.includes(materialId) ? s : [...s, materialId]));
  }, [materialId, ready3d]);

  useEffect(() => {
    if (!supportsWebGL() || prefersSaveData()) return;
    setTier(getDeviceTier());
    let cancelIdle: (() => void) | undefined;
    const start = () => {
      INTERACTION_EVENTS.forEach((ev) => window.removeEventListener(ev, start));
      cancelIdle = onIdle(() => setLoad3d(true), 1500);
    };
    INTERACTION_EVENTS.forEach((ev) => window.addEventListener(ev, start, { passive: true, once: true }));
    return () => {
      INTERACTION_EVENTS.forEach((ev) => window.removeEventListener(ev, start));
      cancelIdle?.();
    };
  }, []);

  return (
    <div className={`hero-stage${ready3d ? ' is-3d' : ''}`}>
      <div className="hero-stage__posters">
        {materials.map((m, i) =>
          seen.includes(m.id) ? (
            <picture key={m.id} className={m.id === materialId ? 'is-active' : undefined}>
              <source
                type="image/avif"
                srcSet={`${m.poster}-720.avif 720w, ${m.poster}-1200.avif 1200w`}
                sizes={POSTER_SIZES}
              />
              <img
                src={`${m.poster}-720.webp`}
                srcSet={`${m.poster}-720.webp 720w, ${m.poster}-1200.webp 1200w`}
                sizes={POSTER_SIZES}
                width={1200}
                height={1200}
                alt={m.id === materialId ? `Mesa lateral de tampo circular em ${m.name}` : ''}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding={i === 0 ? 'sync' : 'async'}
              />
            </picture>
          ) : null,
        )}
      </div>

      {load3d && (
        <Suspense fallback={null}>
          <div className="hero-stage__canvas">
            <TableScene
              materialId={materialId}
              tier={tier}
              reducedMotion={reducedMotion}
              onReady={() => setReady3d(true)}
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}
