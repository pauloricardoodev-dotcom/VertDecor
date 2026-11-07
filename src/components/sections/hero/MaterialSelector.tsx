import { useRef } from 'react';
import { materials } from '../../../data/materials';

interface Props {
  value: string;
  onChange: (id: string) => void;
}

/** Seletor de pedras acessível (padrão ARIA radiogroup com setas do teclado). */
export function MaterialSelector({ value, onChange }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = materials.findIndex((m) => m.id === value);
  const current = materials[index];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys) && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    let next = index + (keys[e.key] ?? 0);
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = materials.length - 1;
    next = (next + materials.length) % materials.length;
    onChange(materials[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div className="stone-selector">
      <p className="stone-selector__caption" aria-live="polite">
        <span className="stone-selector__count">
          {String(index + 1).padStart(2, '0')} <span aria-hidden="true">/</span> {String(materials.length).padStart(2, '0')}
        </span>
        <span className="stone-selector__name">{current.name}</span>
      </p>
      <div className="stone-selector__options" role="radiogroup" aria-label="Escolha a pedra da mesa" onKeyDown={onKeyDown}>
        {materials.map((m, i) => {
          const checked = m.id === value;
          return (
            <button
              key={m.id}
              ref={(el) => { refs.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              className="stone-selector__option"
              onClick={() => onChange(m.id)}
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="stone-selector__swatch" style={{ backgroundImage: `url(${m.textures.swatch})` }} aria-hidden="true" />
              <span className="stone-selector__label">{m.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
