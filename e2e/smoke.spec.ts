import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/eras/mauryan-empire",
  "/eras/gupta-empire",
  "/atlas",
  "/lenses",
  "/lenses/vedic-origins",
  "/connections",
  "/connections/india-and-mesopotamia",
  "/ideas",
  "/ideas/indian-numerals",
  "/search?q=ashoka",
];

for (const path of PAGES) {
  test(`${path} loads with one h1, no console errors and no horizontal scroll`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));

    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      // The MapLibre canvas is decorative here; its content is listed in text beside it.
      .exclude(".maplibregl-map")
      .analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });
}

test("unknown slugs return a real 404", async ({ request }) => {
  for (const path of ["/eras/atlantis", "/lenses/nope", "/connections/nope", "/ideas/nope", "/no-such-page"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(404);
  }
});

test("the skip link is the first thing a keyboard user reaches", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test("era pages link to the eras before and after", async ({ page }) => {
  await page.goto("/eras/mauryan-empire");
  await page.getByRole("navigation", { name: "Previous and next era" }).getByRole("link", { name: /Kushans/ }).click();
  await expect(page).toHaveURL(/\/eras\/post-mauryan$/);
});

test("citations jump to the numbered source list", async ({ page }) => {
  await page.goto("/eras/mauryan-empire");
  const firstCite = page.locator("sup a").first();
  const target = await firstCite.getAttribute("href");
  await firstCite.click();
  await expect(page.locator(target!)).toBeInViewport();
});

test("atlas: presets and the slider update the year and the list of powers", async ({ page }) => {
  await page.goto("/atlas");
  await page.getByRole("button", { name: "Guptas" }).click();
  await expect(page.locator("output")).toHaveText("400 CE");
  await expect(page.getByRole("complementary").getByText("Gupta Empire")).toBeVisible();

  const slider = page.getByRole("slider", { name: /Year/ });
  await slider.focus();
  await page.keyboard.press("End");
  await expect(page.locator("output")).toHaveText("1947");
  await expect(page.getByRole("complementary").getByText("British Raj")).toBeVisible();
});

test("inventions: category filter shows only that category", async ({ page }) => {
  await page.goto("/ideas");
  await page.getByRole("button", { name: "Games & mind" }).click();
  await expect(page.getByText(/^3 of 12 shown$/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Chess", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The sine function" })).toHaveCount(0);
});

test("search finds an era from a keyword", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search a ruler, place, idea or event").fill("Pataliputra");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("link", { name: /Mauryan Empire/ }).first()).toBeVisible();
});

test("atlas: the map draws and Play advances the year", async ({ page }) => {
  await page.goto("/atlas");
  await expect(page.locator(".maplibregl-canvas")).toBeVisible({ timeout: 15_000 });
  await expect(page.locator(".maplibregl-marker").first()).toBeVisible();
  await expect(page.locator("output")).toHaveText("250 BCE");
  await page.getByRole("button", { name: "Play through the years" }).click();
  await expect(page.locator("output")).not.toHaveText("250 BCE", { timeout: 3_000 });
  await page.getByRole("button", { name: "Pause" }).click();
  const paused = await page.locator("output").textContent();
  await page.waitForTimeout(600);
  await expect(page.locator("output")).toHaveText(paused!);
});
