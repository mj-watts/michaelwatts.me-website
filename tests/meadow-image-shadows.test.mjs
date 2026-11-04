import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createImageShadows } from "../src/lib/meadow-image-shadows.ts";
import { createMeadowDust } from "../src/lib/meadow-dust.ts";

test("butterfly shadow receivers align to the painted image through parallax and use its alpha mask", () => {
  globalThis.window = { scrollY: 0 };
  const canvas = { left: 100, top: 200, bottom: 800, width: 1000, height: 600 };
  const bounds = { left: 200, top: 440, bottom: 680, width: 500, height: 240 };
  const listeners = new Map();
  const image = { complete: false, getBoundingClientRect: () => bounds,
    addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) };
  const host = { closest: () => ({ querySelectorAll: () => [image] }), getBoundingClientRect: () => canvas };
  const camera = new THREE.PerspectiveCamera(42, 1000 / 600, 0.1, 120);
  camera.position.set(0, 7, 20);
  camera.lookAt(0, 1.5, -7);
  camera.updateMatrixWorld();
  const layer = createImageShadows(host, camera, { getDrawingBufferSize: out => out.set(1500, 900) });
  layer.sync();
  const mesh = layer.meshes[0];
  const shader = { uniforms: {}, vertexShader: THREE.ShaderLib.shadow.vertexShader, fragmentShader: THREE.ShaderLib.shadow.fragmentShader };
  mesh.material.onBeforeCompile(shader, null);
  assert.ok(mesh.receiveShadow && mesh.material.isShadowMaterial);
  assert.equal(mesh.material.depthWrite, false);
  assert.ok(shader.fragmentShader.includes('texture2D(hillMask, imageUV).a'));
  assert.deepEqual(shader.uniforms.hillRect.value.toArray(), [0.1, 0.2, 0.5, 0.4]);
  const positions = mesh.geometry.getAttribute('position');
  const uv = mesh.geometry.getAttribute('uv');
  for (let index = 0; index < positions.count; index++) {
    const projected = new THREE.Vector3().fromBufferAttribute(positions, index).project(camera);
    assert.ok(Math.abs(projected.x - ((0.1 + uv.getX(index) * 0.5) * 2 - 1)) < 0.0001);
    assert.ok(Math.abs(projected.y - ((0.2 + uv.getY(index) * 0.4) * 2 - 1)) < 0.0001);
  }
  bounds.top -= 50; bounds.bottom -= 50; window.scrollY = 100;
  layer.sync();
  assert.ok(shader.uniforms.hillRect.value.y > 0.28);
  layer.dispose();
  assert.equal(listeners.size, 0);
  delete globalThis.window;
});

test("dust stays in the 3D scene and follows mobile layout changes", () => {
  const dust = createMeadowDust(85, 1.5);
  const camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 120);
  camera.position.set(0, 7, 20);
  camera.lookAt(0, 1.5, -7);
  camera.updateMatrixWorld();
  dust.resize(camera);
  const first = dust.geometry.getAttribute("position").array.slice();
  assert.equal(dust.geometry.getAttribute("position").count, 85);
  assert.ok(Array.from(first).every(Number.isFinite));
  dust.resize(camera, 0.39);
  assert.notDeepEqual(dust.geometry.getAttribute("position").array, first);
  assert.ok(dust.material.depthTest && !dust.material.depthWrite);
  dust.geometry.dispose(); dust.material.dispose();
});
