"use client"

import * as React from "react"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import Link from "next/link"

import { CalendarDaysIcon, ChartIcon, InboxIcon, TerminalSquareIcon } from "@paneui/ui/icons"
import { AgentProgress } from "@paneui/ui/components/agent-progress"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { WindowFrame, WindowFrameActions, WindowFrameBar, WindowFrameBody, WindowFrameTitle } from "@paneui/ui/components/window-frame"
import {
  SidebarNav,
  SidebarNavContent,
  SidebarNavLink,
  SidebarNavList,
  SidebarNavSearch,
  SidebarNavSection,
} from "@paneui/ui/components/sidebar-nav"
import { useT, type Localized } from "@/lib/site-locale"

import { asset } from "./parts"
import { Checklist, Composer, Deploy, Latency, Messages, Requests, Rollout } from "./pieces"
import { EASE, useStill } from "./reveal"

const NAV: { id: string; label: Localized; icon: React.ReactNode }[] = [
  { id: "inbox", label: { en: "Inbox", zh: "收件箱" }, icon: <InboxIcon /> },
  { id: "agents", label: { en: "Agents", zh: "助手" }, icon: <TerminalSquareIcon /> },
  { id: "calendar", label: { en: "Calendar", zh: "日历" }, icon: <CalendarDaysIcon /> },
  { id: "analytics", label: { en: "Analytics", zh: "分析" }, icon: <ChartIcon /> },
]
const RECENT: { id: string; label: Localized }[] = [
  { id: "release", label: { en: "Release review", zh: "发布评审" } },
  { id: "pricing", label: { en: "Pricing page", zh: "定价页" } },
  { id: "onboarding", label: { en: "Onboarding flow", zh: "新手引导" } },
]

function Sidebar() {
  const t = useT()
  const [active, setActive] = React.useState("agents")
  const [thread, setThread] = React.useState("release")
  return (
    <SidebarNav>
      <SidebarNavSearch shortcut="⌘K">{t({ en: "Search", zh: "搜索" })}</SidebarNavSearch>
      <SidebarNavContent aria-label={t({ en: "App", zh: "应用" })}>
        <SidebarNavList>
          {NAV.map((item) => (
            <SidebarNavLink key={item.id} icon={item.icon} className="w-full text-start" active={active === item.id} render={<button type="button" onClick={() => setActive(item.id)} />}>
              {t(item.label)}
            </SidebarNavLink>
          ))}
        </SidebarNavList>
        <SidebarNavSection label={t({ en: "Recent", zh: "最近" })}>
          <SidebarNavList>
            {RECENT.map((item) => (
              <SidebarNavLink key={item.id} className="w-full text-start" active={thread === item.id} render={<button type="button" onClick={() => setThread(item.id)} />}>
                {t(item.label)}
              </SidebarNavLink>
            ))}
          </SidebarNavList>
        </SidebarNavSection>
      </SidebarNavContent>
    </SidebarNav>
  )
}

/** The hero's app window: every part is a live library component. */
function HeroApp() {
  const t = useT()
  const still = useStill()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2 })
  // The hero's glass is a touch denser than the default so the window holds up over the sky.
  return (
    <WindowFrame ref={ref} variant="glass" className="bg-shell/85">
      <WindowFrameBar>
        <WindowFrameTitle align="center" className="hidden sm:block">
          {t({ en: "Release review", zh: "发布评审" })}
        </WindowFrameTitle>
        {/* A block box, not the default flex row: the status sits on the text baseline as it always has. */}
        <WindowFrameActions className="block">
          <AgentProgress label={t({ en: "Working", zh: "处理中" })} running={inView && !still} />
        </WindowFrameActions>
      </WindowFrameBar>
      <WindowFrameBody className="flex h-160">
        <aside className="hidden w-56 shrink-0 border-e border-border bg-shell/50 md:flex md:flex-col">
          <Sidebar />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="truncate text-ui-lg font-semibold">{t({ en: "Release review", zh: "发布评审" })}</span>
            <Badge size="sm" variant="primary">
              {t({ en: "Agent", zh: "助手" })}
            </Badge>
          </div>
          <Messages />
          <Deploy />
          <Checklist live={inView && !still} />
          <Composer />
        </div>
        <aside className="hidden w-72 shrink-0 flex-col gap-3 border-s border-border p-4 lg:flex">
          <Requests />
          <Latency />
          <Rollout />
        </aside>
      </WindowFrameBody>
    </WindowFrame>
  )
}

