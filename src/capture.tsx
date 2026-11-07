// Somente desenvolvimento: renderiza a mesa para gerar os posters (scripts/capture-posters.mjs)
import { createRoot } from 'react-dom/client';
import TableScene from './components/three/TableScene';

const stone = new URLSearchParams(location.search).get('stone') ?? 'verde';
declare global { interface Window { __ready?: boolean } }

createRoot(document.getElementById('root')!).render(
  <TableScene
    capture
    materialId={stone}
    tier="high"
    reducedMotion
    onReady={() => setTimeout(() => { window.__ready = true; }, 600)}
  />,
);
