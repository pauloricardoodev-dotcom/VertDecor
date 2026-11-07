interface LogoProps {
  variant?: 'color' | 'light';
  className?: string;
  /** Largura exibida em px (a altura segue a proporção 2010x413). */
  width?: number;
}

const RATIO = 413 / 2010;

/**
 * Logo oficial da Vert Decor (assets otimizados gerados por scripts/optimize-logo.mjs).
 * `color` troca sozinha para a versão clara no tema escuro (CSS em global.scss).
 */
export function Logo({ variant = 'color', className = '', width = 168 }: LogoProps) {
  const img = (base: string, extra: string, lazy = false, alt = 'Vert Decor') => (
    <img
      className={`${className} ${extra}`.trim() || undefined}
      src={`${base}-360.webp`}
      srcSet={`${base}-360.webp 360w, ${base}-720.webp 720w`}
      sizes={`${width}px`}
      width={width}
      height={Math.round(width * RATIO)}
      alt={alt}
      decoding="async"
      loading={lazy ? 'lazy' : undefined}
    />
  );
  if (variant === 'light') return img('/logo/vert-decor-light', '');
  return (
    <>
      {img('/logo/vert-decor', 'logo-themed--color')}
      {img('/logo/vert-decor-light', 'logo-themed--light', true, '')}
    </>
  );
}
