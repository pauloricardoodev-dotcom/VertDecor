import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Vector3 } from 'three';
import type { DeviceTier } from '../../lib/device';
import { TableModel } from './TableModel';
import { BakedShadow } from './BakedShadow';
import './TableScene.scss';

export interface TableSceneProps {
  materialId: string;
  tier: DeviceTier;
  reducedMotion: boolean;
  onReady: () => void;
  /** Modo de captura dos posters (scripts/capture-posters.mjs). */
  capture?: boolean;
}

// Câmera inicial — os posters estáticos são renderizados deste mesmo ângulo
export const CAMERA_POSITION: [number, number, number] = [1.08, 1.16, 1.36];
export const TARGET: [number, number, number] = [0, 0.2, 0];
const ZOOM_LEVELS = [0.78, 1, 1.22]; // multiplicador da distância
const BASE_DISTANCE = new Vector3(...CAMERA_POSITION).distanceTo(new Vector3(...TARGET));

function ZoomRig({ level, controls }: { level: number; controls: React.RefObject<OrbitControlsImpl | null> }) {
  const camera = useThree((s) => s.camera);
  const target = useMemo(() => new Vector3(...TARGET), []);
  const dir = useMemo(() => new Vector3(), []);
  useFrame((_, dt) => {
    const desired = BASE_DISTANCE * ZOOM_LEVELS[level];
    dir.subVectors(camera.position, target);
    const d = dir.length();
    if (Math.abs(d - desired) < 0.0005) return;
    dir.setLength(d + (desired - d) * Math.min(1, dt * 6));
    camera.position.copy(target).add(dir);
    controls.current?.update();
  });
  return null;
}

function Studio({ tier }: { tier: DeviceTier }) {
  return (
    <>
      <ambientLight intensity={0.35} color="#F7F5EF" />
      <directionalLight position={[2.5, 4, 2]} intensity={1.6} color="#FFF8EC" />
      <directionalLight position={[-3, 2, -1]} intensity={0.45} color="#E9E2D5" />
      {/* Iluminação de estúdio procedural (sem download de HDRI) */}
      <Environment resolution={tier === 'low' ? 128 : 256} frames={1}>
        <Lightformer intensity={1.6} rotation-x={Math.PI / 2} position={[-0.6, 4, 0]} scale={[0.6, 6, 1]} />
        <Lightformer intensity={1.6} rotation-x={Math.PI / 2} position={[0.6, 4, 0]} scale={[0.6, 6, 1]} />
        <Lightformer intensity={1.4} rotation-y={Math.PI / 2} position={[-4, 1.2, 0]} scale={[10, 1.2, 1]} />
        <Lightformer intensity={0.9} rotation-y={-Math.PI / 2} position={[4, 1.4, 1]} scale={[10, 1, 1]} color="#E9E2D5" />
        <Lightformer intensity={1.2} position={[0, 1, 5]} scale={[6, 2, 1]} />
        <Lightformer form="ring" intensity={2} position={[2.5, 3, -2]} scale={1.4} />
      </Environment>
    </>
  );
}

export default function TableScene({ materialId, tier, reducedMotion, onReady, capture = false }: TableSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const controls = useRef<OrbitControlsImpl | null>(null);
  const [visible, setVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [interacted, setInteracted] = useState(false);

  // pausa o render quando o hero sai da tela
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || capture) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [capture]);

  // no toque, permite rolar a página na vertical e girar a mesa na horizontal
  useEffect(() => {
    const el = controls.current?.domElement as HTMLElement | undefined;
    if (el) el.style.touchAction = 'pan-y';
  });

  return (
    <div ref={wrapRef} className="stage3d">
      <Canvas
        className="stage3d__canvas"
        dpr={capture ? 2 : tier === 'low' ? [1, 1.5] : [1, 2]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: CAMERA_POSITION, fov: 30, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: capture }}
        aria-hidden="true"
      >
        <Studio tier={tier} />
        <TableModel materialId={materialId} tier={tier} onReady={onReady} />
        <BakedShadow />
        <OrbitControls
          ref={controls}
          target={TARGET}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
          minPolarAngle={0.55}
          maxPolarAngle={1.42}
          autoRotate={!capture && !reducedMotion && !interacted}
          autoRotateSpeed={0.55}
          onStart={() => setInteracted(true)}
        />
        {!capture && <ZoomRig level={zoom} controls={controls} />}
      </Canvas>

      {!capture && (
        <div className="stage3d__controls" role="group" aria-label="Controles de visualização da peça">
          <span className="stage3d__hint" aria-hidden="true">Arraste para girar</span>
          <button type="button" onClick={() => setZoom((z) => Math.max(0, z - 1))} disabled={zoom === 0} aria-label="Aproximar">+</button>
          <button type="button" onClick={() => setZoom((z) => Math.min(2, z + 1))} disabled={zoom === 2} aria-label="Afastar">−</button>
          <button
            type="button"
            onClick={() => { setZoom(1); controls.current?.reset(); setInteracted(false); }}
            aria-label="Restaurar visualização"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v2.5h2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
