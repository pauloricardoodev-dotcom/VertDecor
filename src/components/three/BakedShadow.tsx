import { useMemo } from 'react';
import { CanvasTexture, SRGBColorSpace } from 'three';

/**
 * Sombra de contato "baked": a mesa é simétrica e estática (só a câmera gira),
 * então um gradiente radial reproduz a sombra com custo praticamente zero.
 */
export function BakedShadow({ size = 1.15 }: { size?: number }) {
  const texture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    // pé (r≈0.165) → sombra densa; tampo (r≈0.3) → penumbra suave
    g.addColorStop(0, 'rgba(22,32,27,0.62)');
    g.addColorStop(0.2, 'rgba(22,32,27,0.5)');
    g.addColorStop(0.27, 'rgba(22,32,27,0.3)');
    g.addColorStop(0.45, 'rgba(22,32,27,0.12)');
    g.addColorStop(0.7, 'rgba(22,32,27,0.04)');
    g.addColorStop(1, 'rgba(22,32,27,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
  }, []);

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.0005, 0]} renderOrder={-1}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}
