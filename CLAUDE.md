# VERT DECOR — Site institucional (Home)

Site premium da Vert Decor (mesas de mármore e decoração). Conceito: **Organic Luxury**.
Escopo atual: **somente a Home**. Sem checkout, carrinho, pagamentos, admin ou banco de dados.
Postura: Senior Creative Developer + Art Director de marcas de luxo. Ousado na direção de arte, elegante na execução.

## Regras inegociáveis
1. **Lighthouse ≥ 90** em Desempenho, Acessibilidade, Boas práticas e SEO (mobile E desktop). Abaixo de 90 não é aceito. Rodar Lighthouse antes de considerar qualquer etapa concluída.
2. **Desempenho tem prioridade** sobre efeitos visuais. Em conflito, o efeito é simplificado ou adiado — nunca o score.
3. **Mobile first**: CSS base para telas pequenas, `min-width` para ampliar. Responsividade impecável em smartphone, tablet, notebook e desktop.
4. Respeitar `prefers-reduced-motion` e navegação por teclado (foco visível, ordem lógica).
5. **Não inventar dados**: história, fundação, prêmios, fornecedores, procedência/composição das pedras, telefones, links. Usar placeholders centralizados.
6. Não simular fotos de referência como produtos oficiais da Vert Decor.
7. Links da navbar nunca quebrados: âncoras para seções da Home até as páginas internas existirem.

## Stack
**Frontend (atual):** React + Vite + TypeScript + **Bootstrap 5** (grid/utilitários para responsividade; importar via Sass só os módulos usados, sem o bundle JS completo). Three.js via React Three Fiber (hero, carregado sob demanda com `React.lazy`). GSAP + ScrollTrigger para scroll; Lenis opcional (desligar em reduced-motion). Detalhes em `docs/03-performance.md`.
**Backend (futuro, não implementar agora):** Nest.js + Prisma + PostgreSQL. Os dados de `src/data/` devem ter formato compatível com futuros modelos Prisma (ids, slugs, relações produto↔material).

## Onde está cada coisa (ler só o necessário para a tarefa)
| Arquivo | Conteúdo |
|---|---|
| `docs/01-identidade.md` | Paleta, tipografia, direção visual, o que evitar |
| `docs/02-arquitetura.md` | Estrutura de pastas, componentes, dados, imagens, escopo |
| `docs/03-performance.md` | Lighthouse, mobile first, estratégia 3D, animações, checklist final |
| `docs/secoes/navbar.md` | Navbar + menu mobile |
| `docs/secoes/hero.md` | Hero 3D, seletor de pedras, copy, animação de entrada |
| `docs/secoes/manifesto.md` | Seção Manifesto |
| `docs/secoes/materiais.md` | Seção Materiais |
| `docs/secoes/colecao.md` | Seção Coleção |
| `docs/secoes/ambientes.md` | Galeria horizontal de Ambientes |
| `docs/secoes/sobre-cta-footer.md` | Sobre, CTA final (WhatsApp) e Rodapé |

`docs/_arquivo/contexto-original.md` é o briefing bruto — **não ler**, tudo já está distribuído acima.

## Fluxo de trabalho
- Ao implementar uma seção: ler `01-identidade.md` (uma vez) + o arquivo da seção + `03-performance.md` se envolver mídia/animação/3D.
- Cada seção = componente próprio em `src/components/sections/`. Dados em `src/data/`.
- Ao fim de cada etapa: `npm run build` + Lighthouse (mobile e desktop) e registrar os scores.

## Comandos
- `npm run dev` — desenvolvimento · `npm run build` — build + pré-renderização (HTML estático hidratado) · `npm run preview` — serve o build (porta 4173)
- `npm run textures` (`-- <id>` para uma pedra) — regenera texturas provisórias · `npm run posters` — renderiza os posters do Hero a partir da própria cena 3D (rodar sempre que mudar câmera, luz, mesa ou texturas)
- `node scripts/optimize-logo.mjs` — gera as versões otimizadas da logo a partir de `public/logo/*.png`

## Decisões de performance já tomadas (não desfazer sem medir)
- Home pré-renderizada no build (`src/entry-server.tsx` + `scripts/prerender.mjs`): CSS inline, preload de fontes, JS só carrega após o 1º frame.
- Hero: poster AVIF/WebP é o LCP; Three.js (chunk ~270 KB gz) só carrega na 1ª interação. Sombra da mesa é *baked* (`BakedShadow`).
- Bootstrap: só fundação, grid e utilitários de layout (`src/styles/bootstrap.scss`).

## Status
Ver `docs/status.md`.
