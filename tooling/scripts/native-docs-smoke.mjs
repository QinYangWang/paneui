import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let playwright;
for (const location of [
  process.env.PLAYWRIGHT_PATH,
  "playwright",
  "/workspace/work/pw/node_modules/playwright",
].filter(Boolean)) {
  try {
    playwright = require(location);
    break;
  } catch {}
}
if (!playwright)
  throw new Error("Set PLAYWRIGHT_PATH to an installed playwright package.");
const { chromium } = playwright;
const root = `${(process.env.NATIVE_DOCS_URL ?? "http://localhost:3130").replace(/\/$/, "")}/`;
const basePath = new URL(root).pathname;
async function main() {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH ?? "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => {
      if (r.url().startsWith(root) && r.status() >= 400)
        errors.push(`${r.status()} ${r.url()}`);
    });
    const routes = JSON.parse(
      fs.readFileSync(
        new URL("../../apps/native/docs/routes.json", import.meta.url),
        "utf8",
      ),
    );
    for (const route of routes) {
      const response = await page.goto(root + route + "/");
      if (response.status() !== 200) throw Error(`route ${route}`);
      await page.locator(".page-heading h1").waitFor();
      if (
        (await page.locator(".page-heading h1").textContent()) ===
        "Page not found"
      )
        throw Error(`missing ${route}`);
      const code = page.getByRole("tab", { name: "Code", exact: true });
      if (await code.count()) {
        await code.first().click();
        if (
          !(await page.getByRole("tabpanel").first().textContent()).includes(
            "export default function",
          )
        )
          throw Error(`no source ${route}`);
      }
    }
    await page.goto(root + "installation/#provider");
    await page.waitForFunction(() => {
      const heading = document.getElementById("provider");
      return (
        heading &&
        heading.getBoundingClientRect().top < innerHeight &&
        scrollY > 0
      );
    });
    await page.goto(root + "components/");
    await page.mouse.wheel(0, 1200);
    await page.waitForFunction(() => scrollY > 0);
    const headerTop = await page
      .locator(".site-header")
      .evaluate((header) => header.getBoundingClientRect().top);
    if (Math.abs(headerTop) > 1)
      throw Error("Header does not stay visible while scrolling");
    await page.goto(root + "switch/");
    const toggle = page.getByRole("switch", {
      name: "Notifications",
      exact: true,
    });
    const before = await toggle
      .locator("div")
      .first()
      .evaluate((e) => getComputedStyle(e).backgroundColor);
    await toggle.click();
    const after = await toggle
      .locator("div")
      .first()
      .evaluate((e) => getComputedStyle(e).backgroundColor);
    if (before === after) throw Error("switch");
    await page.goto(root + "checkbox/");
    const check = page.getByRole("checkbox", {
      name: "Notifications",
      exact: true,
    });
    await check.click();
    await check.getByText("✓", { exact: true }).waitFor();
    await page.goto(root + "radio-group/");
    await page
      .getByRole("radio", { name: "Inbox", exact: true })
      .first()
      .first()
      .click();
    if (
      (await page
        .getByRole("radio", { name: "Inbox", exact: true })
        .first()
        .locator("div")
        .count()) < 3
    )
      throw Error("radio");
    await page.goto(root + "tabs/");
    await page.getByRole("tab", { name: "Files", exact: true }).first().click();
    await page.getByText("Shared files", { exact: true }).first().waitFor();
    await page.goto(root + "input/");
    await page.getByLabel("Email", { exact: true }).fill("hello@example.com");
    await page.goto(root + "dialog/");
    await page
      .getByRole("button", { name: "Open details", exact: true })
      .click();
    await page.getByText("Default", { exact: true }).last().waitFor();
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    await page.goto(root + "sheet/");
    await page
      .getByRole("button", { name: "Open details", exact: true })
      .click();
    await page.getByRole("button", { name: "Confirm", exact: true }).click();
    await page.goto(root + "toast/");
    await page.getByRole("button", { name: "Save draft", exact: true }).click();
    const notification = page.getByText("Draft saved", { exact: true });
    await notification.waitFor();
    const notificationBox = await notification.boundingBox();
    const previewBox = await page.locator(".example-frame").first().boundingBox();
    if (!notificationBox || !previewBox || notificationBox.y < previewBox.y || notificationBox.y + notificationBox.height > previewBox.y + previewBox.height)
      throw Error("Toast must stay inside its example preview");
    await page.goto(root + "select/");
    await page
      .getByRole("combobox", { name: "Workspace", exact: true })
      .first()
      .click();
    await page.getByRole("radio", { name: "Team", exact: true }).click();
    await page.getByText("Team", { exact: true }).first().waitFor();
    await page.goto(root + "theming/");
    const badLinks = await page
      .locator("a[href]")
      .evaluateAll(
        (links, prefix) =>
          links
            .map((a) => a.getAttribute("href"))
            .filter(
              (h) =>
                h.startsWith("/") &&
                !h.startsWith(prefix) &&
                !h.startsWith("/docs/"),
            ),
        basePath,
      );
    if (badLinks.length) throw Error(`bad internal links ${badLinks}`);
    await page
      .getByRole("combobox", { name: "Theme", exact: true })
      .selectOption("system");
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForFunction(
      () => document.documentElement.style.colorScheme === "dark",
    );
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForFunction(
      () => document.documentElement.style.colorScheme === "light",
    );
    await page.setViewportSize({ width: 375, height: 1000 });
    await page.goto(root + "button/");
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    await page.keyboard.press("Escape");
    if (await page.locator("dialog").isVisible()) throw Error("escape");
    await page
      .getByRole("tab", { name: "Preview", exact: true })
      .first()
      .focus();
    await page.keyboard.press("ArrowRight");
    if (
      (await page
        .getByRole("tab", { name: "Code", exact: true })
        .first()
        .getAttribute("aria-selected")) !== "true"
    )
      throw Error("keyboard tab");
    await page.evaluate(() => document.fonts.ready);
    if (process.env.SCREENSHOT_DIR) {
      fs.mkdirSync(process.env.SCREENSHOT_DIR, { recursive: true });
      await page.screenshot({
        path: `${process.env.SCREENSHOT_DIR}/button-code-375.png`,
      });
    }
    console.log(
      JSON.stringify(
        {
          routes: routes.length,
          interactions:
            "switch checkbox radio tabs input dialog sheet toast select system-theme drawer keyboard-tabs",
          errors,
        },
        null,
        2,
      ),
    );
    if (errors.length) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
