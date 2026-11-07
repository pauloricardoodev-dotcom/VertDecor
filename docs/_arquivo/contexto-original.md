# PROJETO VERT DECOR — DESENVOLVIMENTO DA HOME

Atue como um **Senior Creative Developer, UI/UX Designer e Art Director especializado em experiências digitais premium para marcas de arquitetura, interiores e mobiliário de luxo.**

Seu objetivo é desenvolver a primeira versão do site institucional da **VERT DECOR**, uma marca especializada na comercialização de mesas de mármore e peças de decoração.

Não quero um site institucional convencional. Quero uma experiência digital sofisticada, imersiva, visualmente memorável e com alto nível de acabamento.

Pense em referências de marcas de mobiliário autoral, estúdios de arquitetura contemporânea e sites editoriais de luxo.

A prioridade absoluta é a HOME: ela será a primeira página vista pelos visitantes e precisa causar uma excelente primeira impressão.

---

## 1. IDENTIDADE E DIREÇÃO CRIATIVA

**Marca:** VERT DECOR

**Conceito:** Organic Luxury — o encontro entre materiais naturais, design contemporâneo e sofisticação.

A identidade deve transmitir:
- Sofisticação sem exageros.
- Exclusividade.
- Elegância contemporânea.
- Valorização dos materiais naturais.
- Design e personalidade.
- Atemporalidade.

### Paleta de cores

Trabalhe inicialmente com esta paleta:

- Verde floresta: `#173B32`
- Verde pedra: `#283F37`
- Areia: `#E9E2D5`
- Off-white: `#F7F5EF`
- Champagne: `#B39A70`

O off-white e os tons areia devem predominar na experiência. O verde deve aparecer como elemento de identidade, profundidade e destaque.

O champagne deve ser utilizado com bastante moderação.

### Tipografia

Utilize uma combinação tipográfica elegante:

- Cormorant Garamond para títulos, chamadas e textos editoriais.
- DM Sans para navegação, descrições, botões e informações gerais.

A tipografia deve ter presença, hierarquia e bastante respiro.

### Direção visual

Quero:
- Fotografias grandes e impactantes.
- Composições assimétricas.
- Espaços negativos generosos.
- Elementos gráficos discretos.
- Texturas naturais.
- Contraste entre pedra, madeira, tecidos e metal.
- Transições suaves.
- Animações refinadas.

EVITE:
- Aparência de template pronto.
- Layout de e-commerce genérico.
- Cards excessivos.
- Bordas em todos os elementos.
- Gradientes coloridos sem propósito.
- Botões exageradamente arredondados.
- Animações infantis ou chamativas.
- Excesso de informações na primeira dobra.

---

## 2. NAVBAR — ESTRUTURA COMPLETA

Desenvolva uma navbar premium, minimalista e responsiva.

Ela deve apresentar todas as opções de navegação previstas para o futuro site:

1. Home
2. Coleção
3. Materiais
4. Ambientes
5. Sobre a Vert
6. Contato

Inclua também a identidade visual da marca, preferencialmente com um wordmark elegante.

A navbar deve:
- Ter aparência sofisticada.
- Ser transparente ou integrada ao Hero inicialmente.
- Ganhar um fundo sólido ou efeito de vidro discreto durante o scroll, caso faça sentido.
- Ter animações suaves nos estados de hover.
- Apresentar um indicador visual para a página ativa.
- Ter menu mobile bem elaborado.
- Possuir transições elegantes na abertura e fechamento.

**IMPORTANTE:** por enquanto, implemente somente a página Home. Não desenvolva as páginas internas. Entretanto, mantenha todas as opções visíveis na navbar e deixe a arquitetura preparada para receber essas páginas posteriormente.

Os links das páginas futuras não devem levar para páginas inexistentes nem apresentar comportamentos quebrados. Podem funcionar como âncoras para seções correspondentes da Home quando aplicável.

---

## 3. HERO — A GRANDE EXPERIÊNCIA DA VERT DECOR

Esta é a seção mais importante do projeto.

Quero que a primeira dobra seja extraordinária.

A ideia principal é criar um showroom digital com uma mesa de mármore 3D como protagonista.

### Composição

Imagine:
- Fundo off-white ou areia.
- Uma mesa de mármore em destaque, ocupando grande parte da área central.
- Iluminação de estúdio sofisticada.
- Sombras realistas.
- Navegação discreta.
- Tipografia editorial.
- Elementos gráficos minimalistas.

A mesa deve parecer uma peça de design exposta em uma galeria.

### Experiência 3D

Utilize Three.js com React Three Fiber, se a estrutura do projeto permitir.

Crie ou utilize um modelo 3D de mesa lateral de design contemporâneo, preferencialmente com tampo circular e base escultural.

O objeto deve permitir:

- Rotação por interação com o mouse.
- Controle de visualização.
- Zoom moderado.
- Iluminação realista.
- Sombras suaves.
- Materiais PBR.

### Seletor de pedras

