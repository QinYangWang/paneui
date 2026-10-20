"use client"

import Link from "next/link"

import { ArrowRightIcon, PaneuiLogoIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@paneui/ui/components/tabs"
import { LanguageToggle } from "@/components/docs/language-toggle"
import { LazyDemo } from "@/components/docs/lazy-demo"
import { ThemeControls } from "@/components/docs/theme-controls"
import { T, useT } from "@/lib/site-locale"

import { LandingFooter } from "./landing-footer"

const categories = [
  { value: "all", en: "All", zh: "全部" },
  { value: "controls", en: "Controls", zh: "控件" },
  { value: "motion", en: "Motion", zh: "动效" },
  { value: "display", en: "Display", zh: "展示" },
] as const

const specimens = [
  { name: "number-ticker", en: "Number ticker", zh: "滚动数字", category: "motion" },
  { name: "range-slider-inline", en: "Inline slider", zh: "内联滑块", category: "controls" },
  { name: "action-swap-roll", en: "Rolling actions", zh: "滚动切换按钮", category: "motion" },
  { name: "notification-stack", en: "Notification stack", zh: "通知堆栈", category: "display" },
  { name: "sortable-stack", en: "Sortable stack", zh: "拖拽排序", category: "controls" },
  { name: "avatar", en: "Avatars", zh: "头像", category: "display" },
  { name: "tabs", en: "Tabs", zh: "标签页", category: "controls" },
  { name: "button-stateful", en: "Stateful buttons", zh: "状态按钮", category: "motion" },
  { name: "switch", en: "Switches", zh: "开关", category: "controls" },
] as const

function ComponentGallery() {
  const t = useT()
  return (
    <section id="components" aria-label={t({ en: "Component showcase", zh: "组件展示" })} className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
      <Tabs defaultValue="all">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <TabsList variant="underline" aria-label={t({ en: "Component category", zh: "组件分类" })}>
            {categories.map((category) => <TabsTab key={category.value} value={category.value}>{t(category)}</TabsTab>)}
          </TabsList>
          <Button variant="ghost" nativeButton={false} render={<Link href="/docs/components" />}>
            <T en="All components" zh="全部组件" /><ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
          </Button>
        </div>
        {categories.map((category) => (
          <TabsPanel key={category.value} value={category.value}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              {specimens.filter((item) => category.value === "all" || item.category === category.value).map((item, index) => (
                <article key={item.name} className="flex min-w-0 flex-col gap-3">
                  <div className="flex min-h-80 flex-1 overflow-hidden rounded-2xl bg-shell">
                    <LazyDemo name={item.name} eager={index < 3} className="min-h-80 border-b-0 bg-transparent xl:min-h-80" />
                  </div>
                  <Link href={`/docs/${item.name}`} className="group flex min-h-8 items-center justify-between gap-3 rounded-sm px-1 text-ui-lg font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50">
                    <h2 className="text-balance">{t(item)}</h2>
                    <ArrowRightIcon size={16} className="text-muted-foreground rtl:-scale-x-100" />
                  </Link>
                </article>
              ))}
            </div>
          </TabsPanel>
        ))}
      </Tabs>
    </section>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:p-3 focus-visible:ring-2 focus-visible:ring-ring/50"><T en="Skip to content" zh="跳转到内容" /></a>
      <header>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link href="/" aria-label="paneui home" className="flex items-center gap-2 rounded-sm text-xl font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-ring/50"><PaneuiLogoIcon size={24} />paneui</Link>
          <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-3">
            <Button variant="ghost" nativeButton={false} render={<Link href="/docs/components" />} className="hidden md:inline-flex"><T en="Components" zh="组件" /></Button>
            <Button variant="ghost" nativeButton={false} render={<Link href="/docs/components#templates" />} className="hidden sm:inline-flex"><T en="Templates" zh="模板" /></Button>
            <ThemeControls />
            <LanguageToggle />
            <Button variant="secondary" nativeButton={false} render={<Link href="/docs/installation" />} className="hidden sm:inline-flex"><T en="Docs" zh="文档" /><ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" /></Button>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 pb-16 pt-16 text-center sm:pb-20 sm:pt-24">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"><T en="Small panes. Big ideas." zh="一方窗格，万千可能。" /></h1>
          <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground"><T en="Interactive React components. Try them here, make them yours." zh="可交互的 React 组件。在这里体验，带进你的项目。" /></p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/docs/installation" />}><T en="Start building" zh="开始构建" /><ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" /></Button>
            <Button size="lg" variant="secondary" nativeButton={false} render={<a href="#components" />}><T en="Explore components" zh="体验组件" /></Button>
          </div>
        </section>
        <ComponentGallery />
      </main>
      <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8"><LandingFooter /></div>
    </div>
  )
}
