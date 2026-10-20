"use client"

import * as React from "react"

import {
  ArrowUpRightIcon,
  BellIcon,
  MoonIcon,
  PaletteIcon,
  UsersIcon,
  ChevronRightIcon,
  HomeFilledIcon,
  HomeIcon,
  InboxFilledIcon,
  InboxIcon,
  MonitorIcon,
  SettingsFilledIcon,
  SettingsIcon,
  SmartphoneIcon,
} from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import {
  SettingsGroup,
  SettingsRow,
  SettingsRowDescription,
  SettingsRowText,
  SettingsRowTitle,
} from "@paneui/ui/components/settings-section"
import { Switch } from "@paneui/ui/components/switch"
import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@paneui/ui/components/sidebar-nav"
import { TabBar, TabBarItem } from "@paneui/ui/components/tab-bar"
import { T, useT, type Localized } from "@/lib/site-locale"

import { Eyebrow } from "./pane-mark"
import { Reveal } from "./reveal"

type Prefs = { mentions: boolean; digest: boolean; sound: string }
type Key = "mentions" | "digest"

const ROWS: { key: Key; title: Localized; hint: Localized }[] = [
  { key: "mentions", title: { en: "Mentions", zh: "提及" }, hint: { en: "When someone needs you", zh: "有人需要你时" } },
  { key: "digest", title: { en: "Weekly digest", zh: "每周摘要" }, hint: { en: "A Monday summary", zh: "周一发送汇总" } },
]

function PlatformLabel({ icon: Icon, children }: { icon: typeof MonitorIcon; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 font-mono text-ui-xs text-muted-foreground uppercase tracking-wider">
      <Icon size={14} />
      {children}
    </span>
  )
}

const NAV: { id: string; label: Localized; icon: typeof BellIcon }[] = [
  { id: "notifications", label: { en: "Notifications", zh: "通知" }, icon: BellIcon },
  { id: "appearance", label: { en: "Appearance", zh: "外观" }, icon: PaletteIcon },
  { id: "members", label: { en: "Members", zh: "成员" }, icon: UsersIcon },
  { id: "settings", label: { en: "General", zh: "通用" }, icon: SettingsIcon },
]

function WebWindow({ prefs, set }: { prefs: Prefs; set: (p: Partial<Prefs>) => void }) {
  const t = useT()
  return (
    <div className="frame-3xl frame-p-1.5 flex h-full flex-col gap-1.5 rounded-3xl bg-muted shadow-xl dark:bg-background">
      <div className="flex h-8 items-center gap-2 px-2.5">
        <PlatformLabel icon={MonitorIcon}>Web</PlatformLabel>
        <span className="ms-auto font-mono text-ui-xs text-muted-foreground">paneui.dev/settings</span>
      </div>
      <div className="frame-inner flex min-h-0 flex-1 overflow-hidden bg-card shadow-raised">
        <div className="hidden w-52 shrink-0 flex-col border-e border-border bg-background py-3 md:flex">
          <SidebarNav>
            <SidebarNavContent aria-label={t({ en: "Settings", zh: "设置" })}>
              <SidebarNavSection label={t({ en: "Settings", zh: "设置" })}>
                <SidebarNavList>
                  {NAV.map((item) => (
                    <SidebarNavLink key={item.id} icon={<item.icon />} active={item.id === "notifications"} render={<button type="button" />}>
                      {t(item.label)}
                    </SidebarNavLink>
                  ))}
                </SidebarNavList>
              </SidebarNavSection>
            </SidebarNavContent>
          </SidebarNav>
        </div>
      <div className="flex min-w-0 flex-1 flex-col gap-5 p-4 sm:p-8 lg:pe-36">
        <div className="flex flex-col gap-1">
          <h3 className="text-balance text-xl font-semibold tracking-tight">{t({ en: "Notifications", zh: "通知" })}</h3>
          <p className="text-sm text-muted-foreground">{t({ en: "Choose what reaches you.", zh: "选择你想收到的消息。" })}</p>
        </div>
        <SettingsGroup>
          {ROWS.map((row) => (
            <SettingsRow key={row.key} render={<label />}>
              <SettingsRowText className="basis-40">
                <SettingsRowTitle>{t(row.title)}</SettingsRowTitle>
                <SettingsRowDescription>{t(row.hint)}</SettingsRowDescription>
              </SettingsRowText>
              <Switch checked={prefs[row.key]} onCheckedChange={(v) => set({ [row.key]: v })} />
            </SettingsRow>
          ))}
          <SettingsRow>
            <SettingsRowText className="basis-auto">
              <SettingsRowTitle>{t({ en: "Sound", zh: "提示音" })}</SettingsRowTitle>
            </SettingsRowText>
            <SegmentedControl size="sm" value={prefs.sound} onValueChange={(v) => set({ sound: String(v) })} aria-label={t({ en: "Sound", zh: "提示音" })}>
              <SegmentedControlItem value="off">{t({ en: "Off", zh: "关" })}</SegmentedControlItem>
              <SegmentedControlItem value="soft">{t({ en: "Soft", zh: "轻" })}</SegmentedControlItem>
              <SegmentedControlItem value="loud">{t({ en: "Loud", zh: "响" })}</SegmentedControlItem>
            </SegmentedControl>
          </SettingsRow>
        </SettingsGroup>
      </div>
      </div>
    </div>
  )
}

