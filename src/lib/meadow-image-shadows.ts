import * as THREE from "three";

/** Shadow-only surfaces follow the DOM images; their pixels remain the original artwork. */
export function createImageShadows(host: HTMLElement, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
  const canvasSize = new THREE.Vector2();
  let dirty = true;
  const receivers = Array.from(host.closest(".hero-section")?.querySelectorAll<HTMLImageElement>(".near-mountains img") ?? []).map((image) => {
    const texture = new THREE.Texture(image);
    const onLoad = () => { texture.needsUpdate = true; dirty = true; };
    if (image.complete) onLoad();
    image.addEventListener("load", onLoad);
    const rect = new THREE.Vector4();
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShadowMaterial({ color: 0x152033, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide });
    material.onBeforeCompile = (shader) => {
      shader.uniforms.hillMask = { value: texture };
      shader.uniforms.hillRect = { value: rect };
      shader.uniforms.hillCanvasSize = { value: canvasSize };
      shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `
        #include <common>
        uniform sampler2D hillMask;
        uniform vec4 hillRect;
        uniform vec2 hillCanvasSize;
      `).replace("#include <tonemapping_fragment>", `
        vec2 imageUV = (gl_FragCoord.xy / hillCanvasSize - hillRect.xy) / hillRect.zw;
        if (any(lessThan(imageUV, vec2(0.0))) || any(greaterThan(imageUV, vec2(1.0)))) discard;
        gl_FragColor.a *= texture2D(hillMask, imageUV).a * clamp(imageUV.y * 2.0, 0.0, 1.0);
        #include <tonemapping_fragment>
      `);
    };
    material.customProgramCacheKey = () => "painted-hill-shadow-v1";
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "painted-hill-shadow";
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    return { image, geometry, material, mesh, rect, texture, onLoad };
  });
  let previousScroll = NaN;
  let previousWidth = 0;
  let previousHeight = 0;
  return {
    meshes: receivers.map(({ mesh }) => mesh),
    sync(force = false) {
      const canvas = host.getBoundingClientRect();
      renderer.getDrawingBufferSize(canvasSize);
      if (!force && !dirty && previousScroll === window.scrollY && previousWidth === canvas.width && previousHeight === canvas.height) return;
      dirty = false;
      previousScroll = window.scrollY;
      previousWidth = canvas.width;
      previousHeight = canvas.height;
      receivers.forEach(({ image, geometry, rect }) => {
        const bounds = image.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        rect.set((bounds.left - canvas.left) / canvas.width, (canvas.bottom - bounds.bottom) / canvas.height,
          bounds.width / canvas.width, bounds.height / canvas.height);
        const positions = geometry.getAttribute("position");
        const uv = geometry.getAttribute("uv");
        for (let index = 0; index < positions.count; index++) {
          const u = uv.getX(index);
          const v = uv.getY(index);
          const ray = new THREE.Vector3((rect.x + u * rect.z) * 2 - 1,
            (rect.y + v * rect.w) * 2 - 1, 0).unproject(camera).sub(camera.position);
          const depth = THREE.MathUtils.lerp(12, -10, v);
          const point = ray.multiplyScalar((depth - camera.position.z) / ray.z).add(camera.position);
          positions.setXYZ(index, point.x, point.y, point.z);
        }
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
      });
    },
    dispose() {
      receivers.forEach(({ image, onLoad, texture, geometry, material }) => {
        image.removeEventListener("load", onLoad);
        texture.dispose(); geometry.dispose(); material.dispose();
      });
    },
  };
}
