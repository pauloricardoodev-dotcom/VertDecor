import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import './Loader.scss';

/**
 * Tela de carregamento. A linha do tempo é 100% CSS (Loader.scss) para aparecer no primeiro
 * frame do HTML pré-renderizado e funcionar mesmo antes da hidratação. O React apenas
 * remove o elemento do DOM depois que a cortina termina de subir.
 */
export function Loader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 3200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__panel">
        <div className="loader__inner">
          <Logo variant="light" width={200} className="loader__logo" />
          <p className="loader__tagline">Design <span>•</span> Matéria <span>•</span> Personalidade</p>
          <span className="loader__bar" />
        </div>
      </div>
    </div>
  );
}
