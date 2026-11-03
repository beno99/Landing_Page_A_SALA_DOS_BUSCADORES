import { describe, expect, it } from "vitest";
import { draw } from "./useDraw";

describe("draw", () => {
  const pool = ["a", "b", "c", "d", "e", "f"];

  it("returns n distinct items from the pool", () => {
    for (let k = 0; k < 50; k++) {
      const out = draw(pool, 4);
      expect(out).toHaveLength(4);
      expect(new Set(out).size).toBe(4);
      for (const x of out) expect(pool).toContain(x);
    }
  });

  it("never asks for more than the pool has and leaves the pool untouched", () => {
    expect(draw(pool, 99)).toHaveLength(pool.length);
    expect(draw(pool, -1)).toHaveLength(0);
    expect(pool).toEqual(["a", "b", "c", "d", "e", "f"]);
  });

  it("depends on the random source (not always the same order)", () => {
    expect(draw(pool, 6, () => 0)).not.toEqual(draw(pool, 6, () => 0.999));
  });
});
