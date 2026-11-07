// Pré-renderização estática da Home (scripts/prerender.mjs). O HTML pronto é hidratado no cliente.
import { renderToString } from 'react-dom/server';
import App from './App';

export function render() {
  return renderToString(<App />);
}
