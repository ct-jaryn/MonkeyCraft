import * as THREE from "../lib/three.js";

function loadTexture(relativePath) {
  const texture = new THREE.TextureLoader().load(
    new URL(relativePath, import.meta.url).href
  );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createCrackTextures(steps = 10) {
  const textures = [];
  for (let i = 0; i < steps; i += 1) {
    textures.push(
      loadTexture(`../../assets/minecraft/textures/block/destroy_stage_${i}.png`)
    );
  }
  return textures;
}
