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
const languages = process.env.NATIVE_DOCS_LANGUAGE
  ? [process.env.NATIVE_DOCS_LANGUAGE]
  : ["en", "zh"];
const widths = process.env.NATIVE_DOCS_WIDTH
  ? [Number(process.env.NATIVE_DOCS_WIDTH)]
  : [375, 1440];
const routes = JSON.parse(
  fs.readFileSync(
    new URL("../../apps/native/docs/routes.json", import.meta.url),
  ),
).slice(6);
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().startsWith(root) && response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  for (const language of languages) {
    await page.goto(root);
    await page.evaluate(
      (language) => localStorage.setItem("native-docs-language", language),
      language,
    );
    for (const route of routes) {
      await page.goto(`${root}/${route}/`);
      await page.locator("#accessibility").waitFor();
      if ((await page.locator(".example-frame").count()) !== 3)
        throw Error(`Example count ${route}`);
      if (!(await page.locator("#usage + pre").textContent()).includes("<"))
        throw Error(`Usage ${route}`);
      if ((await page.locator("#api ~ div table").count()) === 0)
        throw Error(`API ${route}`);
      for (const frame of await page.locator(".example-frame").all()) {
        await frame
          .getByRole("tab", {
            name: language === "en" ? "Code" : "代码",
            exact: true,
          })
          .click();
        const code = await frame.getByRole("tabpanel").textContent();
        if (
          !code.includes("export default function") ||
          code.includes("undefined")
        )
          throw Error(`Source ${route}`);
        await frame
          .getByRole("tab", {
            name: language === "en" ? "Preview" : "预览",
            exact: true,
          })
          .click();
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      if (overflow) throw Error(`Page overflow ${route} ${language}`);
    }
  }
  if (shots) {
    fs.mkdirSync(shots, { recursive: true });
    for (const width of widths)
      for (const language of languages)
        for (const theme of ["light", "dark"]) {
          await page.setViewportSize({ width, height: 1000 });
          await page.evaluate(
            ({ language, theme }) => {
              localStorage.setItem("native-docs-language", language);
              localStorage.setItem("native-docs-theme", theme);
            },
            { language, theme },
          );
          for (const route of [
            "components",
            "button",
            "select",
            "card",
            "dialog",
            "theme-provider",
          ]) {
            await page.goto(`${root}/${route}/`);
            await page.locator(".page-heading h1").waitFor();
            if (route === "components") {
              for (const preview of await page.locator(".card-preview").all())
                await preview.scrollIntoViewIfNeeded();
              await page.evaluate(() => scrollTo(0, 0));
            }
            await page.evaluate(() => document.fonts.ready);
            await page.screenshot({
              path: `${shots}/${route}-${width}-${theme}-${language}.png`,
              fullPage: true,
            });
            if (route === "select") {
              await page
                .getByRole("combobox", {
                  name: language === "en" ? "Workspace" : "工作区",
                  exact: true,
                })
                .first()
                .click();
              await page
                .getByRole("button", {
                  name: language === "en" ? "Close" : "关闭",
                  exact: true,
                })
                .waitFor();
              await page.evaluate(() => document.fonts.ready);
              await page.waitForTimeout(350);
              await page.screenshot({
                path: `${shots}/select-open-${width}-${theme}-${language}.png`,
              });
            }
            if (route === "dialog") {
              await page
                .getByRole("button", {
                  name: language === "en" ? "Edit profile" : "编辑资料",
                  exact: true,
                })
                .click();
              await page
                .getByLabel(language === "en" ? "Display name" : "显示名称", {
                  exact: true,
                })
                .waitFor();
              await page.evaluate(() => document.fonts.ready);
              await page.waitForTimeout(350);
              await page.screenshot({
                path: `${shots}/dialog-open-${width}-${theme}-${language}.png`,
              });
            }
          }
          for (const route of routes) {
            await page.goto(`${root}/${route}/`);
            await page.locator("#api").waitFor();
            if (
              await page.evaluate(
                () => document.documentElement.scrollWidth > innerWidth + 1,
              )
            )
              throw Error(`Overflow ${route} ${width} ${language}`);
          }
        }
  }
  if (errors.length) throw Error(JSON.stringify(errors));
  console.log(
    JSON.stringify({
      pages: routes.length,
      examples: routes.length * 3,
      languages: languages.length,
      errors,
      screenshots: shots ?? null,
    }),
  );
} finally {
  await browser.close();
}
