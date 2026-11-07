# Hero — showroom digital (seção mais importante)

Primeira dobra extraordinária: mesa de mármore 3D protagonista, como peça exposta em galeria.
**Ler também `docs/03-performance.md` → Estratégia 3D** (poster estático como LCP, 3D carregado depois).

## Composição
Fundo off-white/areia · mesa ocupando grande parte do centro · iluminação de estúdio sofisticada · sombras realistas · navegação discreta · tipografia editorial · elementos gráficos minimalistas.

## 3D (React Three Fiber)
- Mesa lateral contemporânea, tampo circular, base escultural (modelo próprio procedural se não houver `.glb`).
- Rotação com mouse/toque, controle de visualização, zoom moderado (limites min/max), iluminação realista, sombras suaves, materiais PBR.
- Se não houver modelo/texturas reais: solução provisória convincente e **comentário explícito** indicando onde inserir os assets definitivos (`public/models/`, `public/textures/`).

## Seletor de pedras
Opções: Mármore Verde · Mármore Calacatta · Mármore Nero Marquina · Travertino.
- Troca com **transição suave** (crossfade entre materiais).
- Não apenas cor: texturas com veios/características reais (color + roughness + normal quando houver).
- Dados das pedras vêm de `src/data/materials.ts` (compartilhado com a seção Materiais).
- Acessível: `role="radiogroup"`, nomes visíveis, teclado. Funciona também no fallback sem WebGL (troca imagem).

## Copy
- Eyebrow: `DESIGN • MATÉRIA • PERSONALIDADE`
- H1: **"A natureza encontra sua forma mais elegante."**
- Descrição: "Peças que transformam ambientes através da beleza dos materiais naturais e da sofisticação do design."
- CTA principal: "Explore nossa coleção" → `#colecao`
- CTA secundário: "Conheça a Vert Decor" → `#sobre`
- Identificação discreta: `VERT COLLECTION — Nº 001`

## Animação de entrada (cinematográfica, curta)
1. Marca aparece suavemente → 2. navegação se revela → 3. objeto 3D entra em cena → 4. título com animação tipográfica elegante (linhas/palavras com máscara) → 5. controles de materiais aparecem.
Fluida, sem atrasar a interação nem o LCP (texto do H1 já presente no HTML; animar só transform/opacity). Reduced-motion: fades simples.
