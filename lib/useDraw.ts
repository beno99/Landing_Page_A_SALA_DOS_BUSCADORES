"use client";
import { useSyncExternalStore } from "react";

/** `n` distinct items of `pool`, in random order (Fisher–Yates on a copy). */
export function draw<T>(pool: readonly T[], n: number, random: () => number = Math.random): T[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.max(0, Math.min(n, copy.length)));
}

// One draw per key for the whole visit: re-renders, filters and remounts read the same result.
const draws = new Map<string, unknown>();
const noSubscribe = () => () => {};

function once<T>(key: string, make: () => T): T {
  if (!draws.has(key)) draws.set(key, make());
  return draws.get(key) as T;
}

/**
 * `n` items of `pool` drawn once per visit and stable afterwards. The server (and hydration) use the
 * first `n` in their given order, so the markup matches; the browser then shows its own draw.
 */
export function useDrawOnce<T>(key: string, pool: readonly T[], n: number): T[] {
  return useSyncExternalStore(
    noSubscribe,
    () => once(`list:${key}`, () => draw(pool, n)),
    () => once(`server-list:${key}`, () => pool.slice(0, n)),
  );
}

/** One index in [0, length), drawn once per visit (0 on the server and during hydration). */
export function useDrawIndexOnce(key: string, length: number): number {
  return useSyncExternalStore(
    noSubscribe,
    () => once(`index:${key}`, () => Math.floor(Math.random() * length)),
    () => 0,
  );
}
