import { CatmullRomCurve3, PerspectiveCamera, Vector3 } from "three";

export function createButterflyPath(index: number, camera: PerspectiveCamera, visibleFraction = 1): CatmullRomCurve3 {
  const stops = [[0.17, 0.44, 6], [0.29, 0.31, -1], [0.53, 0.35, -9],
    [0.8, 0.42, -4], [0.75, 0.54, 5], [0.5, 0.6, 8], [0.27, 0.56, 4]];
  return new CatmullRomCurve3(stops.map(([u, v, z]) => {
    const x = 0.5 + (u - 0.5) * visibleFraction;
    const y = v - index * 0.025;
    const depth = z - index * 0.45;
    const ray = new Vector3(x * 2 - 1, 1 - y * 2, 0).unproject(camera).sub(camera.position);
    const point = ray.multiplyScalar((depth - camera.position.z) / ray.z).add(camera.position);
    return point;
  }), true, "centripetal");
}

export function sampleButterflyFlight(path: CatmullRomCurve3, progress: number) {
  const u = ((progress % 1) + 1) % 1;
  const positionAt = (value: number) => path.getPointAt(((value % 1) + 1) % 1);
  const position = positionAt(u);
  const direction = positionAt(u + 0.001).sub(positionAt(u - 0.001)).normalize();
  const nextDirection = positionAt(u + 0.015).sub(position).normalize();
  const turn = new Vector3().crossVectors(direction, nextDirection).y;
  return { position, direction, bank: Math.max(-0.45, Math.min(0.45, turn * 3)) };
}
