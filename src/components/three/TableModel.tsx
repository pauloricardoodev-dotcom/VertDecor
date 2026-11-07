import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RepeatWrapping, SRGBColorSpace, TextureLoader, type Mesh, type Texture } from 'three';
import { materials } from '../../data/materials';
import type { DeviceTier } from '../../lib/device';
import type { StoneFinish } from '../../types';
import { createStoneMaterial } from './stoneMaterial';
import { createBaseGeometry, createTopGeometry } from './tableGeometry';

interface Props {
  materialId: string;
  tier: DeviceTier;
  onReady: () => void;
}

const TRANSITION = 0.9; // segundos
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function TableModel({ materialId, tier, onReady }: Props) {
  const gl = useThree((s) => s.gl);
  const loader = useMemo(() => new TextureLoader(), []);
  const cache = useRef(new Map<string, Promise<Texture>>());
  const stone = useRef<ReturnType<typeof createStoneMaterial> | null>(null);
  const transition = useRef<{ t: number; from: StoneFinish; to: StoneFinish } | null>(null);
  const readyCalled = useRef(false);
  const topRef = useRef<Mesh>(null);
  const baseRef = useRef<Mesh>(null);

  const topGeo = useMemo(createTopGeometry, []);
  const baseGeo = useMemo(createBaseGeometry, []);

  const load = (id: string) => {
    let p = cache.current.get(id);
    if (!p) {
      const m = materials.find((x) => x.id === id)!;
      const url = tier === 'low' ? m.textures.color1k : m.textures.color2k;
      p = loader.loadAsync(url).then((tex) => {
        tex.colorSpace = SRGBColorSpace;
        tex.wrapS = tex.wrapT = RepeatWrapping;
        tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
        gl.initTexture(tex); // envia à GPU antes da transição (evita engasgo)
        return tex;
      });
      cache.current.set(id, p);
    }
    return p;
  };

  useEffect(() => {
    let cancelled = false;
    const target = materials.find((m) => m.id === materialId)!;

    load(materialId).then((tex) => {
      if (cancelled) return;

      if (!stone.current) {
        stone.current = createStoneMaterial(tex, target.finish);
        if (topRef.current) topRef.current.material = stone.current.material;
        if (baseRef.current) baseRef.current.material = stone.current.material;
        if (!readyCalled.current) {
          readyCalled.current = true;
          // aguarda 2 frames para garantir que a pedra já foi desenhada
          requestAnimationFrame(() => requestAnimationFrame(onReady));
        }
        // pré-carrega as demais pedras em segundo plano
        materials.forEach((m) => m.id !== materialId && load(m.id));
        return;
      }

      const s = stone.current;
      // troca durante uma transição: consolida o estado mais visível
      if (transition.current && s.uniforms.uMix.value > 0.5) s.material.map = s.uniforms.uMapB.value;
      s.uniforms.uMapB.value = tex;
      s.uniforms.uMix.value = 0;
      transition.current = {
        t: 0,
        from: {
          roughness: s.material.roughness,
          clearcoat: s.material.clearcoat,
          clearcoatRoughness: s.material.clearcoatRoughness,
        },
        to: target.finish,
      };
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialId]);

  useFrame((_, dt) => {
    const tr = transition.current;
    const s = stone.current;
    if (!tr || !s) return;
    tr.t = Math.min(1, tr.t + dt / TRANSITION);
    const k = ease(tr.t);
    const lerp = (a: number, b: number) => a + (b - a) * k;
    s.uniforms.uMix.value = k;
    s.material.roughness = lerp(tr.from.roughness, tr.to.roughness);
    s.material.clearcoat = lerp(tr.from.clearcoat, tr.to.clearcoat);
    s.material.clearcoatRoughness = lerp(tr.from.clearcoatRoughness, tr.to.clearcoatRoughness);
    if (tr.t >= 1) {
      s.material.map = s.uniforms.uMapB.value;
      s.uniforms.uMix.value = 0;
      transition.current = null;
    }
  });

  return (
    <group>
      <mesh ref={topRef} geometry={topGeo}>
        <meshStandardMaterial color="#E9E2D5" roughness={0.5} />
      </mesh>
      <mesh ref={baseRef} geometry={baseGeo}>
        <meshStandardMaterial color="#E9E2D5" roughness={0.5} />
      </mesh>
    </group>
  );
}
