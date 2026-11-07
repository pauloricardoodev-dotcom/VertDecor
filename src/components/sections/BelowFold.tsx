import { useEffect, useState } from 'react';
import { About } from './About';
import { Collection } from './collection/Collection';
import { ProductDefs } from './collection/ProductArt';
import { Contact } from './Contact';
import { Environments } from './Environments';
import { Manifesto } from './Manifesto';
import { Materials } from './Materials';
import './Sections.scss';

/** Tudo abaixo da primeira dobra: um único chunk, hidratado depois do Hero. */
export default function BelowFold() {
  const [armed, setArmed] = useState(false); // texturas das ilustrações só baixam perto da Coleção
  useEffect(() => {
    const el = document.getElementById('materiais');
    if (!el || !('IntersectionObserver' in window)) { setArmed(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setArmed(true); io.disconnect(); } }, { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <ProductDefs armed={armed} />
      <Manifesto />
      <Materials />
      <Collection />
      <Environments />
      <About />
      <Contact />
    </>
  );
}
