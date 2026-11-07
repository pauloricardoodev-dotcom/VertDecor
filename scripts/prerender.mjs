// Pós-build: injeta o HTML pré-renderizado, embute o CSS crítico e pré-carrega as fontes principais.
import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const dist = resolve(process.env.OUT_DIR ?? 'dist');
const ssrEntry = readdirSync('dist-ssr').find((f) => f.startsWith('entry-server'));
const { render } = await import(pathToFileURL(resolve('dist-ssr', ssrEntry)).href);

let html = readFileSync(`${dist}/index.html`, 'utf8');
html = html.replace('<div id="root"></div>', `<div id="root">${await render()}</div>`);

// CSS inline (evita uma requisição bloqueante no mobile)
html = html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = readFileSync(`${dist}${href}`, 'utf8');
  return `<style>${css}</style>`;
});

// Preload das fontes usadas na primeira dobra
const assets = readdirSync(`${dist}/assets`);
const fonts = ['cormorant-garamond-latin-300-normal', 'dm-sans-latin-400-normal']
  .map((n) => assets.find((f) => f.startsWith(n) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ');
html = html.replace('</title>', `</title>\n    ${fonts}`);

// O HTML já é a página completa: o JS (hidratação) só é baixado e executado depois do
// primeiro frame, para não disputar banda/CPU com o LCP (poster do Hero) em redes lentas.
html = html.replace(/<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/, (_, src) =>
  `<script type="module">requestAnimationFrame(()=>setTimeout(()=>import("${src}")))</script>`,
);
if (!html.includes('import("/assets/')) throw new Error('script de entrada não encontrado no index.html');

writeFileSync(`${dist}/index.html`, html);
rmSync('dist-ssr', { recursive: true, force: true });
console.log('prerender ok —', (html.length / 1024).toFixed(1), 'KB');
