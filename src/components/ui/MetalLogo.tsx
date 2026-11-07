import './MetalLogo.scss';

/**
 * Logo metálica: o "D" do monograma e o "DE COR" em OURO; o restante (V, VERT e o divisor) em JADE polido (pedra lisa, translúcida e sutil).
 * Estática (sem animação). Máscaras geradas por `scripts/logo-parts.mjs`.
 * Decorativa: quem usa deve fornecer o nome acessível (aria-label no elemento pai).
 */
export function MetalLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`metal-logo ${className}`.trim()} aria-hidden="true">
      <i className="metal-logo__shadow" />
      <i className="metal-logo__edge" />
      <i className="metal-logo__gem" />
      <i className="metal-logo__gold metal-logo__gold--d" />
      <i className="metal-logo__gold metal-logo__gold--decor" />
    </span>
  );
}
