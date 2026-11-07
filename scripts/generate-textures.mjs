// Gera texturas PROVISÓRIAS das pedras (procedurais) em /public/textures/<id>/.
// Quando a Vert Decor fornecer scans reais, basta substituir color-2k.webp, color-1k.webp e swatch.webp.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { createNoise2D } from 'simplex-noise';

const SIZE = 2048;

function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp = (v) => Math.min(1, Math.max(0, v));
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };

function makeNoise(seed) {
  const r = rng(seed);
  const n = [0, 1, 2, 3, 4, 5].map(() => createNoise2D(r));
  const fbm = (k, x, y, oct = 5) => {
    let s = 0, a = 0.5, f = 1;
    for (let i = 0; i < oct; i++) { s += a * n[k](x * f, y * f); f *= 2.03; a *= 0.5; }
    return s; // ~[-1,1]
  };
  const ridge = (k, x, y, sharp) => Math.pow(1 - Math.abs(n[k](x, y)), sharp);
  return { n, fbm, ridge };
}

const stones = {
  calacatta(x, y, N) {
    const wx = x + 0.55 * N.fbm(0, x * 1.1, y * 1.1);
    const wy = y + 0.55 * N.fbm(1, x * 1.1 + 7, y * 1.1);
    let c = mix(hex('#F3F0EA'), hex('#E4DED3'), clamp(N.fbm(2, x * 2, y * 2) * 0.6 + 0.5));
    const bold = N.ridge(3, wx * 0.9, wy * 0.9 + 3, 9) * smooth(-0.2, 0.4, N.fbm(4, x * 0.8, y * 0.8, 3));
    const thin = N.ridge(5, wx * 2.6, wy * 2.6, 34);
    const web = N.ridge(4, wx * 5.5 + 9, wy * 5.5, 48) * 0.45;
    c = mix(c, hex('#B4A07C'), clamp(bold * 0.55));
    c = mix(c, hex('#6F6A63'), clamp(Math.pow(bold, 2.2) * 0.85));
    c = mix(c, hex('#8C877F'), clamp(thin * 0.75 + web));
    return c;
  },
  verde(x, y, N) {
    const wx = x + 0.4 * N.fbm(0, x * 1.6, y * 1.6);
    const wy = y + 0.4 * N.fbm(1, x * 1.6 + 5, y * 1.6);
    const m = clamp(N.fbm(2, wx * 2.2, wy * 2.2) * 0.8 + 0.5);
    let c = mix(hex('#0F2620'), hex('#2C5747'), m);
    c = mix(c, hex('#173B32'), clamp(N.fbm(3, x * 6, y * 6, 3) * 0.5 + 0.3));
    const cluster = smooth(-0.25, 0.45, N.fbm(1, x * 0.9 + 3, y * 0.9, 3));
    const net1 = N.ridge(4, wx * 1.8, wy * 1.8, 26) * (0.35 + cluster * 0.65);
    const net2 = N.ridge(5, wx * 4.6 + 3, wy * 4.6, 46) * 0.55 * cluster;
    const cloud = smooth(0.15, 0.7, N.fbm(3, wx * 1.3 + 11, wy * 1.3)) * 0.35;
    c = mix(c, hex('#5E8574'), clamp(cloud));
    c = mix(c, hex('#D3DED5'), clamp(net1 * 0.9 + net2 * 0.6));
    return c;
  },
  nero(x, y, N) {
    const wx = x + 0.5 * N.fbm(0, x * 1.2, y * 1.2);
    const wy = y + 0.5 * N.fbm(1, x * 1.2 + 4, y * 1.2);
    let c = mix(hex('#0E0E0E'), hex('#1D1C1B'), clamp(N.fbm(2, x * 3, y * 3) * 0.6 + 0.5));
    const area = smooth(-0.1, 0.5, N.fbm(3, x * 0.9, y * 0.9, 3));
    const main = N.ridge(4, wx * 1.3 + 2, wy * 1.3, 60);
    const bold = N.ridge(4, wx * 1.3 + 2, wy * 1.3, 14) * area * 0.35;
    const fine = N.ridge(5, wx * 4.2, wy * 4.2, 70) * (0.25 + area * 0.5);
    c = mix(c, hex('#5A5753'), clamp(bold));
    c = mix(c, hex('#ECE8E0'), clamp(main * (0.55 + area * 0.45) + fine));
    return c;
  },
  travertino(x, y, N) {
    const t = y * 22 + N.fbm(0, x * 1.4, y * 5) * 2.2;
    const band = Math.sin(t) * 0.5 + 0.5;
    const band2 = Math.sin(t * 2.7 + 1.3) * 0.5 + 0.5;
    let c = mix(hex('#DCC9A6'), hex('#CBB08A'), band * 0.7);
    c = mix(c, hex('#E8DBC2'), band2 * 0.35);
    c = mix(c, hex('#D4BE98'), clamp(N.fbm(1, x * 8, y * 8, 3) * 0.5 + 0.3) * 0.4);
    // poros alongados no sentido horizontal
    const p = N.n[2](x * 26, y * 110) * 0.65 + N.n[3](x * 60, y * 220) * 0.35;
    const pore = smooth(0.52, 0.68, p) * smooth(-0.3, 0.3, N.fbm(4, x * 2, y * 7, 3));
    c = mix(c, hex('#A58C66'), clamp(pore * 0.85));
    const grain = N.n[5](x * 400, y * 400) * 6;
    return [c[0] + grain, c[1] + grain, c[2] + grain];
  },
};

const seeds = { calacatta: 11, verde: 23, nero: 37, travertino: 51 };

const only = process.argv[2];
for (const [id, fn] of Object.entries(stones)) {
  if (only && id !== only) continue;
  const t0 = Date.now();
  const N = makeNoise(seeds[id]);
  const buf = Buffer.alloc(SIZE * SIZE * 3);
  for (let j = 0; j < SIZE; j++) {
    const y = (j / SIZE) * 2.2;
    for (let i = 0; i < SIZE; i++) {
      const x = (i / SIZE) * 2.2;
      const c = fn(x, y, N);
      const o = (j * SIZE + i) * 3;
      buf[o] = Math.max(0, Math.min(255, c[0]));
      buf[o + 1] = Math.max(0, Math.min(255, c[1]));
      buf[o + 2] = Math.max(0, Math.min(255, c[2]));
    }
  }
  const dir = `public/textures/${id}`;
  mkdirSync(dir, { recursive: true });
  const img = sharp(buf, { raw: { width: SIZE, height: SIZE, channels: 3 } });
  await img.clone().webp({ quality: 80, effort: 6 }).toFile(`${dir}/color-2k.webp`);
  await img.clone().resize(1024).webp({ quality: 78, effort: 6 }).toFile(`${dir}/color-1k.webp`);
  await img.clone().extract({ left: 512, top: 512, width: 1024, height: 1024 }).resize(160)
    .webp({ quality: 80 }).toFile(`${dir}/swatch.webp`);
  console.log(`${id}: ${Date.now() - t0}ms`);
}
