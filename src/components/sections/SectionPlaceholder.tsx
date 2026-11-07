import './SectionPlaceholder.scss';

interface Props {
  id: string;
  index: string;
  title: string;
  tone?: 'light' | 'sand' | 'forest';
}

/**
 * PROVISÓRIO: mantém as âncoras da navbar funcionando enquanto as seções
 * definitivas (Manifesto, Coleção, Materiais, Ambientes, Sobre, Contato) são implementadas.
 */
export function SectionPlaceholder({ id, index, title, tone = 'light' }: Props) {
  return (
    <section id={id} className={`section-placeholder section-placeholder--${tone}`} aria-labelledby={`${id}-title`}>
      <p className="section-placeholder__index">{index}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      <p className="section-placeholder__note">Seção em desenvolvimento</p>
    </section>
  );
}
