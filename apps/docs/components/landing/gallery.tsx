"use client"

import Link from "next/link"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { LazyDemo } from "@/components/docs/lazy-demo"
import { T, useT, type Localized } from "@/lib/site-locale"

import { Eyebrow } from "./pane-mark"
import { Reveal } from "./reveal"

const PANES: { name: string; title: Localized }[] = [
  { name: "notification-stack", title: { en: "Notification stack", zh: "通知堆栈" } },
  { name: "sortable-stack", title: { en: "Sortable stack", zh: "拖拽排序" } },
  { name: "action-swap-roll", title: { en: "Rolling actions", zh: "滚动切换按钮" } },
  { name: "range-slider-inline", title: { en: "Inline slider", zh: "内联滑块" } },
]

/** Four more live demos, set in the same 田 window as the hero. */
export function Gallery({ count }: { count: number }) {
  const t = useT()
  return (
    <section id="components" className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 sm:px-8">
      <Reveal className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <Eyebrow index={2}>
            <T en="Components" zh="组件" />
          </Eyebrow>
          <h2 className="text-balance break-keep text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
            <span className="font-serif font-normal text-primary tabular-nums">{count}</span>{" "}
            <T en="components, ready to drop in." zh="个组件，拿来就用。" />
          </h2>
        </div>
        <div className="flex flex-col items-start gap-4 lg:pb-2">
          <p className="max-w-md text-pretty break-keep text-lg leading-relaxed text-muted-foreground">
            <T en="Every one is live in the docs. Try it before you install it." zh="每一个都能在文档里直接试用，先上手再安装。" />
          </p>
          <Button variant="secondary" nativeButton={false} render={<Link href="/docs/components" />}>
            <T en="All components" zh="全部组件" />
            <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
          </Button>
        </div>
      </Reveal>
      <Reveal>
        <div className="frame-3xl frame-p-2 grid grid-cols-1 gap-2 rounded-3xl bg-muted shadow-xl md:grid-cols-2 dark:bg-background">
          {PANES.map((pane, i) => (
            <article key={pane.name} className="flex min-w-0 flex-col overflow-hidden rounded-inner bg-card shadow-raised">
              <LazyDemo name={pane.name} eager={false} className="min-h-80 border-b-0 bg-transparent" />
              <Link
                href={`/docs/${pane.name}`}
                className="group flex h-11 items-center gap-3 border-t border-border px-4 text-ui-lg font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
              >
                <span className="font-mono text-ui-xs tabular-nums">{`0${i + 1}`}</span>
                <h3>{t(pane.title)}</h3>
                <ArrowRightIcon size={16} className="ms-auto rtl:-scale-x-100" />
              </Link>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