Implemente controles para trocar o acabamento da mesa.

Sugestões de materiais:

- Mármore Verde.
- Mármore Calacatta.
- Mármore Nero Marquina.
- Travertino.

Ao selecionar uma opção, a textura do objeto deve mudar com uma transição suave.

Não quero apenas trocar a cor da mesa: procure utilizar texturas que reproduzam os veios e características visuais das pedras naturais.

Utilize mapas de textura adequados, quando disponíveis.

Se não houver modelos ou texturas reais disponíveis, desenvolva uma solução visual provisória convincente e deixe explícito onde os assets definitivos deverão ser inseridos.

### Textos do Hero

Utilize como direção de copy:

Pequena identificação:
DESIGN • MATÉRIA • PERSONALIDADE

Título principal:
"A natureza encontra sua forma mais elegante."

Descrição:
"Peças que transformam ambientes através da beleza dos materiais naturais e da sofisticação do design."

CTA principal:
"Explore nossa coleção"

CTA secundário:
"Conheça a Vert Decor"

Inclua também uma identificação discreta da coleção, como:
VERT COLLECTION — Nº 001

### Animação de entrada

Crie uma apresentação cinematográfica:

1. A identidade da marca aparece suavemente.
2. A navegação se revela.
3. O objeto 3D entra em cena.
4. O título aparece com uma animação tipográfica elegante.
5. Os controles de materiais são apresentados.

A animação deve ser fluida e refinada, sem atrasar desnecessariamente a interação.

---

## 4. SEÇÃO MANIFESTO — A ESSÊNCIA DA MARCA

Após o Hero, crie uma transição visual impactante.

Utilize o verde floresta como fundo e desenvolva uma seção editorial com bastante espaço negativo.

Título:

"A beleza não precisa ser explicada. Ela precisa ser sentida."

Texto:

"Acreditamos que os materiais naturais carregam histórias, personalidade e singularidade. Cada peça é uma oportunidade de transformar um ambiente em algo verdadeiramente especial."

Assinatura:

DESIGN QUE ENCONTRA A NATUREZA.

### Interações

- Revelação progressiva da tipografia durante o scroll.
- Animações suaves de entrada.
- Transição elegante entre as cores de fundo.
- Elementos gráficos discretos.

---

## 5. SEÇÃO MATERIAIS — A BELEZA DA PEDRA

Crie uma seção dedicada aos materiais utilizados nas peças.

Quero uma experiência visual que valorize as texturas naturais.

Apresente os materiais em uma composição editorial com fotografias de alta qualidade.

Materiais iniciais:

- Verde.
- Calacatta.
- Nero Marquina.
- Travertino.

Cada material deve possuir:
- Fotografia ou textura em alta resolução.
- Nome.
- Pequena descrição.
- Elemento visual de identificação.
- Interação ao passar o mouse.
- Possibilidade de explorar o material em destaque.

A seção pode utilizar imagens em tela cheia, parallax e transições de aproximação.

Quero que o visitante consiga praticamente sentir a textura da pedra através da experiência visual.

Não invente informações técnicas sobre procedência ou composição dos materiais.

---

## 6. SEÇÃO COLEÇÃO — PEÇAS DE DESIGN

Apresente as peças da Vert Decor em uma galeria editorial.

Categorias iniciais:

- Mesas laterais.
- Mesas de centro.
- Mesas de apoio.
- Carrinhos e bares.

Não utilize uma grade tradicional de e-commerce.

Prefira composições assimétricas, fotografias grandes e alternância de proporções.

Cada peça deve apresentar:
- Fotografia.
- Nome.
- Categoria.
- Breve descrição.
- Link para conhecer a peça.

### Interatividade

Ao passar o mouse:
- A imagem pode ampliar suavemente.
- O nome pode aparecer com uma animação.
- Um pequeno indicador pode convidar à exploração.

Ao clicar, prepare uma estrutura de apresentação detalhada da peça. A página interna será desenvolvida futuramente.

Utilize dados organizados em estruturas reutilizáveis para facilitar a implementação posterior de um catálogo real.

---

## 7. SEÇÃO AMBIENTES — INSPIRAÇÃO E COMPOSIÇÃO

Crie uma galeria de ambientes que mostre as peças integradas à decoração.

Referências:
- Salas contemporâneas.
- Ambientes com sofás em tons neutros.
- Espaços com madeira natural.
- Home bars sofisticados.
- Ambientes com iluminação natural.

Quero uma galeria horizontal interativa, com navegação por arraste e transições elegantes.

Se possível, adicione pontos interativos nas fotografias para identificar as peças em destaque.

Essa seção deve transmitir inspiração e ajudar o visitante a imaginar os produtos em sua própria casa.

---

## 8. SEÇÃO SOBRE A VERT

Crie uma seção institucional curta, elegante e visualmente forte.

Apresente a filosofia da marca, sua relação com os materiais naturais e sua proposta de transformar ambientes através do design.

