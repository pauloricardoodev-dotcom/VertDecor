import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/hero/Hero';
import { SectionPlaceholder } from './components/sections/SectionPlaceholder';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        {/* Seções abaixo são provisórias — próximas etapas */}
        <SectionPlaceholder id="manifesto" index="02 — Manifesto" title="A beleza precisa ser sentida." tone="forest" />
        <SectionPlaceholder id="materiais" index="03 — Materiais" title="A beleza da pedra." />
        <SectionPlaceholder id="colecao" index="04 — Coleção" title="Peças de design." tone="sand" />
        <SectionPlaceholder id="ambientes" index="05 — Ambientes" title="Inspiração e composição." />
        <SectionPlaceholder id="sobre" index="06 — Sobre a Vert" title="Design que encontra a natureza." tone="sand" />
        <SectionPlaceholder id="contato" index="07 — Contato" title="Seu espaço conta uma história." tone="forest" />
      </main>
    </>
  );
}
