"use client"

import { T } from "@/lib/site-locale"

import Link from "next/link"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { categorySlug } from "@/components/docs/category-icons"
import { LazyDemo } from "@/components/docs/lazy-demo"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"
import { DocHeader } from "@/components/docs/doc-layout"

const wide = new Set(["file-diff", "heat-calendar", "saas", "vscode", "agent-workspace", "docs", "blog", "chat", "prompt-bar", "recommendation-card", "task-row", "chat-app", "table", "table-editable", "table-async", "animated-sidebar", "candlestick-chart"])

const CATEGORY_ZH: Record<string, string> = {
  Foundations: "基础",
  Forms: "表单",
  Overlays: "浮层",
  Display: "展示",
  Navigation: "导航",
  Text: "文本",
  Motion: "动效",
  Data: "数据",
  Agents: "助手",
  Charts: "图表",
  Blocks: "组合组件",
  Templates: "模板",
}

/** One gallery card: the demo's name and its live preview. */
export type GalleryItem = { name: string; title: string }
/** One gallery section: the category and its cards, in registry order. */
export type GalleryGroup = { category: string; items: GalleryItem[] }

/** Everything the gallery needs, computed at build time in src/pages/docs/components.astro. */
export type ComponentsGalleryData = {
  groups: GalleryGroup[]
  /** Number of registry items (the gallery hides a few, the count does not). */
  total: number
}

export default function ComponentsGalleryPage({ site, data }: { site: SiteProps; data: ComponentsGalleryData }) {
  const { total } = data
  // Templates have their own section in the header and sidebar.
  const groups = data.groups.filter((g) => g.category !== "Templates")
  return (
    <SiteRoot {...site}>
    <div className="flex flex-col gap-12">
      <DocHeader
        href="/docs/components"
        eyebrow="Docs"
        eyebrowHref="/docs"
        title="Components"
        lede={{ en: `${total} components, blocks and templates, grouped by what they do.`, zh: `${total} 个组件、组合组件和模板，按用途分组。` }}
      />
      {groups.map((g, gi) => {
        return (
          <section key={g.category} id={categorySlug(g.category)} className="flex scroll-mt-20 flex-col gap-5">
            <h2 className="font-heading flex items-baseline gap-2 text-xl font-semibold text-balance">
              <T en={g.category} zh={CATEGORY_ZH[g.category] ?? g.category} />
              <span className="text-ui font-normal text-muted-foreground tabular-nums">{g.items.length}</span>
            </h2>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {g.items.map((item, index) => (
                <div
                  key={item.name}
                  className={`group/gallery flex flex-col overflow-hidden frame-xl border border-border bg-card ${wide.has(item.name) ? "xl:col-span-2" : ""}`}
                >
                  {/* Cards carry the name and the preview only (copy-density rule 1). */}
                  <Link
                    href={`/docs/${item.name}`}
                    className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-ui font-medium outline-none hover:bg-secondary/60 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
                  >
                    {item.title}
                    <ArrowRightIcon
                      size={14}
                      className="shrink-0 text-muted-foreground transition-transform group-hover/gallery:translate-x-0.5 group-hover/gallery:text-foreground rtl:-scale-x-100 rtl:group-hover/gallery:-translate-x-0.5"
                    />
                  </Link>
                  {/* Demos mount near the viewport and unmount when far away; see LazyDemo. */}
                  <LazyDemo name={item.name} eager={gi === 0 && index < 4} className="flex-1 border-b-0 bg-shell" />
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
    </SiteRoot>
  )
}
