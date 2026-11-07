import { about } from '../../data/content';
import { materials } from '../../data/materials';
import { useNear } from '../../hooks/useNear';
import { useReveal } from '../../hooks/useReveal';

export function About() {
  const text = useReveal<HTMLDivElement>();
  const visual = useReveal<HTMLDivElement>();
  const [nearRef, near] = useNear<HTMLSpanElement>('300px 0px');
  return (
    <section id="sobre" className="about panel" aria-labelledby="sobre-title">
      <div className="about__text reveal" ref={text}>
        <p className="eyebrow-dark">06 — Sobre a Vert</p>
        <h2 id="sobre-title">Design que encontra <em>a natureza.</em></h2>
        {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
        <ul className="about__pillars">
          {about.pillars.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__visual reveal" ref={visual} style={{ '--d': 1 } as React.CSSProperties}>
        <span ref={nearRef} className="about__sensor" aria-hidden="true" />
        {near && <img src={materials[0].textures.color1k} width={1024} height={1024} decoding="async" alt="" />}
        <span className="about__ring" aria-hidden="true" />
        <div className="about__badge">
          <span>Pedra + Ferro</span>
          <p>Tampos de pedra natural sobre estruturas de ferro.</p>
        </div>
      </div>
    </section>
  );
}
