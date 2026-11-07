// Gera versões otimizadas da logo oficial (public/logo/*.png) para uso no site.
import sharp from 'sharp';
const SRC = 'public/logo/Logo minimalista VERT _ DE COR.png';
const OUT = 'public/logo';

const trimmed = await sharp(SRC).trim().png().toBuffer();
const meta = await sharp(trimmed).metadata();
console.log('trimmed', meta.width, meta.height);

for (const w of [360, 720]) {
  await sharp(trimmed).resize(w).webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}/vert-decor-${w}.webp`);
  // Variante clara (off-white) para fundos verdes: mantém o alfa e pinta tudo de #F7F5EF
  const { data, info } = await sharp(trimmed).resize(w).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) { data[i] = 247; data[i + 1] = 245; data[i + 2] = 239; }
  await sharp(data, { raw: info }).webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}/vert-decor-light-${w}.webp`);
}

// Monograma "VD" (recorte da parte esquerda da logo original) para favicon / ícones
const crop = await sharp(SRC).extract({ left: 75, top: 180, width: 560, height: 360 }).png().toBuffer();
const mono = await sharp(crop).trim().png().toBuffer();
const square = async (size, pad) => {
  const inner = await sharp(mono).resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#F7F5EF' } })
    .composite([{ input: inner, gravity: 'center' }]).png();
};
await (await square(64, 6)).toFile('public/favicon-64.png');
await (await square(180, 22)).toFile('public/apple-touch-icon.png');
console.log('ok');
