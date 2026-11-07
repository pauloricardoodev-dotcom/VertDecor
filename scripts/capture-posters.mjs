// Gera os posters estáticos do Hero renderizando a própria cena 3D (mesmo ângulo de câmera).
// Uso: npm run posters  (requer Google Chrome instalado)
import { createServer } from 'vite';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const stones = ['verde', 'calacatta', 'nero', 'travertino'];

const server = await createServer({ server: { port: 5199 }, logLevel: 'error' });
await server.listen();
const browser = await puppeteer.launch({ executablePath: CHROME, args: ['--use-angle=d3d11', '--enable-webgl', '--ignore-gpu-blocklist'] });
mkdirSync('public/images/hero', { recursive: true });

for (const stone of stones) {
  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 600, deviceScaleFactor: 2 });
  page.on('console', (m) => m.type() === 'error' && console.log('[page]', m.text()));
  await page.goto(`http://localhost:5199/capture.html?stone=${stone}`);
  await page.waitForFunction('window.__ready === true', { timeout: 60000 });
  const png = await page.screenshot({ omitBackground: true, type: 'png' });
  for (const w of [720, 1200]) {
    const img = sharp(png).resize(w);
    const out = `public/images/hero/poster-${stone}-${w}`;
    await img.clone().avif({ quality: 50, effort: 6 }).toFile(`${out}.avif`);
    await img.clone().webp({ quality: 72, alphaQuality: 50, effort: 6 }).toFile(`${out}.webp`);
  }
  console.log('poster', stone);
  await page.close();
}

await browser.close();
await server.close();
