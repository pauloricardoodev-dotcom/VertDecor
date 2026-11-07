# Performance, responsividade, animações e qualidade

## Meta obrigatória
Lighthouse **≥ 90** em Desempenho, Acessibilidade, Boas práticas e SEO — medir **mobile e desktop**, em build de produção (`npm run build && npm run preview`). Abaixo de 90 = não concluído.
Comando: `npx lighthouse http://localhost:4173 --preset=desktop` e sem preset (mobile), `--output=json --output-path=...` + resumo dos 4 scores.
Alvos: LCP < 2.5s (mobile throttled), CLS < 0.1, TBT < 200ms, JS inicial enxuto.

## Mobile first
- CSS base = smartphone; breakpoints com `min-width` usando os do Bootstrap (`media-breakpoint-up(sm|md|lg|xl|xxl)` = 576 / 768 / 992 / 1200 / 1400).
- Bootstrap só com os parciais necessários (ver `02-arquitetura.md`) para não inflar o CSS; remover CSS não usado se o Lighthouse acusar.
- Tipografia fluida com `clamp()`. Alvos de toque ≥ 44px. Sem scroll horizontal acidental.
- Testar: 360, 390, 768, 1024, 1280, 1440+.

## Estratégia 3D (conflito principal com o score)
- O Hero renderiza primeiro uma **imagem poster estática** (é o LCP) — otimizada, `priority`.
- Canvas R3F via `React.lazy(() => import(...))` em chunk separado (Vite), montado só após `load`/idle (`requestIdleCallback`) ou interação; fade do poster para o 3D.
- Modelo `.glb` comprimido (Draco/Meshopt), texturas KTX2/WebP ≤ 1K no mobile, 2K no desktop.
- Device tier: mobile/baixo poder → `dpr` limitado (1–1.5), sombras baked/contact shadows, sem pós-processamento. Sem WebGL → mantém poster + seletor troca imagens.
- `frameloop="demand"` quando parado; pausar render fora da viewport.
- Fallback visual durante o carregamento.

## Animações
- GSAP + ScrollTrigger para scroll/timelines; evitar carregar Framer Motion **e** GSAP se não for necessário (peso de bundle) — preferir CSS para microinterações.
- Lenis opcional; desligado em `prefers-reduced-motion` e avaliado no mobile.
- Animar só `transform`/`opacity`. Nada de animação que bloqueie interação ou atrase o LCP.
- Explorar: parallax, revelação de textos, máscaras de imagens, transições de seção, hover, navegação horizontal, troca de material 3D. Cada animação deve servir à narrativa — nada de enfeite.
- `prefers-reduced-motion`: desativar parallax/scroll suave, reduzir a fades simples. Teclado sempre funcional.

## Imagens e recursos
Lazy loading abaixo da dobra, `srcset`/`sizes` corretos, AVIF/WebP, dimensões explícitas (CLS), fontes self-host via `@fontsource` com preload, sem bibliotecas desnecessárias, code-splitting por seção pesada.

## SEO / Acessibilidade / Boas práticas
Metadata completa (title, description, Open Graph), `lang="pt-BR"`, HTML semântico (header/nav/main/section/footer), um `h1`, alt em todas as imagens, contraste AA, labels em controles (seletor de pedras = radiogroup acessível), sem erros no console, HTTPS-ready.

## Checklist final de qualidade
- Hero impressiona? Mesa 3D parece objeto de design real? Troca de materiais funciona?
- Tipografia sofisticada? Identidade consistente? Ritmo visual entre seções?
- Animações fluidas? Navbar funciona em todas as resoluções? Mobile bem resolvido?
- Parece marca premium ou template? Não entregar wireframe/demo estática: Home navegável e interativa.
- **4 scores Lighthouse ≥ 90 (mobile e desktop).**
