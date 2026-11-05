import { expect, test, type Page, type Locator } from "@playwright/test";

async function sceneProgress(page: Page, progress: number) {
  await page.evaluate((p) => {
    const section = document.getElementById("trilhas")!;
    window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + Math.max(0, section.offsetHeight - innerHeight) * p, behavior: "instant" });
  }, progress);
}
async function transform(locator: Locator) {
  return locator.evaluate(el => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return { x: matrix.m41, y: matrix.m42, scale: matrix.a };
  });
}
async function coversPlate(plate: Locator) {
  return plate.evaluate(el => {
    const frame = el.getBoundingClientRect();
    const img = el.querySelector("img")!.getBoundingClientRect();
    return img.left <= frame.left && img.right >= frame.right && img.top <= frame.top && img.bottom >= frame.bottom;
  });
}

test("reading plates keep one link, full coverage and the original copy at each viewport", async ({ page }, info) => {
  for (const width of info.project.name === "desktop" ? [1440, 1024] : [info.project.name === "mobile" ? 375 : 1440]) {
    await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
    await page.goto("/");
    await sceneProgress(page, 0.9);
    const plates = page.locator("#trilhas [data-reading-plate]:visible");
    await expect(plates).toHaveCount(4);
    await expect(page.locator("#trilhas h2")).toHaveText("Leituras para começar sua jornada.");
    for (let i = 0; i < 4; i++) {
      const plate = plates.nth(i);
      if (width < 1024) await plate.scrollIntoViewIfNeeded();
      const card = plate.locator("..");
      await expect(card).toHaveAttribute("href", /\/salas\/corpus-hermeticum$/);
      await expect(card).toContainText("Começar a leitura ↗");
      await expect(card.locator("a, button")).toHaveCount(0);
      await expect(plate.locator("img")).toHaveAttribute("alt", "");
      await expect.poll(() => plate.locator("img").evaluate(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0)).toBe(true);
      await expect.poll(() => coversPlate(plate)).toBe(true);
      const ratio = await plate.evaluate(el => el.clientWidth / el.clientHeight);
      expect(ratio).toBeCloseTo(width < 1024 ? 4 / 3 : 1, 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  }
});

test("scene parallax and opposite pointer springs compose and return when crossing cards", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.goto("/");
  await sceneProgress(page, 0.82);
  const plates = page.locator("#trilhas [data-reading-plate]:visible");
  const first = plates.nth(0);
  const layer = first.locator("[data-reading-parallax]");
  await expect(first).toBeInViewport();
  const before = (await transform(layer)).y;
  await sceneProgress(page, 0.97);
  await expect.poll(async () => (await transform(layer)).y).toBeLessThan(before - 1);
  const box = (await first.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.95, box.y + box.height * 0.1);
  const pointer = first.locator("[data-reading-pointer]");
  await expect.poll(async () => (await transform(pointer)).x).toBeLessThan(-7);
  const hovered = await transform(pointer);
  expect(Math.abs(hovered.x)).toBeLessThanOrEqual(10.1);
  expect(Math.abs(hovered.y)).toBeLessThanOrEqual(10.1);
  expect(hovered.scale).toBeGreaterThan(1);
  await expect.poll(() => coversPlate(first)).toBe(true);
  const neighbor = plates.nth(1);
  const next = (await neighbor.boundingBox())!;
  await page.mouse.move(next.x + next.width * 0.1, next.y + next.height * 0.5);
  await expect.poll(async () => Math.abs((await transform(pointer)).x)).toBeLessThan(0.1);
  await expect.poll(async () => (await transform(neighbor.locator("[data-reading-pointer]"))).x).toBeGreaterThan(7);
  await expect(first.locator("[data-reading-pointer]")).toHaveCSS("will-change", "auto");
  await expect(neighbor.locator("[data-reading-pointer]")).toHaveCSS("will-change", "transform");
});

test("reduced motion centers every photo and ignores scroll and mouse", async ({ page }, info) => {
  test.skip(info.project.name !== "reduced");
  await page.goto("/#trilhas");
  await expect(page.locator("#trilhas")).toHaveAttribute("data-reduced", "true");
  const plate = page.locator("#trilhas [data-reading-plate]:visible").first();
  await plate.scrollIntoViewIfNeeded();
  const layer = plate.locator("[data-reading-parallax]");
  const before = await transform(layer);
  await page.mouse.wheel(0, 100);
  await plate.hover();
  await expect.poll(() => transform(layer)).toEqual(before);
  await expect(plate.locator("[data-reading-pointer]")).toHaveCSS("transform", "none");
  await expect(plate.locator("[data-reading-pointer]")).toHaveCSS("will-change", "auto");
  await expect.poll(() => coversPlate(plate)).toBe(true);
});
