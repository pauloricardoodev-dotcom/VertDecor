import { lazy, Suspense } from 'react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/hero/Hero';
import { Loader } from './components/ui/Loader';

// Tudo abaixo da primeira dobra vira um chunk próprio: a hidratação é adiada e fatiada pelo
// React (o HTML pré-renderizado continua na página), mantendo o TBT baixo.
export const loadBelowFold = () => import('./components/sections/BelowFold');
const BelowFold = lazy(loadBelowFold);

export default function App() {
  return (
    <>
      <Loader />
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Suspense fallback={null}>
          <BelowFold />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
