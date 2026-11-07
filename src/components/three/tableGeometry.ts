import { ExtrudeGeometry, LatheGeometry, Shape, Vector2 } from 'three';

// Mesa lateral PROVISÓRIA (procedural): tampo circular + base escultural torneada.
// Para usar o modelo definitivo: exportar .glb (Draco/Meshopt) em /public/models/mesa-lateral.glb
// e trocar estas geometrias por useGLTF no TableModel.

export const TABLE = {
  height: 0.55,
  topRadius: 0.3,
  topThickness: 0.026,
};

export function createTopGeometry() {
  const { topRadius: r, topThickness: t } = TABLE;
  const bevel = 0.008;
  const shape = new Shape();
  shape.absarc(0, 0, r - bevel, 0, Math.PI * 2, false);
  const geo = new ExtrudeGeometry(shape, {
    depth: t - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 96,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, TABLE.height - t + bevel, 0);

  geo.computeVertexNormals();
  // UV planar nas faces (vista de cima) e cilíndrico na borda, para os veios contornarem a peça
  const pos = geo.attributes.position;
  const nrm = geo.attributes.normal;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    if (Math.abs(nrm.getY(i)) > 0.5) {
      uv.setXY(i, (x + r) / (2 * r), (z + r) / (2 * r));
    } else {
      const a = Math.atan2(z, x) / (Math.PI * 2) + 0.5;
      uv.setXY(i, a * Math.PI, 0.5 + y * 1.5);
    }
  }
  uv.needsUpdate = true;
  return geo;
}

/** max suave (evita quinas no perfil) */
const smax = (a: number, b: number, k = 70) => Math.log(Math.exp(k * a) + Math.exp(k * b)) / k;

export function createBaseGeometry() {
  const h = TABLE.height - TABLE.topThickness;
  // Perfil (raio, altura): pé largo e suave, cintura fina, abertura sob o tampo
  const pts: Vector2[] = [];
  const profile = (y: number) => {
    const t = y / h;
    const foot = 0.165 * Math.exp(-Math.pow(t / 0.16, 2) * 1.6);
    const waist = 0.038 + 0.04 * Math.pow(Math.abs(t - 0.52) / 0.48, 2.2);
    const crown = 0.11 * Math.exp(-Math.pow((1 - t) / 0.12, 2) * 1.4);
    return smax(smax(foot, waist), crown);
  };
  pts.push(new Vector2(0, 0));
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const y = (i / steps) * h;
    pts.push(new Vector2(profile(y), y));
  }
  pts.push(new Vector2(0, h));
  return new LatheGeometry(pts, 96);
}
