type Bloom = {
  x: number;
  y: number;
  born: number;
  radius: number;
  rotation: number;
  petals: number;
  color: string;
  fern: boolean;
  phase: number;
  driftX: number;
  driftY: number;
};

/** Decorative flowers around a video or beneath a heading. */
export function initFlowers(
  borderElement: HTMLElement,
  mode: "border" | "underline" = "border",
): () => void {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  if (borderElement) canvas.dataset.flowerBorder = "";
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1";
  if (borderElement && mode === "border") canvas.style.zIndex = "3";
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  document.body.appendChild(canvas);
  const emphasis = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-emphasis").trim() || "#ff2d8d";
  const flowerColors = [emphasis, `color-mix(in srgb, ${emphasis} 75%, white)`,
    `color-mix(in srgb, ${emphasis} 85%, #b00055)`];

  let blooms: Bloom[] = [];
  let frame = 0;
  let width = 0;
  let height = 0;
  const spacing = 22;
  const lifetime = 2800;
  let lastPlant = 0;
  let borderDistance = 0;
  const startedAt = performance.now();

  const clear = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    blooms = [];
    ctx.clearRect(0, 0, width, height);
  };

  const resize = () => {
    clear();
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (borderElement && !motion.matches && !document.hidden) {
      frame = requestAnimationFrame(render);
    }
  };

  const render = (now: number) => {
    frame = 0;
    ctx.clearRect(0, 0, width, height);
    const bounds = borderElement.getBoundingClientRect();
    if (bounds && bounds.width > 0 && bounds.height > 0 &&
      bounds.bottom > 0 && bounds.top < height && now - lastPlant >= 80) {
      if (mode === "underline") {
        // Sweep beneath the words in reading order, including wrapped lines.
        const elapsed = now - startedAt - 1200;
        const cycle = elapsed % 8000;
        if (elapsed >= 0 && cycle < 2400) {
          const words = Array.from(borderElement.querySelectorAll("span"))
            .map((word) => word.getBoundingClientRect());
          const totalWidth = words.reduce((sum, word) => sum + word.width, 0);
          let distance = (cycle / 2400) * totalWidth;
          for (const word of words) {
            if (distance <= word.width) {
              plant(word.left - bounds.left + distance,
                word.bottom - bounds.top - word.height * 0.12);
              break;
            }
            distance -= word.width;
          }
        }
      } else {
        const w = bounds.width + 16;
        const h = bounds.height + 16;
        const perimeter = 2 * (w + h);
        for (let side = 0; side < 3; side++) {
          const d = (borderDistance + side * perimeter / 3) % perimeter;
          const x = d < w ? d : d < w + h ? w : d < 2 * w + h ? 2 * w + h - d : 0;
          const y = d < w ? 0 : d < w + h ? d - w : d < 2 * w + h ? h : perimeter - d;
          plant(x - 8, y - 8);
        }
        borderDistance += spacing;
      }
      lastPlant = now;
    }
    ctx.save();
    if (bounds) ctx.translate(bounds.left, bounds.top);
    blooms = blooms.filter((bloom) => now - bloom.born < lifetime);
    for (const bloom of blooms) {
      const age = now - bloom.born;
      const opening = 1 - Math.pow(1 - Math.min(age / 450, 1), 3);
      const fading = Math.max(0, (age - 2000) / 800);
      const phase = age / 650 + bloom.phase;
      const scale = opening * (1 - fading * fading) * (1 + 0.08 * Math.sin(phase));
      ctx.save();
      const drift = age / 1000;
      ctx.translate(bloom.x + bloom.driftX * drift, bloom.y + bloom.driftY * drift);
      ctx.rotate(bloom.rotation + opening * 0.25 + Math.sin(phase) * 0.12);
      ctx.scale(scale, scale);
      ctx.globalAlpha = (1 - fading) * 0.65;
      ctx.strokeStyle = bloom.color;
      ctx.fillStyle = bloom.color;
      ctx.lineWidth = 1.2;

      const r = bloom.radius;
      if (bloom.fern) {
        // Tapered pairs of leaflets unfurl along a gently bending frond.
        ctx.beginPath();
        ctx.moveTo(0, r);
        ctx.quadraticCurveTo(-r * 0.25, -r, r * 0.2, -r * 2);
        ctx.stroke();
        for (let leaf = 0; leaf < 10; leaf++) {
          const t = leaf / 10;
          const y = r * (0.8 - t * 2.7);
          const x = r * (-0.1 + t * t * 0.3);
          const length = r * (0.8 - t * 0.65);
          for (const side of [-1, 1]) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x + side * length * 0.5, y - length * 0.65,
              x + side * length, y - length * 0.5, x + side * length, y - length);
            ctx.bezierCurveTo(x + side * length * 0.6, y - length * 0.05,
              x + side * length * 0.3, y + length * 0.2, x, y);
            ctx.fill();
          }
        }
        ctx.restore();
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-r * 0.6, r, -r * 0.15, r * 1.65);
      ctx.stroke();
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(-r * 0.25, r);
        ctx.bezierCurveTo(side * r, r * 0.3, side * r, r * 1.3, -r * 0.25, r);
        ctx.fill();
      }
      for (let petal = 0; petal < bloom.petals; petal++) {
        ctx.save();
        ctx.rotate((petal / bloom.petals) * Math.PI * 2);
        ctx.beginPath();
        ctx.ellipse(0, -r * 0.58, r * 0.32, r * 0.65, 0, 0, Math.PI * 2);
        ctx.globalAlpha = (1 - fading) * 0.55;
        ctx.fill();
        ctx.globalAlpha = (1 - fading) * 0.3;
        ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.fillStyle = "#9b4b08";
      ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
    if (blooms.length || borderElement) frame = requestAnimationFrame(render);
  };

  const plant = (x: number, y: number) => {
    // A few tiny satellite blooms disperse around each larger bloom or fern.
    for (let particle = 0; particle < 3; particle++) {
      const fern = Math.random() < 0.25;
      const small = particle > 0;
      const angle = Math.random() * Math.PI * 2;
      const speed = small ? 10 + Math.random() * 15 : 0;
      blooms.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        born: performance.now(),
        radius: small ? 3 + Math.random() * 4 : 9 + Math.random() * 10,
        rotation: (Math.random() - 0.5) * Math.PI,
        petals: Math.random() > 0.5 ? 5 : 7,
        color: fern && !small
          ? `hsl(${100 + Math.random() * 50}, 100%, 20%)`
          : Math.random() < 0.3
            ? `hsl(${48 + Math.random() * 12}, 100%, 50%)`
            : flowerColors[Math.floor(Math.random() * flowerColors.length)],
        fern: fern && !small,
        phase: Math.random() * Math.PI * 2,
        driftX: Math.cos(angle) * speed,
        driftY: Math.sin(angle) * speed - (small ? 5 : 0),
      });
    }
    if (blooms.length > 360) blooms.splice(0, blooms.length - 360);
  };

  const refresh = () => {
    clear();
    if (borderElement && !motion.matches && !document.hidden) {
      frame = requestAnimationFrame(render);
    }
  };

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", refresh);
  motion.addEventListener("change", refresh);
  return () => {
    clear();
    canvas.remove();
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", refresh);
    motion.removeEventListener("change", refresh);
  };
}
