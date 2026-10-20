import type { Metadata } from "next"
import Link from "next/link"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { categorySlug } from "@/components/docs/category-icons"
import { LazyDemo } from "@/components/docs/lazy-demo"
import { getGroups, getItems } from "@/lib/docs"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { Card, CardHeader, CardPanel, CardTitle } from "@paneui/ui/components/card"

const wide = new Set(["file-diff", "heat-calendar", "saas", "vscode", "agent-workspace", "docs", "blog", "chat", "prompt-bar", "recommendation-card", "task-row", "chat-app", "table", "table-editable", "table-async", "animated-sidebar", "candlestick-chart"])

export const metadata: Metadata = { title: "Components" }

export default function ComponentsPage() {
  const groups = getGroups()
  const total = getItems().length
  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col items-start gap-3">
        <h1 className="text-balance text-3xl font-semibold tracking-tight">Components</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {/* design-check-ignore tabular-nums -- the item count is fixed at build time and sits in a sentence */}
          {total} components, blocks and templates for Tailwind 4.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Button nativeButton={false} render={<Link href="/docs/installation" />}>
            Installation
            <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
          </Button>
          <Button variant="secondary" nativeButton={false} render={<Link href="/docs" />}>
            Introduction
          </Button>
        </div>
      </section>
      {groups.map((g, gi) => {
        return (
          <section key={g.category} id={categorySlug(g.category)} className="flex scroll-mt-20 flex-col gap-5">
            <h2 className="text-balance flex items-center gap-2.5 text-lg font-semibold">
              {g.category}
              <Badge size="sm">{g.items.length}</Badge>
            </h2>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {g.items.map((item, index) => {
                return (
                  <Card
                    key={item.name}
                    variant="inset"
                    className={`group/gallery ${wide.has(item.name) ? "xl:col-span-2" : ""}`}
                  >
                    <CardPanel className="flex-1 py-0">
                      {/* Demos mount near the viewport and unmount when far away; see LazyDemo. */}
                      <LazyDemo name={item.name} eager={gi === 0 && index < 4} className="border-b-0 bg-transparent" />
                    </CardPanel>
                    <Link
                      href={`/docs/${item.name}`}
                      className="outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
                    >
                      {/* Cards carry the name and the preview only (copy-density rule 1). */}
                      <CardHeader className="grid-cols-[minmax(0,1fr)_auto] items-center py-3">
                        <CardTitle className="font-medium">{item.title}</CardTitle>
                        <ArrowRightIcon
                          size={16}
                          className="col-start-2 shrink-0 text-muted-foreground transition-transform group-hover/gallery:translate-x-0.5 group-hover/gallery:text-foreground rtl:-scale-x-100 rtl:group-hover/gallery:-translate-x-0.5"
                        />
                      </CardHeader>
                    </Link>
                  </Card>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
