import { materials } from '../../../data/materials';
import type { ProductArtKind } from '../../../types';

/**
 * Ilustrações PROVISÓRIAS das peças: tampo de mármore (textura da pedra) sobre estrutura de
 * ferro. Não simulam fotos de produto oficial (regra 6). Substituir por fotografia quando houver.
 * Todas usam o mesmo viewBox 400×500 para que os patterns de pedra (ProductDefs) sirvam a todas.
 */
const GROUND = 446;
const stone = (id: string) => `url(#stone-${id})`;
const EDGE = 'rgba(23,59,50,0.28)';
const IRON = '#25282a';
const IRON_HI = '#8b9296';

/** Defs compartilhadas: texturas das pedras + sombreamentos. Renderizar uma vez por página. */
export function ProductDefs({ armed }: { armed: boolean }) {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {materials.map((m) => (
          <pattern key={m.id} id={`stone-${m.id}`} patternUnits="userSpaceOnUse" width="400" height="500">
            <rect width="400" height="500" fill="#d9d2c4" />
            {armed && <image href={m.textures.color1k} width="400" height="500" preserveAspectRatio="xMidYMid slice" />}
          </pattern>
        ))}
        <linearGradient id="shade-side" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.4" />
          <stop offset="0.28" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.55" stopColor="#000" stopOpacity="0.02" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="shade-top" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ground-shadow">
          <stop offset="0" stopColor="#173B32" stopOpacity="0.34" />
          <stop offset="1" stopColor="#173B32" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function Shadow({ rx }: { rx: number }) {
  return <ellipse cx="200" cy={GROUND} rx={rx} ry={rx * 0.085} fill="url(#ground-shadow)" />;
}

/** Tampo/disco de pedra: lateral + face elíptica. */
function Slab({ cx, y, rx, ry, h, mat }: { cx: number; y: number; rx: number; ry: number; h: number; mat: string }) {
  const side = `M${cx - rx} ${y}V${y + h}A${rx} ${ry} 0 0 0 ${cx + rx} ${y + h}V${y}Z`;
  return (
    <g>
      <path d={side} fill={stone(mat)} />
      <path d={side} fill="url(#shade-side)" />
      <path d={side} fill="none" stroke={EDGE} strokeWidth="1" />
      <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill={stone(mat)} />
      <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill="url(#shade-top)" />
      <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill="none" stroke={EDGE} strokeWidth="1" />
    </g>
  );
}

/** Barra de ferro com um fio de brilho. */
function Rod({ x1, y1, x2, y2, w = 6 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) {
  return (
    <g strokeLinecap="round" fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={IRON} strokeWidth={w} />
      <line x1={x1 - w * 0.22} y1={y1} x2={x2 - w * 0.22} y2={y2} stroke={IRON_HI} strokeWidth={w * 0.2} opacity="0.55" />
    </g>
  );
}

function Ring({ cx, cy, rx, ry, w = 5 }: { cx: number; cy: number; rx: number; ry: number; w?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={IRON} strokeWidth={w} />;
}

/** Mesa de ferro em tripé com aro de travamento e tampo de mármore. */
function TripodUnit({ cx, top, rx, mat, bottom = 436 }: { cx: number; top: number; rx: number; mat: string; bottom?: number }) {
  const ry = rx * 0.24;
  const h = Math.max(9, rx * 0.1);
  const yu = top + h + ry * 0.866;
  const yf = top + h + ry;
  const lx = cx - rx * 0.5;
  const rxp = cx + rx * 0.5;
  const fx = rx * 0.28; // abertura dos pés
  const w = Math.max(4, rx * 0.05);
  const yr = yu + (bottom - yu) * 0.7;
  const t = (yr - yu) / (bottom - yu);
  const ringRx = rx * 0.5 + fx * t;
  return (
    <g>
      <Rod x1={lx} y1={yu} x2={lx - fx} y2={bottom} w={w} />
      <Rod x1={rxp} y1={yu} x2={rxp + fx} y2={bottom} w={w} />
      <Ring cx={cx} cy={yr} rx={ringRx} ry={ringRx * 0.2} w={w * 0.8} />
      <Rod x1={cx} y1={yf} x2={cx} y2={bottom + ry * 0.55} w={w} />
      <Slab cx={cx} y={top} rx={rx} ry={ry} h={h} mat={mat} />
    </g>
  );
}

function Cart() {
  const wheel = (x: number, y: number) => (
    <circle key={`${x}${y}`} cx={x} cy={y} r="9" fill={IRON} stroke={IRON_HI} strokeWidth="2" />
  );
  return (
    <g>
      <Shadow rx={150} />
      {/* estrutura de trás + puxador */}
      <path d="M84 206V122Q84 112 94 112H306Q316 112 316 122V206" fill="none" stroke={IRON} strokeWidth="6" strokeLinecap="round" />
      <Rod x1={84} y1={206} x2={84} y2={420} w={6} />
      <Rod x1={316} y1={206} x2={316} y2={420} w={6} />
      <Slab cx={200} y={330} rx={116} ry={27} h={9} mat="travertino" />
      <Rod x1={142} y1={236} x2={142} y2={426} w={6} />
      <Rod x1={258} y1={236} x2={258} y2={426} w={6} />
      <Slab cx={200} y={206} rx={116} ry={27} h={9} mat="travertino" />
      {[wheel(84, 428), wheel(316, 428), wheel(142, 436), wheel(258, 436)]}
    </g>
  );
}

function Duna() {
  return (
    <g fill="none" strokeLinecap="round">
      <Shadow rx={150} />
      <path d="M150 438V358A50 50 0 0 1 250 358V438" stroke={IRON} strokeWidth="6" />
      <path d="M116 444V352A84 84 0 0 1 284 352V444" stroke={IRON} strokeWidth="9" />
      <path d="M112.5 444V352A87.5 87.5 0 0 1 193 266" stroke={IRON_HI} strokeWidth="1.8" opacity="0.5" />
      <Slab cx={200} y={262} rx={156} ry={37} h={14} mat="travertino" />
    </g>
  );
}

function Pilar({ mat }: { mat: string }) {
  return (
    <g>
      <Shadow rx={100} />
      <Rod x1={146} y1={186} x2={140} y2={428} w={6} />
      <Rod x1={254} y1={186} x2={260} y2={428} w={6} />
      <Ring cx={200} cy={352} rx={60} ry={12} w={4.5} />
      <Rod x1={170} y1={196} x2={166} y2={442} w={6} />
      <Rod x1={230} y1={196} x2={234} y2={442} w={6} />
      <Slab cx={200} y={150} rx={88} ry={22} h={13} mat={mat} />
    </g>
  );
}

function Orbe({ mat }: { mat: string }) {
  return (
    <g>
      <Shadow rx={170} />
      <Rod x1={112} y1={330} x2={98} y2={424} w={7} />
      <Rod x1={288} y1={330} x2={302} y2={424} w={7} />
      <Ring cx={200} cy={408} rx={108} ry={19} w={5} />
      <Rod x1={152} y1={352} x2={146} y2={440} w={7} />
      <Rod x1={248} y1={352} x2={254} y2={440} w={7} />
      <Slab cx={200} y={300} rx={160} ry={40} h={18} mat={mat} />
    </g>
  );
}

export function ProductArt({ kind, materialIds }: { kind: ProductArtKind; materialIds: string[] }) {
  const m0 = materialIds[0];
  return (
    <svg className="product-art" viewBox="0 0 400 500" aria-hidden="true" focusable="false">
      {kind === 'aurora' && (
        <>
          <Shadow rx={110} />
          <TripodUnit cx={200} top={176} rx={118} mat={m0} />
        </>
      )}
      {kind === 'orbe' && <Orbe mat={m0} />}
      {kind === 'pilar' && <Pilar mat={m0} />}
      {kind === 'alameda' && <Cart />}
      {kind === 'duna' && <Duna />}
      {kind === 'mare' && (
        <>
          <Shadow rx={190} />
          <TripodUnit cx={200} top={196} rx={74} mat={materialIds[1] ?? m0} bottom={430} />
          <TripodUnit cx={296} top={254} rx={60} mat={materialIds[2] ?? m0} bottom={438} />
          <TripodUnit cx={104} top={282} rx={54} mat={m0} bottom={442} />
        </>
      )}
    </svg>
  );
}
