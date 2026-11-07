import { useEffect, useRef } from 'react';
import { productCategories, products } from '../../../data/products';
import type { Product } from '../../../types';
import { ProductArt } from './ProductArt';

interface Props {
  onClose: () => void;
  onPick: (p: Product) => void;
}

/** Catálogo completo: todas as peças em grade (futura rota /colecao). */
export function CatalogDialog({ onClose, onPick }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (!dlg.open) dlg.showModal();
    document.body.classList.add('is-locked');
    return () => {
      document.body.classList.remove('is-locked');
      if (dlg.open) dlg.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="catalog-dialog"
      aria-labelledby="catalog-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <header className="catalog-dialog__head">
        <div>
          <p className="catalog-dialog__eyebrow">Catálogo</p>
          <h3 id="catalog-title">Todas as peças</h3>
        </div>
        <button type="button" className="catalog-dialog__close" onClick={onClose} aria-label="Fechar catálogo">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </header>

      <ul className="catalog-dialog__grid">
        {products.map((p, i) => (
          <li key={p.id}>
            <button type="button" className={`catalog-card piece--t${i % 3}`} onClick={() => onPick(p)}>
              <span className="catalog-card__art"><ProductArt kind={p.art} materialIds={p.materialIds} /></span>
              <span className="catalog-card__kicker">{productCategories.find((c) => c.id === p.category)?.label}</span>
              <span className="catalog-card__name">{p.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
