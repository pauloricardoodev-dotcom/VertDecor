// Textos CONCEITUAIS da Home. Nada aqui é dado factual da empresa (história, prêmios, números):
// quando a marca fornecer informações reais, entram nas listas abaixo.

export const manifesto = {
  title: 'A beleza não precisa ser explicada. Ela precisa ser sentida.',
  text:
    'Acreditamos que os materiais naturais carregam histórias, personalidade e singularidade. Cada peça é uma oportunidade de transformar um ambiente em algo verdadeiramente especial.',
  signature: 'Design que encontra a natureza.',
  values: [
    { n: '01', title: 'Matéria viva', text: 'Pedras com veios únicos: cada tampo é irrepetível e conta a própria paisagem.' },
    { n: '02', title: 'Desenho contemporâneo', text: 'Linhas limpas, estruturas de ferro finas e proporções pensadas para respirar.' },
    { n: '03', title: 'Personalidade', text: 'Peças que não pedem atenção, mas ganham o olhar de quem entra no ambiente.' },
  ],
};

export const materialsIntro = {
  title: 'A beleza da pedra.',
  text:
    'Mármores e travertino escolhidos pelo que despertam: profundidade, luz, calor. Toque o veio, compare tons e imagine o tampo no seu espaço.',
  note: 'Cada chapa de pedra natural é única: o desenho dos veios varia de peça para peça.',
};

export const environmentsIntro = {
  title: 'Inspiração e composição.',
  text:
    'Veja como as peças convivem com sofás neutros, madeira natural, luz de janela e home bars sofisticados. Ambientes ilustrativos — as fotografias oficiais entram em breve.',
};

export const about = {
  title: 'Design que encontra a natureza.',
  paragraphs: [
    'A Vert Decor nasce da vontade de trazer para dentro de casa a força dos materiais naturais, com o cuidado de um design contemporâneo.',
    'Combinamos tampos de pedra e estruturas de ferro em peças que valorizam o espaço sem competir com ele: elegância sem exagero, presença sem ruído.',
  ],
  pillars: [
    { title: 'Pedra', text: 'Mármore e travertino em tampos que mostram a identidade de cada veio.' },
    { title: 'Ferro', text: 'Estruturas finas e firmes que sustentam o desenho com leveza.' },
    { title: 'Ambiente', text: 'Peças pensadas para compor: sozinhas ou em conjunto.' },
  ],
  // Estrutura pronta para dados reais (não inventar): preencher quando fornecidos.
  facts: [] as { label: string; value: string }[],
};

export const cta = {
  title: 'Seu espaço conta uma história. Escolha como ela será contada.',
  text: 'Descubra peças que traduzem personalidade em cada detalhe.',
  button: 'Fale com a Vert Decor',
  steps: ['Escolha uma peça', 'Escolha a pedra', 'Converse com a gente'],
  pending: 'Canal de atendimento em configuração.',
};
