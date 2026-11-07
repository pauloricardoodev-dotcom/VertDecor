interface LogoProps {
  variant?: 'color' | 'light';
  className?: string;
  /** Largura exibida em px (a altura segue a proporção 2010x413). */
  width?: number;
}

const RATIO = 413 / 2010;

/** Logo oficial da Vert Decor (assets otimizados gerados por scripts/optimize-logo.mjs). */
export function Logo({ variant = 'color', className, width = 168 }: LogoProps) {
  const base = variant === 'light' ? '/logo/vert-decor-light' : '/logo/vert-decor';
  return (
    <img
      className={className}
      src={`${base}-360.webp`}
      srcSet={`${base}-360.webp 360w, ${base}-720.webp 720w`}
      sizes={`${width}px`}
      width={width}
      height={Math.round(width * RATIO)}
      alt="Vert Decor"
      decoding="async"
    />
  );
}
