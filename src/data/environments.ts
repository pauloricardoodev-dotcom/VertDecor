import type { ProductArtKind } from '../types';

// Ambientes ILUSTRATIVOS (provisórios) — trocar por fotografias de ambientes reais da marca.
export interface Environment {
  id: string;
  title: string;
  text: string;
  /** Peça em destaque (ilustração + etiqueta). */
  piece: { name: string; art: ProductArtKind; materialIds: string[] };
  /** Paleta da cena. */
  from: string;
  to: string;
}

export const environments: Environment[] = [
  {
    id: 'sala-de-estar',
    title: 'Sala de estar',
    text: 'Sofás em tons neutros, madeira natural e uma mesa de apoio que acende o canto da sala.',
    piece: { name: 'Aurora', art: 'aurora', materialIds: ['verde'] },
    from: '#e9e3d4',
    to: '#cdbf9f',
  },
  {
    id: 'home-bar',
    title: 'Home bar',
    text: 'Um carrinho em pedra e ferro para receber: taças, luz baixa e conversa sem pressa.',
    piece: { name: 'Alameda', art: 'alameda', materialIds: ['travertino'] },
    from: '#d6dfd5',
    to: '#a9bcab',
  },
  {
    id: 'sala-de-centro',
    title: 'Centro da sala',
    text: 'Tampo generoso de mármore sobre ferro: o ponto de encontro entre sofá, tapete e livros.',
    piece: { name: 'Orbe', art: 'orbe', materialIds: ['calacatta'] },
    from: '#ece7dd',
    to: '#d2c9b7',
  },
  {
    id: 'quarto',
    title: 'Quarto',
    text: 'Ao lado da cama ou da poltrona de leitura, uma peça pequena com presença silenciosa.',
    piece: { name: 'Pilar', art: 'pilar', materialIds: ['nero'] },
    from: '#dcdfd8',
    to: '#b9c0b4',
  },
  {
    id: 'varanda',
    title: 'Varanda e jardim de inverno',
    text: 'Luz natural, plantas e o calor do travertino em arcos de ferro.',
    piece: { name: 'Duna', art: 'duna', materialIds: ['travertino'] },
    from: '#e8e0cd',
    to: '#d3c39e',
  },
  {
    id: 'composicao',
    title: 'Composição em trio',
    text: 'Três alturas, três pedras. Agrupe para criar ritmo e deixe cada veio conversar com o outro.',
    piece: { name: 'Maré', art: 'mare', materialIds: ['verde', 'calacatta', 'nero'] },
    from: '#e3e6dc',
    to: '#c4cdbe',
  },
];
