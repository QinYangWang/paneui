"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { BotIcon, ChartIcon, MinusIcon, PlusIcon, SendIcon, SlidersIcon, UsersIcon, PaneuiLogoIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import { AvatarGroup, AvatarGroupCount, AvatarStatus } from "@paneui/ui/components/avatar"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { StatefulButton, type ButtonState } from "@paneui/ui/components/button-stateful"
import { GeneratedAvatar } from "@paneui/ui/components/generated-avatar"
import { Label } from "@paneui/ui/components/label"
import { NumberTicker } from "@paneui/ui/components/number-ticker"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { Slider } from "@paneui/ui/components/slider"
import { Sparkline } from "@paneui/ui/components/sparkline"
import { Switch } from "@paneui/ui/components/switch"
import { TodoList, type TodoStatus } from "@paneui/ui/components/todo-list"
import { useT, type Localized } from "@/lib/site-locale"

const SPRING = { type: "spring", stiffness: 420, damping: 40, mass: 0.6 } as const
const EASE = [0.22, 1, 0.36, 1] as const

function useMinWidth(query: string) {
  return React.useSyncExternalStore(
    (cb) => {
      const mq = matchMedia(query)
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => matchMedia(query).matches,
    () => true
  )
}

/* ───────────────────────── Pane bodies: real library components ───────────────────────── */

function ControlsPane() {
  const t = useT()
  const [view, setView] = React.useState("week")
  return (
    <div className="flex w-full max-w-72 flex-col gap-4">
      <SegmentedControl value={view} onValueChange={(v) => setView(String(v))} aria-label={t({ en: "Range", zh: "范围" })} className="w-full">
        <SegmentedControlItem value="day" className="flex-1">{t({ en: "Day", zh: "日" })}</SegmentedControlItem>
        <SegmentedControlItem value="week" className="flex-1">{t({ en: "Week", zh: "周" })}</SegmentedControlItem>
        <SegmentedControlItem value="month" className="flex-1">{t({ en: "Month", zh: "月" })}</SegmentedControlItem>
      </SegmentedControl>
      <div className="flex flex-col gap-3">
        <Label className="justify-between gap-3">
          {t({ en: "Notifications", zh: "通知" })}
          <Switch defaultChecked />
        </Label>
        <Label className="justify-between gap-3">
          {t({ en: "Focus mode", zh: "专注模式" })}
          <Switch />
        </Label>
      </div>
      <Slider defaultValue={64} showValue aria-label={t({ en: "Volume", zh: "音量" })} />
    </div>
  )
}

const SERIES = [18, 21, 19, 24, 23, 27, 26, 31, 29, 34, 33, 38]

function NumbersPane({ live }: { live: boolean }) {
  const t = useT()
  const [total, setTotal] = React.useState(48210)
  const [series, setSeries] = React.useState(SERIES)
  const bump = React.useCallback((delta: number) => {
    setTotal((v) => Math.max(0, v + delta))
    setSeries((s) => [...s.slice(1), Math.max(4, (s[s.length - 1] ?? 20) + delta / 400)])
  }, [])
  React.useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => bump(Math.round(400 + Math.random() * 1400)), 2600)
    return () => window.clearInterval(id)
  }, [live, bump])
  return (
    <div className="flex w-full max-w-80 flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-ui text-muted-foreground">{t({ en: "Revenue this month", zh: "本月收入" })}</span>
        <Badge size="sm" variant="success">+12.4%</Badge>
      </div>
      <NumberTicker value={total} locale="en-US" format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} className="text-4xl font-semibold tracking-tight" />
      <div className="text-primary">
        <Sparkline values={series} label={t({ en: "Revenue trend", zh: "收入趋势" })} className="h-12 w-full" />
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="icon-sm" aria-label={t({ en: "Subtract 900", zh: "减少 900" })} onClick={() => bump(-900)}>
          <MinusIcon />
        </Button>
        <Button variant="secondary" size="icon-sm" aria-label={t({ en: "Add 1,200", zh: "增加 1,200" })} onClick={() => bump(1200)}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  )
}

const STEPS: { id: string; title: Localized; meta: Localized }[] = [
  { id: "1", title: { en: "Read the brief", zh: "阅读需求" }, meta: "0.4s" },
  { id: "2", title: { en: "Draft three layouts", zh: "起草三版布局" }, meta: { en: "3 files", zh: "3 个文件" } },
  { id: "3", title: { en: "Check contrast in dark mode", zh: "检查深色对比度" }, meta: { en: "Passed", zh: "通过" } },
  { id: "4", title: { en: "Open a pull request", zh: "提交合并请求" }, meta: "#128" },
]

function AgentPane({ live }: { live: boolean }) {
  const t = useT()
  const [tick, setTick] = React.useState(live ? 0 : STEPS.length)
  React.useEffect(() => {
    if (!live) return
    const id = window.setTimeout(() => setTick((v) => (v > STEPS.length + 1 ? 0 : v + 1)), tick > STEPS.length ? 2400 : 1200)
    return () => window.clearTimeout(id)
  }, [tick, live])
  const status = (i: number): TodoStatus => (tick > i ? "done" : tick === i ? "in-progress" : "pending")
  return (
    <div className="w-full max-w-80">
      <TodoList
        title={t({ en: "Landing page pass", zh: "首页改版" })}
        items={STEPS.map((s, i) => ({ id: s.id, title: t(s.title), status: status(i), meta: status(i) === "done" ? t(s.meta) : undefined }))}
      />
    </div>
  )
}

const PEOPLE = [
  ["aiko", "female"],
  ["ben", "male"],
  ["chloe", "female"],
  ["dev", "male"],
] as const