const SOUND: Record<string, Localized> = { off: { en: "Off", zh: "关" }, soft: { en: "Soft", zh: "轻" }, loud: { en: "Loud", zh: "响" } }

function Phone({ prefs, set }: { prefs: Prefs; set: (p: Partial<Prefs>) => void }) {
  const t = useT()
  const [tab, setTab] = React.useState("settings")
  return (
    <div className="frame-3xl frame-p-2 mx-auto w-full max-w-80 rounded-3xl bg-surface-standout shadow-xl">
      <div className="frame-inner flex h-148 flex-col overflow-hidden bg-shell">
        <div className="flex h-10 shrink-0 items-center justify-between px-6 text-ui-sm font-semibold tabular-nums">
          <span>9:41</span>
          <PlatformLabel icon={SmartphoneIcon}>Native</PlatformLabel>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-4 pt-3">
          <h3 className="text-balance px-2 text-3xl font-semibold tracking-tight">{t({ en: "Notifications", zh: "通知" })}</h3>
          <div className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-raised">
            {ROWS.map((row, i) => (
              <label key={row.key} className={`flex min-h-14 items-center gap-3 px-4 ${i ? "border-t border-border" : ""}`}>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-base font-medium">{t(row.title)}</span>
                  <span className="text-ui-sm text-muted-foreground">{t(row.hint)}</span>
                </span>
                <Switch size="lg" checked={prefs[row.key]} onCheckedChange={(v) => set({ [row.key]: v })} />
              </label>
            ))}
            <button
              type="button"
              onClick={() => set({ sound: prefs.sound === "off" ? "soft" : prefs.sound === "soft" ? "loud" : "off" })}
              className="flex min-h-14 items-center gap-3 border-t border-border px-4 text-start outline-none transition-colors active:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
            >
              <span className="flex-1 text-base font-medium">{t({ en: "Sound", zh: "提示音" })}</span>
              <span className="text-base text-muted-foreground">{t(SOUND[prefs.sound] ?? SOUND.soft!)}</span>
              <ChevronRightIcon size={16} className="text-muted-foreground rtl:-scale-x-100" />
            </button>
          </div>
          <div className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-raised">
            <div className="flex min-h-14 items-center gap-3 px-4">
              <MoonIcon size={18} className="text-muted-foreground" />
              <span className="flex-1 text-base font-medium">{t({ en: "Quiet hours", zh: "勿扰时段" })}</span>
              <span className="text-base text-muted-foreground tabular-nums">22:00–07:00</span>
            </div>
          </div>
        </div>
        <TabBar>
          <TabBarItem icon={<HomeIcon />} activeIcon={<HomeFilledIcon />} label={t({ en: "Home", zh: "首页" })} active={tab === "home"} onClick={() => setTab("home")} />
          <TabBarItem icon={<InboxIcon />} activeIcon={<InboxFilledIcon />} label={t({ en: "Inbox", zh: "收件箱" })} badge={2} active={tab === "inbox"} onClick={() => setTab("inbox")} />
          <TabBarItem icon={<SettingsIcon />} activeIcon={<SettingsFilledIcon />} label={t({ en: "Settings", zh: "设置" })} active={tab === "settings"} onClick={() => setTab("settings")} />
        </TabBar>
      </div>
    </div>
  )
}

export function Platforms() {
  const [prefs, setPrefs] = React.useState<Prefs>({ mentions: true, digest: false, sound: "soft" })
  const set = React.useCallback((p: Partial<Prefs>) => setPrefs((prev) => ({ ...prev, ...p })), [])
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 sm:px-8">
      <Reveal className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <Eyebrow index={1}>
            <T en="Web and Native" zh="Web 与 Native" />
          </Eyebrow>
          <h2 className="text-balance break-keep text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
            <T en="Two platforms. One design." zh="两个平台，一套设计。" />
          </h2>
        </div>
        <div className="flex flex-col items-start gap-4 lg:pb-2">
          <p className="max-w-md text-pretty break-keep text-lg leading-relaxed text-muted-foreground">
            <T
              en="The Native package shares colour, radius and type with the web, and sizes every control for touch. Flip a switch on either side."
              zh="Native 包与 Web 共用颜色、圆角和字号，控件按触控尺寸调整。在任意一侧拨动开关试试。"
            />
          </p>
          <Button variant="secondary" nativeButton={false} render={<a href="/native/" />}>
            <T en="Open the Native showcase" zh="打开 Native 展示" />
            <ArrowUpRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
          </Button>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-0">
        <Reveal className="min-w-0 lg:col-start-1 lg:col-end-10 lg:row-start-1 lg:h-120">
          <WebWindow prefs={prefs} set={set} />
        </Reveal>
        <Reveal delay={0.08} className="relative lg:col-start-8 lg:col-end-13 lg:row-start-1">
          <Phone prefs={prefs} set={set} />
        </Reveal>
      </div>
    </section>
  )
}
