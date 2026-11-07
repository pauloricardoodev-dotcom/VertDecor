import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls, Sparkles } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { MathUtils, Vector3, type Group, type PerspectiveCamera, type PointLight } from 'three';
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

/**
 * Coreografia da peça: giro de entrada, giro a cada troca de pedra, flutuação suave e
 * inclinação leve seguindo o cursor. Tudo por interpolação exponencial (sem easing abrupto).
 */
function Choreo({ children, materialId, started, reduced }: { children: React.ReactNode; materialId: string; started: React.RefObject<boolean>; reduced: boolean }) {
  const group = useRef<Group>(null);
  const angle = useRef(0);
  const target = useRef(0);
  const introDone = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!reduced) target.current += Math.PI; // meia volta a cada pedra nova
  }, [materialId, reduced]);

  useFrame(({ clock, pointer }, dt) => {
    const g = group.current;
    if (!g || reduced) return;
    if (started.current && !introDone.current) { introDone.current = true; target.current += Math.PI * 2; }
    const k = Math.min(1, dt * 2);
    angle.current += (target.current - angle.current) * k;
    const remaining = Math.min(1, Math.max(0, (target.current - angle.current) / Math.PI));
    g.rotation.y = angle.current;
    g.scale.setScalar(1 + 0.025 * remaining);
    g.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.012 + remaining * 0.03;
    g.rotation.x = MathUtils.damp(g.rotation.x, pointer.y * 0.045, 3, dt);
    g.rotation.z = MathUtils.damp(g.rotation.z, -pointer.x * 0.04, 3, dt);
  });

  return <group ref={group}>{children}</group>;
}

/**
 * O canvas se estende `top` px acima do palco (por baixo da navbar de vidro) sem mudar o
 * enquadramento: a projeção continua a do palco original, só há mais área desenhada em cima.
 */
function ViewExtend({ top }: { top: number }) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const size = useThree((s) => s.size);
  useLayoutEffect(() => {
    const h = size.height - top;
    camera.aspect = size.width / h;
    if (top > 0) camera.setViewOffset(size.width, h, 0, -top, size.width, size.height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }, [camera, size, top]);
  return null;
}

/** Ponto de luz quente que percorre a peça e faz o polimento da pedra reluzir. */
function Glint({ reduced }: { reduced: boolean }) {
  const light = useRef<PointLight>(null);
  useFrame(({ clock }) => {
    if (!light.current || reduced) return;
    const t = clock.elapsedTime * 0.5;
    light.current.position.set(Math.cos(t) * 1.7, 1.25 + Math.sin(t * 1.6) * 0.25, Math.sin(t) * 1.7);
  });
  return <pointLight ref={light} position={[1.7, 1.25, 0]} color="#FFE3B0" intensity={5} distance={6} decay={2} />;
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
  const started = useRef(false);
  const [extend, setExtend] = useState(0);

  // quanto o canvas ultrapassa o palco por cima (definido no CSS do Hero)
  useEffect(() => {
    const el = wrapRef.current;
    const stage = el?.closest('.hero-stage');
    if (!el || !stage || capture) return;
    const measure = () => setExtend(Math.max(0, Math.round(stage.getBoundingClientRect().top - el.getBoundingClientRect().top)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [capture]);

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
        camera={{ position: CAMERA_POSITION, fov: 30, near: 0.1, far: 20, manual: true }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: capture }}
        aria-hidden="true"
      >
        <ViewExtend top={extend} />
        <Studio tier={tier} />
        {!capture && <Glint reduced={reducedMotion} />}
        <Choreo materialId={materialId} started={started} reduced={reducedMotion || capture}>
          <TableModel materialId={materialId} tier={tier} onReady={() => { started.current = true; onReady(); }} />
        </Choreo>
        {!capture && (
          <Sparkles
            count={tier === 'low' ? 22 : 46}
            scale={[2.1, 1.3, 2.1]}
            position={[0, 0.42, 0]}
            size={tier === 'low' ? 3 : 3.6}
            speed={reducedMotion ? 0 : 0.28}
            opacity={0.85}
            color="#E4BB74"
            noise={0.6}
          />
        )}
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
        </div>
      )}
    </div>
  );
}