function PeoplePane() {
  const t = useT()
  const [state, setState] = React.useState<ButtonState>("idle")
  const timers = React.useRef<number[]>([])
  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const send = () => {
    if (state !== "idle") return
    setState("loading")
    timers.current.push(
      window.setTimeout(() => setState("success"), 1200),
      window.setTimeout(() => setState("idle"), 3000)
    )
  }
  return (
    <div className="flex w-full max-w-72 flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <AvatarGroup size="lg">
          {PEOPLE.map(([seed, gender], i) => (
            <GeneratedAvatar key={seed} seed={seed} gender={gender} title={seed}>
              {i === 0 ? <AvatarStatus status="online" label={t({ en: "Online", zh: "在线" })} /> : null}
            </GeneratedAvatar>
          ))}
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </div>
      <p className="text-ui text-muted-foreground">{t({ en: "4 people are editing", zh: "4 人正在编辑" })}</p>
      <StatefulButton
        state={state}
        onClick={send}
        loadingText={t({ en: "Sending", zh: "发送中" })}
        successText={t({ en: "Invite sent", zh: "邀请已发送" })}
        icon={<SendIcon className="rtl:-scale-x-100" />}
      >
        {t({ en: "Invite a teammate", zh: "邀请成员" })}
      </StatefulButton>
    </div>
  )
}

/* ───────────────────────── The window ───────────────────────── */

const PANES: { label: Localized; icon: typeof SlidersIcon }[] = [
  { label: { en: "Controls", zh: "控件" }, icon: SlidersIcon },
  { label: { en: "Numbers", zh: "数字" }, icon: ChartIcon },
  { label: { en: "Agents", zh: "助手" }, icon: BotIcon },
  { label: { en: "People", zh: "协作" }, icon: UsersIcon },
]

/**
 * The hero window: four live panes in a 田 grid. The pane you point at (or tap) takes more of
 * the window and the cross slides to make room. Until you touch it, focus walks the panes on
 * its own while the window is on screen. On phones the other three fold into slim tabs.
 */
export function PaneWindow({ className }: { className?: string }) {
  const t = useT()
  const reduce = useReducedMotion() ?? false
  const wide = useMinWidth("(min-width: 640px)")
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [active, setActive] = React.useState(0)
  const [touched, setTouched] = React.useState(false)

  React.useEffect(() => {
    if (touched || reduce || !inView) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % 4), 4200)
    return () => window.clearInterval(id)
  }, [touched, reduce, inView])

  const choose = (i: number) => {
    setTouched(true)
    setActive(i)
  }

  const col = active % 2
  const row = active < 2 ? 0 : 1
  const big = wide ? 1.4 : 1
  const small = wide ? 1 : 0.16
  const track = (first: boolean) => (first ? `minmax(0,${big}fr) minmax(0,${small}fr)` : `minmax(0,${small}fr) minmax(0,${big}fr)`)

  return (
    <div ref={ref} className={cn("frame-3xl frame-p-2 flex flex-col gap-2 rounded-3xl bg-muted shadow-xl dark:bg-background", className)}>
      <div className="flex h-7 items-center gap-2 px-2">
        <PaneuiLogoIcon size={16} className="text-foreground" />
        <span className="text-ui font-medium">paneui</span>
        <span className="ms-auto hidden text-ui-sm text-muted-foreground sm:inline">
          {t({ en: "Point at a pane", zh: "指向任意一格" })}
        </span>
        <span className="ms-auto text-ui-sm text-muted-foreground sm:hidden">
          {t({ en: "Tap a pane", zh: "轻点任意一格" })}
        </span>
      </div>
      <motion.div
        className="grid h-128 gap-2 sm:h-160"
        initial={false}
        animate={{ gridTemplateColumns: track(col === 0), gridTemplateRows: track(row === 0) }}
        transition={reduce ? { duration: 0 } : SPRING}
      >
        {PANES.map((pane, i) => {
          const Icon = pane.icon
          const isActive = i === active
          const folded = !wide && !isActive
          return (
            <motion.section
              key={i}
              aria-label={t(pane.label)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, x: i % 2 ? -16 : 16, y: i < 2 ? 16 : -16 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
              onPointerEnter={(e) => e.pointerType === "mouse" && wide && choose(i)}
              onFocus={() => choose(i)}
              className={cn(
                "relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-inner bg-card shadow-raised transition-[box-shadow] duration-200",
                isActive && wide && "inset-ring-1 inset-ring-primary-border"
              )}
            >
              {folded ? (
                <button
                  type="button"
                  onClick={() => choose(i)}
                  aria-label={t(pane.label)}
                  className="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
                >
                  <Icon size={16} />
                  <span className="font-mono text-ui-2xs tabular-nums">{`0${i + 1}`}</span>
                </button>
              ) : (
                <>
                  <div className="flex h-9 shrink-0 items-center gap-2 px-3.5 pt-1">
                    <span className="font-mono text-ui-xs text-muted-foreground tabular-nums">{`0${i + 1}`}</span>
                    <span className={cn("text-ui-sm font-medium transition-colors", isActive ? "text-foreground" : "text-muted-foreground")}>{t(pane.label)}</span>
                    <Icon size={14} className={cn("ms-auto transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
                  </div>
                  <div className="flex min-h-0 flex-1 items-center justify-center px-5 pb-5">
                    {i === 0 ? <ControlsPane /> : i === 1 ? <NumbersPane live={inView && !reduce} /> : i === 2 ? <AgentPane live={inView && !reduce} /> : <PeoplePane />}
                  </div>
                </>
              )}
            </motion.section>
          )
        })}
      </motion.div>
    </div>
  )
}
