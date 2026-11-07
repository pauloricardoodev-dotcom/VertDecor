import { useRef, useState } from 'react';
import { materials } from '../../../data/materials';
import { productCategories, products } from '../../../data/products';
import { useReveal } from '../../../hooks/useReveal';
import type { Product, ProductCategoryId } from '../../../types';
import { Carousel } from '../../ui/Carousel';
import { ProductArt } from './ProductArt';
import { CatalogDialog } from './CatalogDialog';
import { ProductDialog } from './ProductDialog';
import './Collection.scss';

type Filter = 'todas' | ProductCategoryId;
const FILTERS: { id: Filter; label: string }[] = [{ id: 'todas', label: 'Todas' }, ...productCategories];

const stoneLabel = (p: Product) =>
  p.materialIds.map((id) => materials.find((m) => m.id === id)?.shortName).filter(Boolean).join(' · ');

export function Collection() {
  const [filter, setFilter] = useState<Filter>('todas');
  const [selected, setSelected] = useState<Product | null>(null);
  const [catalog, setCatalog] = useState(false);
  const headRef = useReveal<HTMLDivElement>();
  const filtersRef = useReveal<HTMLDivElement>();
  const lastTrigger = useRef<HTMLElement | null>(null);

  const visible = products.filter((p) => filter === 'todas' || p.category === filter);

  const open = (p: Product, e: React.MouseEvent<HTMLElement>) => {
    lastTrigger.current = e.currentTarget;
    setSelected(p);
  };
  const close = () => {
    setSelected(null);
    lastTrigger.current?.focus({ preventScroll: true });
  };

  return (
    <section id="colecao" className="collection panel" aria-labelledby="colecao-title">
      <div className="collection__head reveal" ref={headRef}>
        <div>
          <p className="collection__index">04 — Coleção</p>
          <h2 id="colecao-title">Peças <em>de design.</em></h2>
        </div>
        <p className="collection__lead">
          Mesas e peças de apoio em pedra natural, pensadas para compor o espaço com presença e silêncio.
        </p>
      </div>

      <div className="collection__toolbar reveal" ref={filtersRef} style={{ '--d': 1 } as React.CSSProperties}>
        <div className="collection__filters" role="group" aria-label="Filtrar por categoria">
          {FILTERS.map((c) => (
            <button key={c.id} type="button" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <button type="button" className="collection__catalog" onClick={(e) => { lastTrigger.current = e.currentTarget; setCatalog(true); }} aria-haspopup="dialog">
          <span>Ver catálogo</span>
          <svg viewBox="0 0 28 8" width="24" height="8" aria-hidden="true"><path d="M0 4h26M22 1l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
        </button>
      </div>

      <Carousel key={filter} label="Peças da coleção">
        {visible.map((p, i) => (
          <PieceCard key={p.id} product={p} number={products.indexOf(p) + 1} tone={i % 3} onOpen={open} />
        ))}
      </Carousel>

      <p className="collection__note">Peças e ilustrações fictícias, provisórias — serão substituídas pelo catálogo oficial.</p>

      {catalog && (
        <CatalogDialog
          onClose={() => { setCatalog(false); lastTrigger.current?.focus({ preventScroll: true }); }}
          onPick={(p) => { setCatalog(false); setSelected(p); }}
        />
      )}
      {selected && <ProductDialog product={selected} onClose={close} />}
    </section>
  );
}

interface CardProps {
  product: Product;
  number: number;
  tone: number;
  onOpen: (p: Product, e: React.MouseEvent<HTMLElement>) => void;
}

function PieceCard({ product, number, tone, onOpen }: CardProps) {
  const category = productCategories.find((c) => c.id === product.category)?.label;
  return (
    <div className="slide" data-slide>
    <article className={`piece piece--t${tone}`}>
      <div className="piece__art" aria-hidden="true">
        <ProductArt kind={product.art} materialIds={product.materialIds} />
      </div>
      <div className="piece__meta">
        <p className="piece__kicker">
          <span>Nº {String(number).padStart(3, '0')}</span>
          <span>{category}</span>
        </p>
        <h3 className="piece__name">{product.name}</h3>
        <p className="piece__stone">Tampo {stoneLabel(product)} · Estrutura {product.frame}</p>
        <p className="piece__desc">{product.description}</p>
        <button type="button" className="piece__open" onClick={(e) => onOpen(product, e)} aria-haspopup="dialog">
          <span>Conhecer a peça <span className="visually-hidden">{product.name}</span></span>
          <svg viewBox="0 0 28 8" width="28" height="8" aria-hidden="true">
            <path d="M0 4h26M22 1l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>
    </article>
    </div>
  );
}
