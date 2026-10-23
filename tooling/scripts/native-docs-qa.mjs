import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? "/workspace/work/pw/node_modules/playwright");
const routes = JSON.parse(fs.readFileSync(new URL("../../apps/native/docs/routes.json", import.meta.url)));
const out = process.env.SCREENSHOT_DIR;
if (out)
    fs.mkdirSync(out, { recursive: true });
const root = (process.env.NATIVE_DOCS_URL ?? "http://localhost:3130/native").replace(/\/$/, "");
(async () => {
    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/usr/bin/chromium", args: ['--no-sandbox'] });
    try {
        const findings = [], links = new Set(), stats = { pages: 0 };
        for (const style of ['default', 'paper'])
            for (const theme of ['light', 'dark'])
                for (const lang of ['en', 'zh'])
                    for (const width of [375, 1440]) {
                        const ctx = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
                        await ctx.addInitScript(({ style, theme, lang }) => { localStorage.setItem('native-docs-style', style); localStorage.setItem('native-docs-theme', theme); localStorage.setItem('native-docs-language', lang); }, { style, theme, lang });
                        const page = await ctx.newPage();
                        let current;
                        page.on('pageerror', e => findings.push({ current, error: e.message }));
                        page.on('response', response => { if (response.status() >= 400)
                            findings.push({ current, url: response.url(), status: response.status() }); });
                        page.on('console', m => {
                            if (m.type() === 'error')
                                findings.push({ current, console: m.text() });
                        });
                        for (const route of routes) {
                            current = `${route || 'root'}-${width}-${style}-${theme}-${lang}`;
                            await page.goto(`${root}/${route ? route + '/' : ''}`);
                            await page.locator('.page-heading h1').waitFor();
                            await page.evaluate(() => document.fonts.ready);
                            if (route === 'components') {
                                for (const card of await page.locator('.component-card').all())
                                    await card.scrollIntoViewIfNeeded();
                                await page.evaluate(() => scrollTo(0, 0));
                            }
                            const result = await page.evaluate(() => {
                                const clipping = [];
                                for (const el of document.querySelectorAll('main *, .site-header *')) {
                                    if (!el.getClientRects().length || el.closest('pre,.api-scroll,.card-preview,.sr-only') || el.matches('svg,svg *'))
                                        continue;
                                    const css = getComputedStyle(el);
                                    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth && ['hidden', 'clip'].includes(css.overflowX))
                                        clipping.push({ tag: el.tagName, text: el.textContent.slice(0, 70), width: el.clientWidth, scroll: el.scrollWidth });
                                }
                                return { overflow: document.documentElement.scrollWidth > innerWidth + 1, clipping, links: [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => h.startsWith(location.origin)), title: document.querySelector('h1').textContent };
                            });
                            result.links.forEach(l => links.add(l));
                            if (result.overflow || result.clipping.length || result.title === 'Page not found')
                                findings.push({ current, ...result, links: undefined });
                            if (out && ['introduction', 'components', 'button', 'theming', 'card', 'select', 'stepper'].includes(route))
                                await page.screenshot({ path: `${out}/${current}.png`, fullPage: true });
                            stats.pages++;
                        }
                        console.log('completed', style, theme, lang, width, stats.pages);
                        await ctx.close();
                    }
        const ctx = await browser.newContext();
        const page = await ctx.newPage();
        for (const link of links) {
            const url = new URL(link);
            const response = await ctx.request.get(url.origin + url.pathname);
            if (response.status() !== 200)
                findings.push({ link, status: response.status() });
            if (url.hash) {
                await page.goto(link);
                await page.locator('main').waitFor();
                const found = await page.evaluate(hash => !!document.getElementById(decodeURIComponent(hash.slice(1))), url.hash);
                if (!found)
                    findings.push({ link, missingAnchor: true });
            }
        }
        stats.links = links.size;
        stats.findings = findings;
        if (process.env.QA_REPORT)
            fs.writeFileSync(process.env.QA_REPORT, JSON.stringify(stats, null, 2));
        console.log(JSON.stringify(stats, null, 2));
        if (findings.length)
            process.exitCode = 1;
    }
    finally {
        await browser.close();
    }
})().catch(e => { console.error(e); process.exitCode = 1; });
