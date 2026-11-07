export type DeviceTier = 'low' | 'high';

/** Estimativa simples da capacidade do aparelho para ajustar a qualidade do 3D. */
export function getDeviceTier(): DeviceTier {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const smallScreen = window.innerWidth < 768;
  const fewCores = (nav.hardwareConcurrency ?? 4) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  return (coarse && smallScreen) || fewCores || lowMemory ? 'low' : 'high';
}

export function supportsWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function prefersSaveData(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !!conn?.saveData;
}

/** Executa quando o navegador estiver ocioso (com fallback). */
export function onIdle(cb: () => void, timeout = 2000): () => void {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(cb, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 200);
  return () => clearTimeout(id);
}
