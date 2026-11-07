import type { Product, ProductCategory } from '../types';

// PEÇAS FICTÍCIAS — nomes, descrições e ilustrações são provisórios, só para compor a Home.
// Substituir pelo catálogo real (com fotografias oficiais) quando fornecido pela Vert Decor.
// Estrutura em ferro + tampo de mármore/travertino (direção informada pela marca).
// Medidas, preços e dados técnicos NÃO foram inventados de propósito.

export const productCategories: ProductCategory[] = [
  { id: 'mesas-laterais', label: 'Mesas laterais' },
  { id: 'mesas-de-centro', label: 'Mesas de centro' },
  { id: 'mesas-de-apoio', label: 'Mesas de apoio' },
  { id: 'carrinhos-e-bares', label: 'Carrinhos e bares' },
];

export const products: Product[] = [
  {
    id: 'prd-001',
    slug: 'mesa-lateral-aurora',
    name: 'Aurora',
    category: 'mesas-laterais',
    description: 'Tampo circular de mármore sobre tripé de ferro com aro de travamento. Leve, gráfica e perfeita ao lado do sofá.',
    materialIds: ['verde'],
    frame: 'Ferro',
    art: 'aurora',
  },
  {
    id: 'prd-002',
    slug: 'mesa-de-centro-orbe',
    name: 'Orbe',
    category: 'mesas-de-centro',
    description: 'Tampo largo de mármore apoiado em estrutura de ferro com aros e hastes finas. Baixa, generosa, ancora a sala.',
    materialIds: ['calacatta'],
    frame: 'Ferro',
    art: 'orbe',
  },
  {
    id: 'prd-003',
    slug: 'mesa-de-apoio-pilar',
    name: 'Pilar',
    category: 'mesas-de-apoio',
    description: 'Tampo compacto de mármore sobre quatro hastes de ferro. Presença discreta, ótima companheira de poltronas e camas.',
    materialIds: ['nero'],
    frame: 'Ferro',
    art: 'pilar',
  },
  {
    id: 'prd-004',
    slug: 'carrinho-bar-alameda',
    name: 'Alameda',
    category: 'carrinhos-e-bares',
    description: 'Dois níveis de travertino sobre estrutura de ferro com rodízios, para receber com leveza.',
    materialIds: ['travertino'],
    frame: 'Ferro',
    art: 'alameda',
  },
  {
    id: 'prd-005',
    slug: 'mesa-de-centro-duna',
    name: 'Duna',
    category: 'mesas-de-centro',
    description: 'Tampo oval de travertino apoiado em arcos de ferro. Referência à arquitetura, calor de pedra natural.',
    materialIds: ['travertino'],
    frame: 'Ferro',
    art: 'duna',
  },
  {
    id: 'prd-006',
    slug: 'trio-mare',
    name: 'Maré',
    category: 'mesas-laterais',
    description: 'Três mesas de alturas diferentes, tampos de mármore em pedras distintas e pés de ferro. Cada pedra, uma voz.',
    materialIds: ['verde', 'calacatta', 'nero'],
    frame: 'Ferro',
    art: 'mare',
  },
];
