import { useMemo } from 'react';
import { CanvasTexture, CustomBlending, OneFactor, OneMinusSrcAlphaFactor, SRGBColorSpace, SrcAlphaFactor } from 'three';

/**
 * Sombra de contato "baked": a mesa é simétrica e estática (só a câmera gira),
 * então um gradiente radial reproduz a sombra com custo praticamente zero.
 */
export function BakedShadow({ size = 1.15 }: { size?: number }) {
  const texture = useMemo(() => {
    // RGB fixo e só o alfa varia (via ImageData): o gradiente do canvas 2D, ao "desmultiplicar" alfas
    // quase nulos, gerava pixels claros que tingiam o canvas inteiro quando a câmera chegava perto.
    const N = 256;
    const c = document.createElement('canvas');
    c.width = c.height = N;
    const ctx = c.getContext('2d')!;
    const img = ctx.createImageData(N, N);
    // pé (r≈0.165) → sombra densa; tampo (r≈0.3) → penumbra suave. O alfa chega a 0 antes de r=0.7:
    // com o zoom o canvas enxerga só essa parte do plano e um resto de sombra viraria um retângulo.
    const stops: [number, number][] = [[0, 0.62], [0.2, 0.5], [0.27, 0.3], [0.42, 0.1], [0.58, 0.02], [0.7, 0]];
    const alphaAt = (r: number) => {
      for (let i = 1; i < stops.length; i++) {
        if (r <= stops[i][0]) {
          const [r0, a0] = stops[i - 1];
          const [r1, a1] = stops[i];
          return a0 + ((a1 - a0) * (r - r0)) / (r1 - r0);
        }
      }
      return 0;
    };
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const r = Math.hypot(x + 0.5 - N / 2, y + 0.5 - N / 2) / (N / 2);
        const o = (y * N + x) * 4;
        img.data[o] = 22; img.data[o + 1] = 32; img.data[o + 2] = 27;
        img.data[o + 3] = Math.round(alphaAt(r) * 255);
      }
    }
    ctx.putImageData(img, 0, 0);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
  }, []);

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.0005, 0]} renderOrder={-1}>
      <planeGeometry args={[size, size]} />
      {/* alfa composto corretamente (src.a + dst.a·(1−src.a)): com o blend padrão o canvas
          premultiplicado clareava toda a área da sombra quando a câmera chegava perto */}
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
        blending={CustomBlending}
        blendSrc={SrcAlphaFactor}
        blendDst={OneMinusSrcAlphaFactor}
        blendSrcAlpha={OneFactor}
        blendDstAlpha={OneMinusSrcAlphaFactor}
      />
    </mesh>
  );
}