const rise = (delay: number, still: boolean) => ({
  initial: { opacity: 0, y: still ? 0 : 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: still ? 0.4 : 1, delay: still ? 0 : delay, ease: EASE },
})

export function Hero() {
  const t = useT()
  const still = useStill()
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const skyY = useTransform(p, [0, 1], [0, 140])
  const appY = useTransform(p, [0, 1], [0, -70])
  const cloudX2 = useTransform(p, [0, 1], [0, 50])

  return (
    <section ref={ref} aria-labelledby="hero-title" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="lp-grain lp-sky relative overflow-hidden rounded-3xl">
        {/* Scenery: a sky over paper hills, with a night version for dark mode. */}
        <motion.div aria-hidden className="absolute inset-0 -z-10" style={still ? undefined : { y: skyY }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export; the scenery is decorative */}
          <img aria-hidden src={asset("hero-sky-light.webp")} alt="" className="absolute inset-0 size-full scale-110 object-cover object-bottom dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element -- static export; the scenery is decorative */}
          <img aria-hidden src={asset("hero-sky-dark.webp")} alt="" className="absolute inset-0 hidden size-full scale-110 object-cover object-bottom dark:block" />
        </motion.div>
        <motion.div aria-hidden className="pointer-events-none absolute -end-20 top-10 hidden w-80 sm:block lg:w-md" style={still ? undefined : { x: cloudX2 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative */}
          <img aria-hidden src={asset("cloud.webp")} alt="" className="lp-drift w-full -scale-x-100 opacity-80 [animation-delay:-9s] dark:opacity-10" />
        </motion.div>

        <div className="relative flex flex-col items-center px-5 pt-32 text-center sm:pt-40 lg:pt-44">
          <motion.h1 id="hero-title" className="lp-display text-balance max-w-4xl text-4xl sm:text-6xl lg:text-7xl" {...rise(0.05, still)}>
            <span className="block">{t({ en: "React components", zh: "为 Web 与 Native" })}</span>
            <span className="block">{t({ en: "for Web and Native", zh: "而做的 React 组件" })}</span>
          </motion.h1>
          <motion.p className="mt-5 max-w-md text-pretty text-base text-foreground/70 sm:mt-6 sm:text-lg" {...rise(0.15, still)}>
            {t({ en: "The source lands in your app, ready to edit.", zh: "源码直接放进你的项目，随时修改。" })}
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" {...rise(0.25, still)}>
            <Button variant="inverse" shape="pill" size="xl" nativeButton={false} render={<Link href="/docs" />}>
              {t({ en: "Get started", zh: "开始使用" })}
            </Button>
            <Button variant="glass" shape="pill" size="xl" nativeButton={false} render={<Link href="/docs/components" />}>
              {t({ en: "Browse components", zh: "浏览组件" })}
            </Button>
          </motion.div>
        </div>

        {/* The window rises from below and is cut off by the card, like a screen on a desk. */}
        <div className="relative mx-auto mt-14 h-100 max-w-6xl px-3 sm:mt-16 sm:h-128 sm:px-8 lg:h-140">
          <motion.div
            className="absolute inset-x-3 top-0 sm:inset-x-8"
            initial={{ opacity: 0, y: still ? 0 : 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: still ? 0.4 : 1.2, delay: still ? 0 : 0.35, ease: EASE }}
          >
            <motion.div style={still ? undefined : { y: appY }}>
              <HeroApp />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
