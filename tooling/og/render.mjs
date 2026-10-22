import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "/workspace/work/pw/node_modules/playwright")
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium", args: ["--no-sandbox"] })
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: "light", deviceScaleFactor: 1 })
  await page.goto(new URL("./og.html", import.meta.url).href)
  await page.screenshot({ path: fileURLToPath(new URL("../../apps/docs/public/og.png", import.meta.url)) })
} finally {
  await browser.close()
}
