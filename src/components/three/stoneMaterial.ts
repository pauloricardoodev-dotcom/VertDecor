import { MeshPhysicalMaterial, type Texture } from 'three';
import type { StoneFinish } from '../../types';

/**
 * Material PBR de pedra polida com crossfade entre duas texturas (uMix 0 → 1).
 * Quando houver mapas definitivos (roughness/normal), adicioná-los aqui.
 */
export function createStoneMaterial(initial: Texture, finish: StoneFinish) {
  const uniforms = {
    uMapB: { value: initial },
    uMix: { value: 0 },
  };

  const material = new MeshPhysicalMaterial({
    map: initial,
    roughness: finish.roughness,
    clearcoat: finish.clearcoat,
    clearcoatRoughness: finish.clearcoatRoughness,
    reflectivity: 0.5,
    envMapIntensity: 1,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uMapB = uniforms.uMapB;
    shader.uniforms.uMix = uniforms.uMix;
    shader.fragmentShader =
      'uniform sampler2D uMapB;\nuniform float uMix;\n' +
      shader.fragmentShader.replace(
        '#include <map_fragment>',
        /* glsl */ `
        #ifdef USE_MAP
          vec4 sampledDiffuseColor = mix( texture2D( map, vMapUv ), texture2D( uMapB, vMapUv ), uMix );
          diffuseColor *= sampledDiffuseColor;
        #endif
        `,
      );
  };

  return { material, uniforms };
}
