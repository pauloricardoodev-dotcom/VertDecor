import { manifesto } from '../../data/content';
import { useReveal } from '../../hooks/useReveal';

export function Manifesto() {
  const ref = useReveal<HTMLDivElement>();
  const words = manifesto.title.split(' ');
  return (
    <section id="manifesto" className="manifesto panel" aria-labelledby="manifesto-title">
      <span className="manifesto__ring manifesto__ring--a" aria-hidden="true" />
      <span className="manifesto__ring manifesto__ring--b" aria-hidden="true" />
      <div className="manifesto__inner" ref={ref}>
        <p className="eyebrow-light">02 — Manifesto</p>
        <h2 id="manifesto-title" className="manifesto__title">
          {words.map((w, i) => (
            <span key={i} style={{ '--w': i } as React.CSSProperties}>{w}</span>
          ))}
        </h2>
        <p className="manifesto__text">{manifesto.text}</p>
        <p className="manifesto__sign">{manifesto.signature}</p>
      </div>

      <ul className="manifesto__values">
        {manifesto.values.map((v, i) => (
          <ValueCard key={v.n} {...v} delay={i} />
        ))}
      </ul>
    </section>
  );
}

function ValueCard({ n, title, text, delay }: { n: string; title: string; text: string; delay: number }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className="manifesto__value reveal" style={{ '--d': delay } as React.CSSProperties}>
      <span>{n}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  );
}
