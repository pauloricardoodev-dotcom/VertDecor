# Status do projeto

## Etapa 1 — Base, Navbar e Hero ✅ (2026-11-06)
- Vite + React + TS + Bootstrap (Sass enxuto), fontes self-host, tokens, dados tipados (`src/data`, `src/types`).
- Navbar: transparente → vidro no scroll, scroll-spy, menu mobile em tela cheia (Esc, foco, `inert`).
- Hero: mesa 3D procedural (R3F), 4 pedras com crossfade de textura, rotação, zoom por botões (md+), poster estático como fallback/LCP, seletor acessível (radiogroup).
- Seções Manifesto → Contato: **placeholders** só para as âncoras funcionarem.

Lighthouse (build de produção):
| | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Mobile | 99 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

## Etapa 1.5 — Polimento visual ✅ (2026-11-06)
- **Tela de carregamento** (`ui/Loader`): 100% CSS no HTML pré-renderizado, cortina com arco que sobe em ~2,6 s; Hero e Navbar esperam via `--intro`. Desligada em reduced-motion.
- **Fundo do Hero** (`HeroBackdrop`): brilhos à deriva, veios de mármore que se desenham, grão fino, anéis pulsantes e satélite em órbita (só CSS/SVG).
- **3D** (`TableScene`): giro de entrada, meia volta a cada troca de pedra, flutuação, inclinação seguindo o cursor, luz quente em órbita e partículas champagne (`Sparkles`). Em desktop potente o 3D carrega sozinho ~4 s após a abertura (mobile/low-end continua só na 1ª interação).
- **Coleção** (`sections/collection`): 6 peças FICTÍCIAS (`src/data/products.ts`) com ilustrações vetoriais provisórias texturizadas com as pedras, grade assimétrica, filtro por categoria e painel `<dialog>` de detalhe. Chunk próprio (`React.lazy`), hidratação adiada.
- **Bug corrigido**: o poster do Hero nunca aparecia (`.is-active` estava no `<picture>`, o CSS mirava o `<img>`).
- Cuidado de performance: `supportsWebGL()` cria um contexto WebGL e custava ~1 s de TBT no mobile — agora só roda quando o 3D vai carregar.

Lighthouse (build de produção):
| | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Mobile | 93 | 100 | 100 | 100 |
| Desktop | 98 | 100 | 100 | 100 |

## Etapa 2 — Todas as seções + layout arredondado ✅ (2026-11-06)
- Seções implementadas (textos conceituais em `src/data/content.ts`, sem dados factuais inventados): Manifesto, Materiais (seletor de pedras), Coleção (carrossel), Ambientes (carrossel ilustrativo, `src/data/environments.ts`), Sobre, CTA/Contato e Rodapé. Todas abaixo da dobra num único chunk lazy (`sections/BelowFold`).
- Layout sem cantos vivos: seções são painéis arredondados (`.panel`), botões em pílula, cartões e diálogo arredondados, botões de zoom do 3D circulares em destaque.
- Peças agora: tampo de mármore/travertino + estrutura de FERRO (`frame` em `products.ts`; ilustrações em `collection/ProductArt.tsx`). Sem fundo branco: cada cartão tem tom próprio.
- Contato: número de WhatsApp ainda não fornecido, botão fica desabilitado com aviso.
- Lighthouse: mobile 90–93 (oscila entre execuções), desktop 98; acessibilidade, boas práticas e SEO 100.

## Etapa 3 — Ajustes de navbar, 3D, catálogo e contato ✅ (2026-11-07)
- Navbar sempre em vidro fosco (blur): conteúdo aparece borrado por trás. O canvas 3D sobe por baixo dela no desktop (`ViewExtend` em `TableScene`), então a mesa ampliada não é cortada. Botão "restaurar" removido (ficam só + e −).
- Coleção: botão "Ver catálogo" (diálogo com todas as peças, `CatalogDialog`) acima do carrossel.
- Contato virou "hero": formulário à esquerda, peça de mármore verde com a logo em dourado à direita (logo = máscara CSS do WebP + degradê dourado). O envio é demonstração: abre o WhatsApp se `contact.whatsapp` existir; senão só confirma na tela.
- Corrigido: o retângulo de sombra visível ao ampliar o 3D (`BakedShadow` agora some antes da borda do canvas).
- Imagens abaixo da dobra só são pedidas quando se aproximam (`useNear`) para não disputar banda com o LCP.
- Lighthouse: mobile oscila 88–92 (LCP ~3,1 s simulado) — está na fronteira; desktop 98–99; demais 100.

## Etapa 4 — Tema claro/escuro + rodapé cru ✅ (2026-11-07)
- Botão flutuante (canto inferior direito) alterna tema; revelação circular via View Transitions; escolha salva em `localStorage` (`vd-theme`) e aplicada por script no `<head>` (sem flash).
- Tokens de cor viraram variáveis CSS (`src/styles/_theme.scss`); `rgba($token, a)` virou `color-mix()`. Áreas sempre verdes (Manifesto, rodapé, placa, loader, menu mobile, stage de materiais) usam `@include fixed-palette`. Hex reais para Sass/Bootstrap: `$forest-hex` etc.
- Logo colorida troca para a clara no tema escuro (`Logo` renderiza as duas).
- Rodapé: sem brilho/luz do cursor (só mármore + veios dourados).
- Lighthouse: mobile 88–90 (fronteira), desktop 98.

## Pendências / decisões em aberto
- Logo oficial usa azul petróleo `#013F5D` + dourado `#E4BB74`; a paleta do briefing é verde/champagne. Confirmar com a marca.
- Assets provisórios: mesa procedural (`tableGeometry.ts`) e texturas procedurais (`public/textures/`).
- Produtos da Coleção são fictícios/ilustrativos: trocar pelo catálogo e fotos oficiais.
- Contato, WhatsApp, Instagram e domínio (canonical/OG absoluto) ainda não fornecidos.

## Próximas etapas
Fotografias e catálogo reais, contatos oficiais e revisão final.
