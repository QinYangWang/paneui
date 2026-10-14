import Link from "next/link"

import { ArrowRightIcon } from "@/components/icons"
import { categoryIcons, categorySlug } from "@/components/docs/category-icons"
import { LazyDemo } from "@/components/docs/lazy-demo"
import { getGroups, getItems } from "@/lib/docs"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@/registry/base-nova/ui/card"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

const wide = new Set(["saas-dashboard", "agent-workspace", "landing", "docs", "blog", "chat", "prompt-bar", "recommendation-card", "task-row", "chat-app", "table", "table-editable", "table-async", "animated-sidebar", "candlestick-chart"])

export default function Gallery() {
  const groups = getGroups()
  const total = getItems().length
  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col items-start gap-4">
        <Badge variant="primary" size="sm">
          {total} components · Base UI · Tailwind 4
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Quiet, precise components.</h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Copy-paste React components on Base UI, Tailwind 4 and Motion, in a native desktop style: system type, hairline borders, quiet fills. Install any
          of them with the shadcn CLI.
        </p>
        <Button nativeButton={false} render={<Link href="/docs" />}>
          Get started
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </section>
      {groups.map((g, gi) => {
        const Icon = categoryIcons[g.category]
        return (
          <section key={g.category} id={categorySlug(g.category)} className="flex scroll-mt-20 flex-col gap-5">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              {Icon && (
                <IconChip>
                  <Icon />
                </IconChip>
              )}
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
                      <CardHeader className="grid-cols-[1fr_auto] items-center py-3">
                        <CardTitle className="font-medium">{item.title}</CardTitle>
                        <ArrowRightIcon
                          size={16}
                          className="col-start-2 row-span-2 shrink-0 text-muted-foreground transition-transform group-hover/gallery:translate-x-0.5 group-hover/gallery:text-foreground"
                        />
                        <CardDescription className="truncate text-sm">{item.description}</CardDescription>
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
