import * as THREE from "three";


/** Sparse, emissive motes: slow drifting movement with occasional pinpoint glints. */
export function createMeadowDust(count: number, pixelRatio: number) {
  let seed = 107;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const specs = Array.from({ length: count }, (_, index) => ({
    side: (index % 2 ? "left" : "right") as "left" | "right",
    u: random() * 0.9 + 0.05,
    depth: random() * 0.7,
    lift: 0.5 + random() * 3.5,
    phase: random() * Math.PI * 2,
    size: 0.35 + random() * 0.65,
  }));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("phase", new THREE.Float32BufferAttribute(specs.map((spec) => spec.phase), 1));
  geometry.setAttribute("size", new THREE.Float32BufferAttribute(specs.map((spec) => spec.size), 1));
  const uniforms = { time: { value: 0 }, brightness: { value: 1 }, pixelRatio: { value: pixelRatio } };
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms,
    vertexShader: `
      uniform float time;
      uniform float pixelRatio;
      attribute float phase;
      attribute float size;
      varying float glint;
      varying float tint;
      void main() {
        vec3 drift = vec3(sin(time * 0.09 + phase) * 0.45,
          sin(time * 0.07 + phase * 1.7) * 0.24,
          cos(time * 0.08 + phase) * 0.35);
        vec4 view = modelViewMatrix * vec4(position + drift, 1.0);
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp(size * 180.0 / max(-view.z, 1.0), 2.0, 7.0) * pixelRatio;
        glint = pow(max(sin(time * (0.7 + size * 0.4) + phase), 0.0), 12.0);
        tint = phase / 6.283185;
      }
    `,
    fragmentShader: `
      uniform float brightness;
      varying float glint;
      varying float tint;
      void main() {
        vec2 p = (gl_PointCoord - 0.5) * 2.0;
        float radius = length(p);
        float glow = exp(-radius * radius * 7.0) * 0.18;
        float core = exp(-radius * radius * 55.0);
        float cross = (exp(-abs(p.x) * 28.0) + exp(-abs(p.y) * 28.0))
          * pow(max(1.0 - radius, 0.0), 1.5);
        float alpha = (glow + core * (0.15 + glint * 0.7) + cross * glint * 0.55) * brightness;
        if (alpha < 0.015) discard;
        vec3 color = mix(vec3(1.0, 0.79, 0.42), vec3(0.75, 0.87, 1.0), tint * 0.6);
        gl_FragColor = vec4(color, alpha);
        #include <colorspace_fragment>
      }
    `,
  });
  const points = new THREE.Points(geometry, material);
  points.name = "sparkling-foreground-dust";
  points.frustumCulled = false;
  return {
    points, geometry, material, uniforms,
    resize(camera: THREE.PerspectiveCamera, visibleFraction = 1) {
      const positions = geometry.getAttribute("position");
      specs.forEach((spec, index) => {
        const u = 0.5 + (spec.u - 0.5) * visibleFraction;
        const ridge = spec.side === "left" ? 0.55 + u * 0.65 : 1.2 - u * 0.58;
        const v = ridge + (1.3 - ridge) * spec.depth;
        const back = spec.side === "left" ? -6 : 2;
        const z = back + (14 - back) * spec.depth;
        const root = new THREE.Vector3(u * 2 - 1, 1 - v * 2, 0).unproject(camera).sub(camera.position);
        root.multiplyScalar((z - camera.position.z) / root.z).add(camera.position);
        positions.setXYZ(index, root.x, root.y + spec.lift, root.z);
      });
      positions.needsUpdate = true;
    },
  };
}
