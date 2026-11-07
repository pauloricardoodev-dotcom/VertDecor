import { useEffect, useState } from 'react';

/** Retorna o id da seção atualmente no centro da viewport. */
export function useScrollSpy(ids: string[], initial = ids[0]) {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
