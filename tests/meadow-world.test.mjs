import test from "node:test";
import assert from "node:assert/strict";
import { PerspectiveCamera } from "three";
import { createButterflyPath, sampleButterflyFlight } from "../src/lib/meadow-world.ts";

function cameraFor(aspect) {
  const camera = new PerspectiveCamera(42, aspect, 0.1, 120);
  camera.position.set(0, 7, aspect < 1 ? 34 : 20);
  camera.lookAt(0, 1.5, -7);
  camera.updateMatrixWorld();
  return camera;
}

test("butterflies keep continuous depth-changing loops and bank naturally", () => {
  const camera = cameraFor(16 / 9);
  for (let index = 0; index < 4; index++) {
    const path = createButterflyPath(index, camera);
    assert.ok(path.getPointAt(0).distanceTo(path.getPointAt(1)) < 0.001);
    const depths = [];
    for (let step = 0; step <= 200; step++) {
      const { position, direction, bank } = sampleButterflyFlight(path, step / 200);
      assert.ok(Math.abs(direction.length() - 1) < 0.001);
      assert.ok(Number.isFinite(bank) && Math.abs(bank) <= 0.5);
      depths.push(position.z);
    }
    assert.ok(Math.max(...depths) - Math.min(...depths) > 8);
    const start = sampleButterflyFlight(path, 0);
    const end = sampleButterflyFlight(path, 0.99999);
    assert.ok(start.position.distanceTo(end.position) < 0.01);
    assert.ok(start.direction.dot(end.direction) > 0.99);
  }
});

test("all butterflies remain visible throughout full flight loops, including mobile crops", () => {
  for (const [aspect, visibleFraction] of [[16 / 9, 1], [1000 / 720, 0.39], [390 / 844, 1]]) {
    const camera = cameraFor(aspect);
    for (let index = 0; index < 4; index++) {
      const path = createButterflyPath(index, camera, visibleFraction);
      for (let step = 0; step <= 500; step++) {
        const { position } = sampleButterflyFlight(path, step / 500);
        const screen = position.clone().project(camera);
        assert.ok(Math.abs(screen.x) < visibleFraction * 0.88);
        assert.ok(screen.y > -0.55 && screen.y < 0.8);
        assert.ok(screen.z > -1 && screen.z < 1);
      }
    }
  }
});
