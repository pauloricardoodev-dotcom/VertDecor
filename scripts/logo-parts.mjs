// Gera as máscaras da logo "metálica": D (monograma) e DE COR em ouro; o resto (V, VERT, divisor) em cromado.
// Fonte: public/logo/Logo minimalista VERT _ DE COR.png (cores originais: V azul, D dourado).
// Saída: public/logo/vert-decor-{chrome,gold-d,gold-decor}-1000.webp (branco + alfa, mesmas dimensões)
import sharp from 'sharp';

const SRC = 'public/logo/Logo minimalista VERT _ DE COR.png';
const W = 1000;
const DECOR_FROM = 0.755; // a partir daqui (fração da largura) começa "DE COR"; o divisor fica antes

const { data, info } = await sharp(await sharp(SRC).trim().toBuffer()).resize({ width: W }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;

const chrome = Buffer.alloc(w * h * 4);
const goldD = Buffer.alloc(w * h * 4);
const goldDecor = Buffer.alloc(w * h * 4);

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * c;
    const o = (y * w + x) * 4;
    const [r, , b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    // "dourado" = mais vermelho que azul (o V e o resto são azuis)
    const gold = Math.min(1, Math.max(0, (r - b - 25) / 70));
    const inDecor = x / w >= DECOR_FROM;
    for (const buf of [chrome, goldD, goldDecor]) { buf[o] = buf[o + 1] = buf[o + 2] = 255; }
    chrome[o + 3] = inDecor ? 0 : Math.round(a * (1 - gold));
    goldD[o + 3] = inDecor ? 0 : Math.round(a * gold);
    goldDecor[o + 3] = inDecor ? a : 0;
  }
}

const save = (buf, name) =>
  sharp(buf, { raw: { width: w, height: h, channels: 4 } }).webp({ quality: 88, alphaQuality: 100 }).toFile(`public/logo/${name}-1000.webp`);

await Promise.all([save(chrome, 'vert-decor-chrome'), save(goldD, 'vert-decor-gold-d'), save(goldDecor, 'vert-decor-gold-decor')]);
console.log(`ok ${w}x${h}`);
