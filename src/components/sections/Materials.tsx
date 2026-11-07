import { useState } from 'react';
import { materials } from '../../data/materials';
import { materialsIntro } from '../../data/content';
import { useNear } from '../../hooks/useNear';
import { useReveal } from '../../hooks/useReveal';

export function Materials() {
  const [id, setId] = useState(materials[0].id);
  const [seen, setSeen] = useState<string[]>([]);
  const [stageRef, near] = useNear<HTMLDivElement>('300px 0px');
  const head = useReveal<HTMLDivElement>();
  const stage = useReveal<HTMLDivElement>();
  const active = materials.find((m) => m.id === id)!;
  const index = materials.indexOf(active) + 1;

  // as texturas só são pedidas quando a seção se aproxima da tela
  const shown = near ? (seen.includes(id) ? seen : [...seen, id]) : seen;

  const select = (next: string) => {
    setId(next);
    setSeen((s) => (s.includes(next) ? s : [...s, next]));
  };

  return (
    <section id="materiais" className="materials panel" aria-labelledby="materiais-title">
      <div className="materials__head reveal" ref={head}>
        <div>
          <p className="eyebrow-dark">03 — Materiais</p>
          <h2 id="materiais-title">A beleza <em>da pedra.</em></h2>
        </div>
        <p>{materialsIntro.text}</p>
      </div>

      <div className="materials__layout reveal" ref={stage}>
        <div className="materials__stage" ref={stageRef}>
          {materials.map((m) =>
            shown.includes(m.id) ? (
              <img
                key={m.id}
                className={m.id === id ? 'is-active' : undefined}
                src={m.textures.color1k}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                alt={m.id === id ? `Textura do ${m.name}` : ''}
              />
            ) : null,
          )}
          <div className="materials__caption">
            <span>{String(index).padStart(2, '0')} / {String(materials.length).padStart(2, '0')}</span>
            <h3>{active.name}</h3>
            <p>{active.description}</p>
          </div>
        </div>

        <ul className="materials__list" aria-label="Escolha a pedra">
          {materials.map((m, i) => (
            <li key={m.id}>
              <button type="button" aria-pressed={m.id === id} onClick={() => select(m.id)}>
                <span className="materials__swatch" style={{ backgroundImage: `url(${m.textures.swatch})` }} />
                <span className="materials__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="materials__name">{m.name}</span>
              </button>
            </li>
          ))}
          <li className="materials__note">{materialsIntro.note}</li>
        </ul>
      </div>
    </section>
  );
}
