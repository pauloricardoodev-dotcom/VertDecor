import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

// Fontes self-hosted (somente subconjunto latin e pesos usados)
import '@fontsource/cormorant-garamond/latin-300.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';

import './styles/bootstrap.scss';
import './styles/global.scss';
import App from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Em produção o HTML já vem pré-renderizado (scripts/prerender.mjs): apenas hidrata
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
