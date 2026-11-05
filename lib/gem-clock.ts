/** One 30 fps clock for all visible gems; no React renders in the animation loop. */
type Step = (dt: number) => boolean;
const steps = new Set<Step>();
let frame: number | null = null;
let previous = 0;

function tick(now: number) {
  frame = null;
  if (document.hidden) return;
  const elapsed = now - previous;
  if (elapsed >= 1000 / 30) {
    previous = now;
    for (const step of steps) if (!step(Math.min(elapsed / 1000, 0.05))) steps.delete(step);
  }
  if (steps.size) frame = requestAnimationFrame(tick);
}

export function startGem(step: Step) {
  steps.add(step);
  if (frame === null && !document.hidden) {
    previous = performance.now() - 1000 / 30;
    frame = requestAnimationFrame(tick);
  }
}

export function stopGem(step: Step) {
  steps.delete(step);
  if (!steps.size && frame !== null) {
    cancelAnimationFrame(frame);
    frame = null;
  }
}