Não invente história, fundação, premiações, fornecedores ou informações comerciais que ainda não foram fornecidas.

Utilize textos conceituais e deixe a estrutura preparada para receber informações reais posteriormente.

---

## 9. CTA FINAL — CONTATO

Finalize a Home com uma seção visualmente impactante.

Sugestão de chamada:

"Seu espaço conta uma história. Escolha como ela será contada."

Descrição:

"Descubra peças que traduzem personalidade em cada detalhe."

CTA:
"Fale com a Vert Decor"

O botão deverá estar preparado para direcionar ao WhatsApp quando o número comercial for fornecido.

Não invente números ou links.

---

## 10. RODAPÉ

Desenvolva um rodapé minimalista contendo:

- Identidade da Vert Decor.
- Navegação principal.
- Instagram.
- Contato.
- WhatsApp.
- Direitos reservados.

Utilize placeholders organizados para os dados ainda não fornecidos.

---

## 11. ANIMAÇÕES E EXPERIÊNCIA

Quero uma experiência com movimentos bem pensados.

Considere:

- GSAP para animações complexas e ScrollTrigger.
- Framer Motion para microinterações.
- Lenis para scroll suave.
- Three.js para o objeto 3D.

Explore:
- Parallax.
- Revelação de textos.
- Máscaras de imagens.
- Transições de seções.
- Animações de entrada.
- Interações de hover.
- Navegação horizontal.
- Mudanças de materiais no objeto 3D.

Não use animações apenas para preencher espaço.

Cada animação precisa contribuir para a narrativa visual ou para a experiência de navegação.

Respeite `prefers-reduced-motion` e não prejudique a navegação por teclado.

---

## 12. RESPONSIVIDADE E PERFORMANCE

O site precisa funcionar muito bem em:

- Desktop.
- Notebook.
- Tablet.
- Smartphones.

A experiência 3D deve ser otimizada.

Considere:
- Carregamento progressivo do modelo.
- Imagem de fallback durante o carregamento.
- Compressão de texturas.
- Lazy loading de imagens.
- Redução de qualidade 3D em dispositivos menos potentes.
- Alternativa visual para dispositivos sem suporte a WebGL.
- Evitar travamentos durante o scroll.
- Navegação mobile própria.

Não sacrifique a performance em nome dos efeitos visuais.

---

## 13. DIRETRIZES DE DESENVOLVIMENTO

Antes de começar:

1. Analise a estrutura existente do projeto.
2. Identifique as tecnologias e dependências já instaladas.
3. Preserve configurações e componentes úteis.
4. Defina uma estrutura organizada e escalável.
5. Evite reescrever partes funcionais sem necessidade.

Se o projeto ainda não estiver configurado, proponha uma estrutura adequada utilizando Next.js, React e TypeScript.

Organize componentes de maneira reutilizável.

Separe:
- Navbar.
- Hero.
- Modelo 3D.
- Seletor de materiais.
- Manifesto.
- Materiais.
- Coleção.
- Ambientes.
- Sobre.
- CTA.
- Footer.

Centralize os dados temporários dos produtos e materiais para facilitar futuras alterações.

Não deixe tudo concentrado em um único componente.

### IMPORTANTE SOBRE AS IMAGENS

Utilize imagens de referência de alta qualidade, preferencialmente fotografias editoriais de mobiliário e interiores contemporâneos.

Não utilize imagens genéricas de baixa qualidade.

Não simule produtos reais da Vert Decor como se fossem fotografias oficiais.

Os assets definitivos serão substituídos posteriormente pelas fotografias fornecidas pela marca.

### IMPORTANTE SOBRE O ESCOPO

Neste primeiro momento, desenvolva somente a HOME.

Não implemente:
- Checkout.
- Carrinho.
- Pagamentos.
- Sistema de pedidos.
- Painel administrativo.
- Banco de dados de produtos.
- Páginas internas completas.

A estrutura deve permitir a evolução para um e-commerce futuramente, mas agora estamos construindo um site institucional premium.

---

## 14. CRITÉRIOS DE QUALIDADE

Antes de considerar o trabalho concluído, avalie:

- O Hero realmente impressiona?
- A mesa 3D parece um objeto de design real?
- A troca de materiais funciona?
- A tipografia transmite sofisticação?
- A identidade é consistente?
- As seções possuem ritmo visual?
- As animações são fluidas?
- A navbar funciona em todas as resoluções?
- A experiência mobile está bem resolvida?
- O site tem aparência de uma marca premium ou de um template?

Não entregue apenas um wireframe ou uma demonstração estática.

Quero a Home efetivamente implementada, navegável, responsiva e com as interações funcionando.

**PRINCIPAL DIRETRIZ CRIATIVA:**

Seja ousado na direção de arte, mas elegante na execução.

A Vert Decor precisa transmitir a sensação de uma marca de design de interiores consolidada.

Quero que a primeira impressão do visitante seja:

"Uau. Que marca bonita. Quero conhecer essas peças."

Agora analise o projeto e comece a implementação.