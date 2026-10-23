import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_PATH ?? "/workspace/work/pw/node_modules/playwright",
);
const root = (process.env.NATIVE_DOCS_URL ?? "http://localhost:3130").replace(
  /\/$/,
  "",
);
const shots = process.env.SCREENSHOT_DIR;
const routes = [
  "accordion",
  "toggle-group",
  "avatar-group",
  "empty-state",
  "stat",
  "search-field",
  "stepper",
  "pagination-dots",
];
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const errors = [];
function assert(condition, message) {
  if (!condition) throw Error(message);
}
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().startsWith(root) && response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(root);
  await page.evaluate(() => {
    localStorage.setItem("native-docs-language", "en");
    localStorage.setItem("native-docs-theme", "light");
  });
  await page.goto(`${root}/accordion/`);
  const delivery = page.getByRole("button", { name: "Delivery", exact: true });
  await delivery.focus();
  await page.keyboard.press("Enter");
  await page.getByText("Arrives in three days.", { exact: true }).waitFor();
  assert(
    (await delivery.getAttribute("aria-expanded")) === "true",
    "Accordion expansion",
  );
  await delivery.click();
  assert(
    (await page
      .getByText("Arrives in three days.", { exact: true })
      .count()) === 0,
    "Accordion closure",
  );
  await page.goto(`${root}/toggle-group/`);
  const monday = page
    .getByRole("button", { name: "Monday", exact: true })
    .first();
  await monday.click();
  assert(
    (await monday.getAttribute("aria-pressed")) === "true",
    "Toggle selection",
  );
  await monday.click();
  assert(
    (await monday.getAttribute("aria-pressed")) === "false",
    "Toggle deselection",
  );
  await page.goto(`${root}/search-field/`);
  const search = page
    .getByRole("searchbox", { name: "Search files", exact: true })
    .first();
  await search.fill("report");
  await page
    .getByRole("button", { name: "Clear search", exact: true })
    .first()
    .click();
  assert((await search.inputValue()) === "", "Search clearing");
  assert(
    await search.evaluate((node) => node === document.activeElement),
    "Search focus after clearing",
  );
  await page.goto(`${root}/stepper/`);
  const decrement = page
    .getByRole("button", { name: "Decrease quantity", exact: true })
    .first();
  const increment = page
    .getByRole("button", { name: "Increase quantity", exact: true })
    .first();
  assert(await decrement.isDisabled(), "Stepper lower bound");
  await increment.focus();
  await page.keyboard.press("Space");
  assert(!(await decrement.isDisabled()), "Stepper increment");
  assert(
    await page
      .getByRole("button", { name: "Add guest", exact: true })
      .isDisabled(),
    "Stepper upper bound",
  );
  await page.goto(`${root}/pagination-dots/`);
  const second = page.getByRole("button", { name: "Page 2 of 4", exact: true });
  await second.click();
  assert(
    (await second.getAttribute("aria-current")) === "page",
    "Page selection",
  );
  await page.goto(`${root}/empty-state/`);
  await page.getByRole("button", { name: "Create note", exact: true }).click();
  await page.getByText("Untitled note", { exact: true }).waitFor();
  assert(
    (await page.getByText("No notes yet", { exact: true }).count()) === 0,
    "Empty state replaced",
  );
  await page.getByRole("button", { name: "Delete note", exact: true }).click();
  await page.getByText("No notes yet", { exact: true }).waitFor();
  await page.goto(`${root}/stat/`);
  await page.getByRole("button", { name: "Add note", exact: true }).click();
  await page
    .locator(".live-preview")
    .last()
    .getByText("1", { exact: true })
    .waitFor();
  await page.goto(`${root}/avatar-group/`);
  await page.getByLabel("2 more people", { exact: true }).waitFor();
  if (shots) fs.mkdirSync(shots, { recursive: true });
  for (const width of [375, 1440])
    for (const language of ["en", "zh"])
      for (const theme of ["light", "dark"]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(
          ({ language, theme }) => {
            localStorage.setItem("native-docs-language", language);
            localStorage.setItem("native-docs-theme", theme);
          },
          { language, theme },
        );
        for (const route of routes) {
          await page.goto(`${root}/${route}/`);
          await page.locator("#accessibility").waitFor();
          assert(
            (await page.locator(".example-frame").count()) === 3,
            `Examples ${route}`,
          );
          assert(
            (await page.locator("#api ~ div table").count()) > 0,
            `API ${route}`,
          );
          assert(
            !(await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth + 1,
            )),
            `Overflow ${route}/${width}/${language}/${theme}`,
          );
          const smallTargets = await page
            .locator(".live-preview button, .live-preview input")
            .evaluateAll((nodes) =>
              nodes
                .filter((node) => {
                  const bounds = node.getBoundingClientRect();
                  return bounds.width < 44 || bounds.height < 44;
                })
                .map(
                  (node) => node.getAttribute("aria-label") ?? node.textContent,
                ),
            );
          assert(
            !smallTargets.length,
            `Touch targets ${route}: ${smallTargets.join(", ")}`,
          );
          const links = await page
            .locator('a[href^="/"]')
            .evaluateAll((nodes) =>
              nodes.map((node) => node.getAttribute("href")),
            );
          const base = new URL(root).pathname.replace(/\/$/, "");
          assert(
            links.every(
              (link) =>
                !routes.some((route) =>
                  link.split("#")[0].endsWith(`/${route}/`),
                ) || link.startsWith(`${base}/`),
            ),
            "Base path links",
          );
          for (const frame of await page.locator(".example-frame").all()) {
            await frame
              .getByRole("tab", {
                name: language === "en" ? "Code" : "代码",
                exact: true,
              })
              .click();
            assert(
              (await frame.getByRole("tabpanel").textContent()).includes(
                "export default function",
              ),
              `Source ${route}`,
            );
            await frame
              .getByRole("tab", {
                name: language === "en" ? "Preview" : "预览",
                exact: true,
              })
              .click();
          }
          await page.evaluate(async () => {
            await document.fonts.ready;
            document.activeElement?.blur();
            scrollTo(0, 0);
            await new Promise((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(resolve)),
            );
          });
          if (shots)
            await page.screenshot({
              path: `${shots}/${route}-${width}-${theme}-${language}.png`,
              fullPage: true,
            });
          await page.evaluate(() => (document.documentElement.dir = "rtl"));
          assert(
            !(await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth + 1,
            )),
            `RTL overflow ${route}`,
          );
          if (route === "stepper") {
            const buttons = page
              .locator(".live-preview")
              .first()
              .getByRole("button");
            const first = await buttons.first().boundingBox();
            const last = await buttons.last().boundingBox();
            assert(first.x > last.x, "Stepper follows RTL reading order");
          }
          await page.evaluate(() => (document.documentElement.dir = "ltr"));
        }
      }
  assert(errors.length === 0, errors.join("\n"));
  console.log(
    JSON.stringify(
      {
        routes: routes.length,
        layouts: 64,
        interactions:
          "accordion toggle search stepper pagination empty-state stat avatar-group",
        errors,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
