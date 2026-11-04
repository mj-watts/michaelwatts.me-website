import * as THREE from "three";
import { createMeadowDust } from "./meadow-dust.ts";
import { createImageShadows } from "./meadow-image-shadows.ts";
import { createButterflyPath, sampleButterflyFlight } from "./meadow-world.ts";

/** Perspective butterflies and sparkling dust over the original painted landscape. */
export function createMeadow(host: HTMLElement): () => void {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
  camera.position.set(0, 7, 20);
  camera.lookAt(0, 1.5, -7);
  camera.updateMatrixWorld();
  const skyLight = new THREE.HemisphereLight(0xfff5d8, 0x244b35, 2.2);
  const sun = new THREE.DirectionalLight(0xffe4af, 1.4);
  sun.position.set(-20, 24, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -35, right: 35, top: 25, bottom: -25, near: 1, far: 100 });
  sun.shadow.normalBias = 0.025;
  sun.shadow.bias = -0.0002;
  sun.shadow.radius = 3;
  sun.shadow.intensity = 0.95;
  scene.add(skyLight, sun);
  const imageShadows = createImageShadows(host, camera, renderer);
  scene.add(...imageShadows.meshes);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const geometry = <T extends THREE.BufferGeometry>(value: T): T => { geometries.add(value); return value; };
  const material = (color: THREE.ColorRepresentation) => {
    const value = new THREE.MeshStandardMaterial({ color, roughness: 1, side: THREE.DoubleSide });
    materials.add(value);
    return value;
  };
  const viewportWidth = host.parentElement?.clientWidth || host.clientWidth;
  let visibleFraction = 1;
  const sphere = geometry(new THREE.SphereGeometry(1, 8, 6));
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.bezierCurveTo(0.3, 0.8, 1.15, 0.9, 0.96, 0.25);
  wingShape.bezierCurveTo(0.85, 0.02, 0.5, -0.03, 0.38, -0.03);
  wingShape.bezierCurveTo(1.02, -0.22, 0.65, -0.8, 0.26, -0.52);
  wingShape.quadraticCurveTo(0.02, -0.26, 0, 0);
  const wingGeometry = geometry(new THREE.ExtrudeGeometry(wingShape, { depth: 0.025, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 1, steps: 1, curveSegments: 12 }));
  const dark = material(0x292f35);
  const butterflies = [0xe6a24e, 0xb4d8e1, 0xf0cf80, 0xd999ae].map((tint, index) => {
    const group = new THREE.Group();
    const wings = [-1, 1].map((side) => {
      const pivot = new THREE.Group();
      const outline = new THREE.Mesh(wingGeometry, dark);
      const wing = new THREE.Mesh(wingGeometry, material(tint));
      wing.scale.set(0.87, 0.87, 1);
      wing.position.z = 0.012;
      pivot.add(outline, wing);
      pivot.scale.x = side;
      group.add(pivot);
      return pivot;
    });
    const body = new THREE.Mesh(sphere, dark);
    body.scale.set(0.055, 0.3, 0.065);
    group.add(body);
    group.scale.setScalar(0.24 + index * 0.025);
    group.name = `butterfly-${index}`;
    group.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.frustumCulled = false;
      }
    });
    scene.add(group);
    const path = createButterflyPath(index, camera);
    return { group, wings, path, length: path.getLength(), phase: index * 1.7 };
  });

  const dust = createMeadowDust(viewportWidth < 768 ? 45 : 85, renderer.getPixelRatio());
  geometries.add(dust.geometry);
  materials.add(dust.material);
  scene.add(dust.points);

  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const orientation = new THREE.Matrix4();
  const bankRotation = new THREE.Quaternion();
  const forwardAxis = new THREE.Vector3(0, 1, 0);
  const hero = host.closest<HTMLElement>(".hero-section");
  const draw = (time: number) => {
    const t = time * 0.001;
    butterflies.forEach(({ group, wings, path, length, phase }, index) => {
      const progress = t * (1.1 + index * 0.12) / length + index * 0.23;
      const { position, direction, bank } = sampleButterflyFlight(path, progress);
      group.position.copy(position);
      group.position.y += Math.sin(t * 3 + phase) * 0.08;
      // Local Y follows flight; local Z faces up, so the wings bank with each turn.
      right.crossVectors(direction, up).normalize();
      normal.crossVectors(right, direction).normalize();
      orientation.makeBasis(right, direction, normal);
      group.quaternion.setFromRotationMatrix(orientation);
      bankRotation.setFromAxisAngle(forwardAxis, bank);
      group.quaternion.multiply(bankRotation);
      wings.forEach((wing, side) => {
        const flap = 0.3 + Math.sin(t * (12 + index) + phase) * 0.95;
        wing.rotation.y = flap * (side ? 1 : -1);
      });
    });
    const cloudVisibility = Number(hero?.style.getPropertyValue("--cloud-visibility") || 0.65);
    const daylight = THREE.MathUtils.clamp((cloudVisibility - 0.65) / 0.35, 0, 1);
    skyLight.intensity = 0.3 + daylight * 0.4;
    sun.intensity = 0.35 + daylight * 1.85;
    dust.uniforms.time.value = t;
    dust.uniforms.brightness.value = 1 - daylight * 0.25;
    imageShadows.sync();
    renderer.render(scene, camera);
  };

  let frame = 0;
  let visible = false;
  let elapsed = 0;
  let previous = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animate = (now: number) => {
    elapsed += previous ? Math.min(now - previous, 50) : 0;
    previous = now;
    draw(elapsed);
    frame = requestAnimationFrame(animate);
  };
  const updatePlayback = () => {
    cancelAnimationFrame(frame);
    previous = 0;
    if (visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(animate);
    else if (visible) draw(elapsed);
  };
  let previousWidth = -1;
  let previousHeight = -1;
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (width <= 0 || height <= 0 || (width === previousWidth && height === previousHeight)) return;
    previousWidth = width;
    previousHeight = height;
    camera.aspect = width / Math.max(height, 1);
    camera.position.set(0, 7, camera.aspect < 1 ? 34 : 20);
    camera.lookAt(0, 1.5, -7);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    visibleFraction = Math.min(1, (host.parentElement?.clientWidth || width) / width);
    dust.resize(camera, visibleFraction);
    butterflies.forEach((butterfly, index) => {
      butterfly.path = createButterflyPath(index, camera, visibleFraction);
      butterfly.length = butterfly.path.getLength();
    });
    imageShadows.sync(true);
    scene.updateMatrixWorld();
    renderer.setSize(width, height, false);
    draw(elapsed);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  });
  visibilityObserver.observe(host);
  document.addEventListener("visibilitychange", updatePlayback);
  reducedMotion.addEventListener("change", updatePlayback);
  resize();

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    document.removeEventListener("visibilitychange", updatePlayback);
    reducedMotion.removeEventListener("change", updatePlayback);
    geometries.forEach((value) => value.dispose());
    materials.forEach((value) => value.dispose());
    imageShadows.dispose();
    sun.shadow.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
