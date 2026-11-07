import { useEffect, useState } from 'react';
import { scrollToHash } from '../../../lib/scroll';
import { HeroBackdrop, HeroHalo } from './HeroBackdrop';
import { HeroStage } from './HeroStage';
import { MaterialSelector } from './MaterialSelector';
import './Hero.scss';

const DEFAULT_LIGHT = 'verde';
const DEFAULT_DARK = 'calacatta';
const TITLE_LINES = ['A natureza encontra', 'sua forma', 'mais elegante.'];

export function Hero() {
  // padrão por tema: claro = mármore verde, escuro = mármore branco (a pessoa ainda pode escolher outra pedra)
  const [materialId, setMaterialId] = useState(DEFAULT_LIGHT);

  useEffect(() => {
    const byTheme = (t: string) => (t === 'dark' ? DEFAULT_DARK : DEFAULT_LIGHT);
    setMaterialId(byTheme(document.documentElement.dataset.theme ?? 'light'));
    const onTheme = (e: Event) => setMaterialId(byTheme((e as CustomEvent<string>).detail));
    window.addEventListener('vd-theme', onTheme);
    return () => window.removeEventListener('vd-theme', onTheme);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToHash(e.currentTarget.getAttribute('href')!);
  };

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="hero__grid">
        <div className="hero__head">
          <p className="hero__eyebrow">
            Design <span aria-hidden="true">•</span> Matéria <span aria-hidden="true">•</span> Personalidade
          </p>
          <h1 id="hero-title" className="hero__title">
            {TITLE_LINES.map((line, i) => (
              <span key={line} className="hero__title-line" style={{ '--i': i } as React.CSSProperties}>
                <span>{i === TITLE_LINES.length - 1 ? <em>{line}</em> : line}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="hero__stage">
          <div className="hero__stage-meta" aria-hidden="true">
            <span>Vert Collection — Nº 001</span>
            <span>Mesa lateral</span>
          </div>
          <div className="hero__viewport">
            <HeroHalo />
            <HeroStage materialId={materialId} />
          </div>
          <MaterialSelector value={materialId} onChange={setMaterialId} />
        </div>

        <div className="hero__body">
          <p className="hero__lead">
            Peças que transformam ambientes através da beleza dos materiais naturais e da sofisticação do design.
          </p>
          <div className="hero__ctas">
            <a className="btn-vert btn-vert--solid" href="#colecao" onClick={go}>
              <span>Explore nossa coleção</span>
            </a>
            <a className="btn-vert btn-vert--line" href="#sobre" onClick={go}>
              <span>Conheça a Vert Decor</span>
            </a>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#manifesto" onClick={go}>
        <span>Role para descobrir</span>
      </a>
    </section>
  );
}
