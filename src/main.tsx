import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fontes self-hosted (somente subconjunto latin e pesos usados)
import '@fontsource/cormorant-garamond/latin-300.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';

import './styles/bootstrap.scss';
import './styles/global.scss';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
