// Pré-renderização estática da Home (scripts/prerender.mjs). O HTML pronto é hidratado no cliente.
import { renderToString } from 'react-dom/server';
import App, { loadBelowFold } from './App';

export async function render() {
  // 1ª passada dispara os imports `lazy`; depois de resolvidos, a 2ª já gera o HTML completo
  renderToString(<App />);
  await loadBelowFold();
  await new Promise((r) => setTimeout(r, 0));
  return renderToString(<App />);
}
