import { useEffect, useRef, useState } from 'react';

/** `true` (para sempre) quando o elemento chega perto da viewport. Evita pedir imagens pesadas cedo demais. */
export function useNear<T extends HTMLElement = HTMLDivElement>(rootMargin = '300px 0px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, near] as const;
}
