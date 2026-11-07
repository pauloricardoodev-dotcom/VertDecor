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

## Pendências / decisões em aberto
- Logo oficial usa azul petróleo `#013F5D` + dourado `#E4BB74`; a paleta do briefing é verde/champagne. Confirmar com a marca.
- Assets provisórios: mesa procedural (`tableGeometry.ts`) e texturas procedurais (`public/textures/`).
- Contato, WhatsApp, Instagram e domínio (canonical/OG absoluto) ainda não fornecidos.

## Próximas etapas
2. Manifesto + Materiais · 3. Coleção + Ambientes · 4. Sobre + CTA + Rodapé · 5. Revisão geral e Lighthouse final
