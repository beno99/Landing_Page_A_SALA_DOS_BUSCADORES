import { expect, test, type Locator } from "@playwright/test";

/** Effective visibility of an element: opacity of it and every ancestor, clip-path, and viewport overlap. */
async function visibility(locator: Locator) {
  return locator.evaluate((el) => {
    let opacity = 1;
    let clipped = false;
    for (let n: Element | null = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      opacity *= Number(cs.opacity);
      if (cs.clipPath.startsWith("inset(50%")) clipped = true;
    }
    const r = el.getBoundingClientRect();
    const inViewport = r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;
    return { opacity, clipped, inViewport };
  });
}

const IDS = ["inicio", "salas", "curadoria", "perguntas", "trilhas", "artigos", "jornada", "anfitriao", "faq"];

test("the whole page renders with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/A porta está aberta\s*para a sua busca\./);
  for (const id of IDS) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByRole("contentinfo")).toContainText("A Sala dos Buscadores");
  expect(errors).toEqual([]);
});

test("the dedicated host page opens from the main page, with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/anfitrioes");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Seu conhecimento pode abrir\s*novos caminhos de descoberta\./);
  for (const id of ["por-que", "sala", "editor", "como-funciona", "politica", "faq", "chamado"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test("no horizontal scroll", async ({ page }) => {
  await page.goto("/");
  for (let y = 0; y < 30; y++) {
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(60);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
});

test("reduced motion: scenes are not pinned", async ({ page }, info) => {
  test.skip(info.project.name !== "reduced");
  await page.goto("/");
  // Temas now uses normal document flow and has no scroll animation to disable.
  for (const id of ["inicio", "salas", "trilhas"]) {
    await expect(page.locator(`#${id}`)).toHaveAttribute("data-reduced", "true");
  }
  await expect(page.getByTestId("hero-arch")).not.toHaveAttribute("style", /scale/);
});

test("nav anchors land pinned scenes on their revealed frame", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.goto("/");
  await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "A proposta", exact: true }).click();
  await expect(page).toHaveURL(/#curadoria$/);
  const title = page.locator("#curadoria h2");
  await expect.poll(() => visibility(title), { timeout: 10_000 }).toEqual({ opacity: 1, clipped: false, inViewport: true });
  await expect(page.locator("#curadoria")).toHaveCSS("background-color", "rgb(46, 43, 40)");
  // Visibility/opacity alone cannot detect the previous sticky cosmos painting over this text.
  await expect.poll(() => title.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    const topmost = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return topmost === el || el.contains(topmost);
  })).toBe(true);
  await expect.poll(() => page.locator("#curadoria").evaluate((el) => {
    const rect = el.getBoundingClientRect();
    // Sample the solid outer gutter, away from the interactive image panels and navigation.
    const topmost = document.elementFromPoint(rect.left + 8, Math.min(rect.bottom - 8, innerHeight / 2));
    return topmost === el;
  })).toBe(true);
});

test("the Hero CTA leaves the tab order once it has faded", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.goto("/");
  const cta = page.locator("#inicio").getByRole("link", { name: "Entrar no Portal" });
  await expect(cta.locator("xpath=ancestor::*[@inert]")).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, innerHeight * 1.5));
  await expect(cta.locator("xpath=ancestor::*[@inert]")).toHaveCount(1);
});

test("the showcase reaches each of the eight covers once by keyboard", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.goto("/");
  await expect(page.locator("#salas a:not([aria-hidden='true'])")).toHaveCount(8);
  await expect(page.locator("#salas a[aria-hidden='true'][tabindex='-1']")).toHaveCount(1);
});

test("FAQ answers start closed and open from their buttons", async ({ page }) => {
  await page.goto("/#faq");
  const first = page.locator("#faq button").first();
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
});
