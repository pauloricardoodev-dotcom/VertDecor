import { environments } from '../../data/environments';
import { environmentsIntro } from '../../data/content';
import { useReveal } from '../../hooks/useReveal';
import { Carousel } from '../ui/Carousel';
import { ProductArt } from './collection/ProductArt';

export function Environments() {
  const head = useReveal<HTMLDivElement>();
  return (
    <section id="ambientes" className="environments panel" aria-labelledby="ambientes-title">
      <div className="environments__head reveal" ref={head}>
        <div>
          <p className="eyebrow-dark">05 — Ambientes</p>
          <h2 id="ambientes-title">Inspiração <em>e composição.</em></h2>
        </div>
        <p>{environmentsIntro.text}</p>
      </div>

      <Carousel label="Ambientes">
        {environments.map((e) => (
          <div className="slide-env" data-slide key={e.id}>
            <article className="scene" style={{ '--from': e.from, '--to': e.to } as React.CSSProperties}>
              <div className="scene__art" aria-hidden="true">
                <span className="scene__window" />
                <span className="scene__floor" />
                <ProductArt kind={e.piece.art} materialIds={e.piece.materialIds} />
                <span className="scene__tag"><i />{e.piece.name}</span>
              </div>
              <div className="scene__meta">
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </article>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
