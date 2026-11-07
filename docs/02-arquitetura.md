# Arquitetura e diretrizes de desenvolvimento

## Antes de começar
Analisar estrutura existente, dependências instaladas, preservar o que funciona, não reescrever sem necessidade. (Projeto iniciou vazio → criar com Vite + React + TypeScript + Bootstrap 5.)

## Stack
- **React + Vite + TS** (SPA). SEO: meta tags, Open Graph e `lang="pt-BR"` direto no `index.html`; conteúdo da Home é estático, então o Lighthouse SEO é atendido sem SSR.
- **Bootstrap 5 via Sass**: sobrescrever variáveis (cores, fontes, `$border-radius` baixo, breakpoints) com a paleta da marca e importar só os parciais usados (functions, variables, maps, mixins, root, reboot, grid, containers, utilities, helpers). Bootstrap já é mobile first (`sm 576 / md 768 / lg 992 / xl 1200 / xxl 1400`). Não usar componentes visuais prontos que deem cara de template; JS do Bootstrap só se necessário (preferir React próprio).
- **Fontes**: `@fontsource` (self-host) de Cormorant Garamond e DM Sans, só pesos usados, `font-display: swap`, preload dos críticos.
- **Backend futuro**: Nest.js + Prisma + PostgreSQL (fora do escopo agora). Tipos em `src/types/` espelhando os futuros modelos.

## Estrutura proposta
```
index.html        meta/SEO, preload do poster do Hero e fontes críticas
src/
  main.tsx, App.tsx (Home)
  styles/         _variables.scss (tokens + overrides Bootstrap), bootstrap.scss (imports parciais), global.scss
  types/          Product, Material, Environment, NavItem
  components/
    layout/       Navbar, MobileMenu, Footer
    sections/     Hero, Manifesto, Materials, Collection, Environments, About, ContactCTA
    three/        TableModel, TableScene (Canvas), MaterialSelector
    ui/           Button, RevealText, etc. (reutilizáveis)
  data/           navigation.ts, materials.ts, products.ts, environments.ts, contact.ts (placeholders)
  lib/            hooks (useReducedMotion, useDeviceTier), utils
public/
  textures/       mapas das pedras (KTX2/WebP comprimidos)
  models/         mesa .glb (Draco/Meshopt) — definitivo da marca entra aqui
  images/         fotos de referência (substituíveis)
```
Componentes separados: Navbar, Hero, Modelo 3D, Seletor de materiais, Manifesto, Materiais, Coleção, Ambientes, Sobre, CTA, Footer. **Nada concentrado em um único componente.**

## Dados
- Centralizar produtos, materiais, ambientes, navegação e contato em `src/data/` com tipos TS.
- Estrutura pronta para virar catálogo/e-commerce depois (ids, slugs, categoria, imagens, descrição).
- Navegação: Home, Coleção, Materiais, Ambientes, Sobre a Vert, Contato → âncoras `#colecao`, `#materiais`, etc. Rotas futuras previstas no dado (`href` futuro comentado/flag).
- Contato/WhatsApp/Instagram: **placeholders**, nunca números ou links inventados. Botão desabilitado ou âncora segura enquanto vazio.

## Imagens
- Referências editoriais de alta qualidade (mobiliário/interiores contemporâneos), nunca genéricas de baixa qualidade.
- Não apresentar como produtos oficiais da Vert Decor. Serão substituídas pelas fotos da marca.
- Gerar variantes AVIF/WebP em várias larguras (script com `sharp` ou `vite-imagetools`) e usar `<picture>`/`srcset` + `sizes`, `width`/`height` explícitos, `loading="lazy"` + `decoding="async"` (exceto LCP, que usa `fetchpriority="high"`). Registrar créditos/origem.

## Escopo
Somente a Home. **Não** implementar: checkout, carrinho, pagamentos, pedidos, admin, banco de produtos, páginas internas completas. Arquitetura deve permitir evolução para e-commerce.
