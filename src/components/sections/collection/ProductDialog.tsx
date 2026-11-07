import { useEffect, useRef } from 'react';
import { materials } from '../../../data/materials';
import { productCategories } from '../../../data/products';
import { scrollToHash } from '../../../lib/scroll';
import type { Product } from '../../../types';
import { ProductArt } from './ProductArt';

interface Props {
  product: Product;
  onClose: () => void;
}

/** Painel de apresentação da peça (estrutura pronta para a futura rota /colecao/[slug]). */
export function ProductDialog({ product, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const category = productCategories.find((c) => c.id === product.category)?.label;
  const stoneNames = product.materialIds.map((id) => materials.find((m) => m.id === id)?.name).filter(Boolean);

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

  const request = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    // espera o painel fechar para a rolagem não ser bloqueada
    setTimeout(() => scrollToHash('#contato'), 60);
  };

  return (
    <dialog
      ref={ref}
      className="piece-dialog"
      aria-labelledby="piece-dialog-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="piece-dialog__art">
        <ProductArt kind={product.art} materialIds={product.materialIds} />
      </div>
      <div className="piece-dialog__body">
        <p className="piece-dialog__eyebrow">{category}</p>
        <h3 id="piece-dialog-title">{product.name}</h3>
        <p className="piece-dialog__text">{product.description}</p>
        <dl className="piece-dialog__facts">
          <div><dt>{stoneNames.length > 1 ? 'Tampos em' : 'Tampo em'}</dt><dd>{stoneNames.join(' · ')}</dd></div>
          <div><dt>Estrutura</dt><dd>{product.frame}</dd></div>
          <div><dt>Medidas e acabamentos</dt><dd>A confirmar com a Vert Decor</dd></div>
        </dl>
        <p className="piece-dialog__note">Peça e ilustração fictícias, provisórias — aguardando o catálogo oficial.</p>
        <div className="piece-dialog__actions">
          <a className="btn-vert btn-vert--solid" href="#contato" onClick={request}><span>Solicitar esta peça</span></a>
          <button type="button" className="piece-dialog__close" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </dialog>
  );
}
