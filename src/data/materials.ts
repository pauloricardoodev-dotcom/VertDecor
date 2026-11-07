import type { Material } from '../types';

// Texturas atuais são PROCEDURAIS e provisórias (scripts/generate-textures.mjs).
// Para usar as definitivas: substituir os arquivos em /public/textures/<id>/ mantendo os nomes.
const tex = (id: string) => ({
  color1k: `/textures/${id}/color-1k.webp`,
  color2k: `/textures/${id}/color-2k.webp`,
  swatch: `/textures/${id}/swatch.webp`,
});

export const materials: Material[] = [
  {
    id: 'verde',
    slug: 'marmore-verde',
    name: 'Mármore Verde',
    shortName: 'Verde',
    description: 'Um verde profundo atravessado por veios claros, como uma floresta vista do alto.',
    textures: tex('verde'),
    finish: { roughness: 0.22, clearcoat: 0.7, clearcoatRoughness: 0.12 },
    poster: '/images/hero/poster-verde',
  },
  {
    id: 'calacatta',
    slug: 'marmore-calacatta',
    name: 'Mármore Calacatta',
    shortName: 'Calacatta',
    description: 'Fundo luminoso e veios marcantes que desenham movimento sobre a superfície.',
    textures: tex('calacatta'),
    finish: { roughness: 0.2, clearcoat: 0.75, clearcoatRoughness: 0.1 },
    poster: '/images/hero/poster-calacatta',
  },
  {
    id: 'nero',
    slug: 'marmore-nero-marquina',
    name: 'Mármore Nero Marquina',
    shortName: 'Nero Marquina',
    description: 'A intensidade do preto contrastada por linhas brancas finas e precisas.',
    textures: tex('nero'),
    finish: { roughness: 0.16, clearcoat: 0.85, clearcoatRoughness: 0.08 },
    poster: '/images/hero/poster-nero',
  },
  {
    id: 'travertino',
    slug: 'travertino',
    name: 'Travertino',
    shortName: 'Travertino',
    description: 'Tons quentes, camadas horizontais e uma textura que convida ao toque.',
    textures: tex('travertino'),
    finish: { roughness: 0.68, clearcoat: 0.0, clearcoatRoughness: 0.6 },
    poster: '/images/hero/poster-travertino',
  },
];
