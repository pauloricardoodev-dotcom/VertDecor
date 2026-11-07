/**
 * Fundo do Hero (decorativo, aria-hidden). Camadas só com CSS/SVG e animações de
 * transform/opacity/stroke — sem filtros pesados e sem JS:
 *  1. brilhos orgânicos (verde e champagne) à deriva
 *  2. veios de mármore que se desenham na entrada
 *  3. grão fino de papel/pedra
 */
export function HeroBackdrop() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <span className="hero-bg__glow hero-bg__glow--green" />
      <span className="hero-bg__glow hero-bg__glow--gold" />

      <svg className="hero-bg__veins" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" focusable="false">
        <path pathLength="1" style={{ '--n': 0 } as React.CSSProperties}
          d="M-20 640C180 560 260 700 430 610S690 420 820 470 1030 640 1230 540" />
        <path pathLength="1" style={{ '--n': 1 } as React.CSSProperties}
          d="M380 -20C430 120 360 220 470 330S640 380 700 520 760 700 840 830" />
        <path pathLength="1" style={{ '--n': 2 } as React.CSSProperties}
          d="M700 -20C740 90 880 120 930 230S1000 400 1130 430 1190 520 1230 560" />
        <path pathLength="1" className="is-thin" style={{ '--n': 3 } as React.CSSProperties}
          d="M-20 220C120 250 190 160 300 190S420 300 520 270" />
      </svg>
    </div>
  );
}

/** Anéis e satélite ao redor da mesa (dentro do palco). */
export function HeroHalo() {
  return (
    <div className="hero-halo" aria-hidden="true">
      <span className="hero-halo__pulse" style={{ '--n': 0 } as React.CSSProperties} />
      <span className="hero-halo__pulse" style={{ '--n': 1 } as React.CSSProperties} />
      <span className="hero-halo__pulse" style={{ '--n': 2 } as React.CSSProperties} />
      <span className="hero-halo__orbit"><i /></span>
    </div>
  );
}
