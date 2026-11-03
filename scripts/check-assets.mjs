// Every /images/… and /assets/… path written in the content, components and app must exist in public/,
// and every image in public/images must be used somewhere (no orphan files shipped).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SOURCES = ["content", "components", "app", "lib"];
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const code = SOURCES.flatMap(walk)
  .filter((f) => /\.(ts|tsx|css)$/.test(f) && !/\.test\./.test(f))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");

const referenced = [...new Set(code.match(/\/(?:images|assets)\/[\w\-./]+\.(?:webp|png|jpe?g|svg|mp4|webm)/g) ?? [])];
const missing = referenced.filter((p) => !existsSync(join("public", p)) || statSync(join("public", p)).size === 0);
const unused = walk("public/images")
  .map((f) => f.slice("public".length))
  .filter((p) => !referenced.includes(p) && p !== "/images/og.jpg");

if (missing.length) console.error("Missing or empty assets:\n" + missing.join("\n"));
if (unused.length) console.error("Unused images in public/images:\n" + unused.join("\n"));
if (missing.length || unused.length) process.exit(1);
console.log(`OK: ${referenced.length} assets`);
