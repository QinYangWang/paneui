"use client"

import { T } from "@/lib/site-locale"

import Link from "next/link"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { categorySlug } from "@/components/docs/category-icons"
import { LazyDemo } from "@/components/docs/lazy-demo"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"
import { DocHeader } from "@/components/docs/doc-layout"

const wide = new Set(["file-diff", "heat-calendar", "saas", "vscode", "team-chat", "agent-workspace", "docs", "blog", "chat", "prompt-bar", "recommendation-card", "task-row", "chat-app", "table", "table-editable", "table-async", "animated-sidebar", "candlestick-chart"])

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
  // Templates have their own section in the header and sidebar.
  const groups = data.groups.filter((g) => g.category !== "Templates")
  const total = data.total - (data.groups.find((g) => g.category === "Templates")?.items.length ?? 0)
  return (
    <SiteRoot {...site}>
    <div className="flex flex-col gap-16">
      <DocHeader
        href="/docs/components"
        eyebrow="Docs"
        eyebrowHref="/docs"
        title="Components"
        lede={{ en: `${total} components and blocks, grouped by what they do.`, zh: `${total} 个组件和组合组件，按用途分组。` }}
      />
      {groups.map((g, gi) => {
        return (
          <section key={g.category} id={categorySlug(g.category)} aria-labelledby={`${categorySlug(g.category)}-title`} className="flex scroll-mt-20 flex-col gap-6">
            <h2 id={`${categorySlug(g.category)}-title`} className="font-heading flex items-baseline gap-2 text-2xl font-semibold tracking-tight text-balance">
              <T en={g.category} zh={CATEGORY_ZH[g.category] ?? g.category} />
              <span className="text-ui font-normal tracking-normal text-muted-foreground tabular-nums">{g.items.length}</span>
            </h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 xl:grid-cols-2">
              {g.items.map((item, index) => (
                // Cards carry the preview and the name only (copy-density rule 1): the preview on a filled
                // tile one tone off the page, the name under it, the whole card one link target by its name.
                <article key={item.name} className={`group/gallery flex min-w-0 flex-col gap-2.5 ${wide.has(item.name) ? "xl:col-span-2" : ""}`}>
                  {/* Demos mount near the viewport and unmount when far away; see LazyDemo. */}
                  <div className="flex flex-1 flex-col overflow-hidden frame-xl bg-shell">
                    <LazyDemo name={item.name} eager={gi === 0 && index < 4} className="flex-1 border-b-0 bg-transparent" />
                  </div>
                  <Link
                    href={`/docs/${item.name}`}
                    className="flex w-fit items-center gap-1.5 rounded-md px-1 text-ui-lg font-medium outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.title}
                    <ArrowRightIcon
                      size={14}
                      className="shrink-0 text-muted-foreground transition-transform duration-150 group-hover/gallery:translate-x-0.5 group-hover/gallery:text-foreground rtl:-scale-x-100 rtl:group-hover/gallery:-translate-x-0.5"
                    />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
    </SiteRoot>
  )
}
