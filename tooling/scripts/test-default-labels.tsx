// Server-renders components with an explicit `aria-label={undefined}` and checks that the default
// (locale) label survives, and that a given label still wins.
// Run: pnpm test:labels
import * as React from "react"
import { renderToString } from "react-dom/server"

import { CommandCopy } from "@paneui/ui/components/command-copy"
import { Loader } from "@paneui/ui/components/loader"
import { LocaleProvider, localeLabels } from "@paneui/ui/components/locale-provider"
import { Outline } from "@paneui/ui/components/outline"
import { Pagination } from "@paneui/ui/components/pagination"
import { ThemeToggle } from "@paneui/ui/components/theme-toggle"
import { Tabs, TabsList, TabsTab } from "@paneui/ui/components/tabs"

let failed = 0
const check = (name: string, ok: boolean, html?: string) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${name}`)
  if (!ok) {
    failed++
    if (html) console.log(`     ${html.slice(0, 400)}`)
  }
}
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const has = (html: string, slot: string, label: string) =>
  new RegExp(`<[^>]*data-slot="${slot}"[^>]*aria-label="${escape(label).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"|<[^>]*aria-label="${escape(label).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*data-slot="${slot}"`).test(html)

const noop = () => {}
const cases = (label: string | undefined) => [
  { slot: "theme-toggle", key: "toggleTheme", node: <ThemeToggle aria-label={label} /> },
  { slot: "pagination", key: "pagination", node: <Pagination page={1} pageCount={3} onPageChange={noop} aria-label={label} /> },
  { slot: "loader", key: "loading", node: <Loader aria-label={label} /> },
  { slot: "command-copy-button", key: "copyCommand", node: <CommandCopy command="npx paneui init" label={label} /> },
  { slot: "outline", key: "onThisPage", node: <Outline items={[{ id: "a", title: "A", depth: 2 }]} aria-label={label} /> },
] as const

for (const locale of ["en", "zh-CN"] as const) {
  const labels = localeLabels[locale]
  for (const c of cases(undefined)) {
    const html = renderToString(<LocaleProvider locale={locale}>{c.node}</LocaleProvider>)
    const expected = labels[c.key] as string
    check(`${locale} ${c.slot}: aria-label={undefined} keeps "${expected}"`, has(html, c.slot, expected), html)
  }
  for (const c of cases("Custom")) {
    const html = renderToString(<LocaleProvider locale={locale}>{c.node}</LocaleProvider>)
    check(`${locale} ${c.slot}: aria-label="Custom" wins`, has(html, c.slot, "Custom"), html)
  }
}

// A text-producing component has no children, but is not an icon-only tab.
function TranslatedLabel() { return <>Overview</> }
for (const [name, node, iconOnly] of [
  ["translated text keeps padding", <TabsTab key="translated" value="one"><TranslatedLabel /></TabsTab>, false],
  ["named icon uses square target", <TabsTab key="icon" value="one" aria-label="Overview"><svg /></TabsTab>, true],
  ["plain text keeps padding", <TabsTab key="text" value="one">Overview</TabsTab>, false],
] as const) {
  const html = renderToString(<Tabs defaultValue="one"><TabsList>{node}</TabsList></Tabs>)
  check(`tabs: ${name}`, html.includes('data-icon-only=""') === iconOnly, html)
}

if (failed) {
  console.log(`${failed} failed`)
  process.exit(1)
}
console.log("all passed")
