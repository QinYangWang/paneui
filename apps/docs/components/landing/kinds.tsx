"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { CalendarDaysIcon, ChatIcon, FileIcon, InboxIcon, PanelRightIcon, SettingsIcon, SmartphoneIcon, TableIcon, TypeIcon, UserIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@paneui/ui/components/card"
import { Checkbox } from "@paneui/ui/components/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@paneui/ui/components/command"
import { Field, FieldGroup, FieldLabel } from "@paneui/ui/components/field"
import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"
import { Radio, RadioGroup } from "@paneui/ui/components/radio"
import { Switch } from "@paneui/ui/components/switch"
import { ToggleGroup, ToggleGroupItem, ToggleGroupItemIcon } from "@paneui/ui/components/toggle-group"
import { TrendChart } from "@paneui/ui/components/trend-chart"
import { useT, type Localized } from "@/lib/site-locale"

import { isSky, LandingBackdropLayer } from "./backdrop"
import { asset, Eyebrow } from "./parts"
import { Checklist, Composer, Deploy, Messages, Phone, Requests } from "./pieces"
import { EASE, Reveal, useStill } from "./reveal"

function FormsDemo() {
  const t = useT()
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 items-start gap-4 sm:grid-cols-5">
      <Card className="sm:col-span-3">
        <CardHeader>
          <CardTitle>{t({ en: "New project", zh: "新建项目" })}</CardTitle>
          <CardDescription>{t({ en: "You can change these later.", zh: "之后还可以修改。" })}</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>{t({ en: "Name", zh: "名称" })}</FieldLabel>
              <Input defaultValue={t({ en: "Northwind", zh: "北风" })} />
            </Field>
            <Field>
              <FieldLabel>{t({ en: "Visibility", zh: "可见范围" })}</FieldLabel>
              <RadioGroup defaultValue="team" aria-label={t({ en: "Visibility", zh: "可见范围" })}>
                <Label className="gap-2.5">
                  <Radio value="team" />
                  {t({ en: "Team", zh: "团队" })}
                </Label>
                <Label className="gap-2.5">
                  <Radio value="private" />
                  {t({ en: "Only me", zh: "仅自己" })}
                </Label>
              </RadioGroup>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="ghost">{t({ en: "Cancel", zh: "取消" })}</Button>
          <Button>{t({ en: "Create", zh: "创建" })}</Button>
        </CardFooter>
      </Card>
      <Card size="sm" className="sm:col-span-2">
        <CardHeader>
          <CardTitle>{t({ en: "Notify me", zh: "通知我" })}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Label className="gap-2.5">
            <Checkbox defaultChecked />
            {t({ en: "Mentions", zh: "提及" })}
          </Label>
          <Label className="gap-2.5">
            <Checkbox defaultChecked />
            {t({ en: "Reviews", zh: "评审" })}
          </Label>
          <Label className="gap-2.5">
            <Checkbox />
            {t({ en: "Weekly digest", zh: "每周摘要" })}
          </Label>
          <Label className="justify-between gap-3 pt-1">
            {t({ en: "Quiet hours", zh: "免打扰" })}
            <Switch defaultChecked />
          </Label>
        </CardContent>
      </Card>
    </div>
  )
}

const MONTHS: Localized[] = [
  { en: "May", zh: "5月" },
  { en: "Jun", zh: "6月" },
  { en: "Jul", zh: "7月" },
  { en: "Aug", zh: "8月" },
  { en: "Sep", zh: "9月" },
  { en: "Oct", zh: "10月" },
]

function DataDemo() {
  const t = useT()
  const data = MONTHS.map((m, i) => ({ label: t(m), values: { web: 12 + i * 3 + (i % 2) * 2, native: 5 + i * 2 + ((i + 1) % 2) } }))
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 items-start gap-4 sm:grid-cols-5">
      <Card className="sm:col-span-3">
        <CardHeader>
          <CardTitle>{t({ en: "Active users", zh: "活跃用户" })}</CardTitle>
        </CardHeader>
        <CardContent>
          <TrendChart
            series={[
              { id: "web", label: "Web" },
              { id: "native", label: "Native" },
            ]}
            data={data}
            height={180}
            formatValue={(v) => `${v}k`}
            label={t({ en: "Active users by platform", zh: "各平台活跃用户" })}
          />
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4 sm:col-span-2">
        <Requests />
        <Card size="sm" className="hidden sm:flex">
          <CardHeader>
            <CardTitle>{t({ en: "Top pages", zh: "热门页面" })}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-ui">
            {[
              ["/pricing", "12.4k"],
              ["/docs", "9.8k"],
              ["/blog", "4.1k"],
            ].map(([page, n]) => (
              <div key={page} className="flex items-center justify-between gap-3">
                <span className="font-mono text-ui-sm text-muted-foreground">{page}</span>
                <span className="font-medium tabular-nums">{n}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AgentDemo({ live }: { live: boolean }) {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 items-start gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-2xl bg-background p-4 shadow-raised">
        <Messages />
        <Composer />
      </div>
      <div className="flex flex-col gap-3">
        <Deploy />
        <Checklist live={live} />
      </div>
    </div>
  )
}

function OverlaysDemo() {
  const t = useT()
  return (
    <div className="w-full max-w-md rounded-xl shadow-xl">
      <Command>
        <CommandInput placeholder={t({ en: "Type a command or search", zh: "输入命令或搜索" })} aria-label={t({ en: "Search commands", zh: "搜索命令" })} />
        <CommandList>
          <CommandEmpty>{t({ en: "No results.", zh: "没有结果。" })}</CommandEmpty>
          <CommandGroup heading={t({ en: "Suggestions", zh: "建议" })}>
            <CommandItem>
              <InboxIcon />
              {t({ en: "Inbox", zh: "收件箱" })}
            </CommandItem>
            <CommandItem>
              <CalendarDaysIcon />
              {t({ en: "Calendar", zh: "日历" })}
            </CommandItem>
            <CommandItem>
              <FileIcon />
              {t({ en: "New file", zh: "新建文件" })}
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t({ en: "Settings", zh: "设置" })}>
            <CommandItem>
              <UserIcon />
              {t({ en: "Profile", zh: "个人资料" })}
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SettingsIcon />
              {t({ en: "Preferences", zh: "偏好设置" })}
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

type Kind = "forms" | "data" | "agent" | "overlays" | "native"
const KINDS: { id: Kind; label: Localized; icon: React.ReactNode }[] = [
  { id: "forms", label: { en: "Forms", zh: "表单" }, icon: <TypeIcon /> },
  { id: "data", label: { en: "Data", zh: "数据" }, icon: <TableIcon /> },
  { id: "agent", label: { en: "Agent", zh: "助手" }, icon: <ChatIcon /> },
  { id: "overlays", label: { en: "Overlays", zh: "浮层" }, icon: <PanelRightIcon /> },
  { id: "native", label: "Native", icon: <SmartphoneIcon /> },
]

/** A row of kinds; each one swaps the live demo below it. */
export function Kinds({ count }: { count: number }) {
  const t = useT()
  const still = useStill()
  const [kind, setKind] = React.useState<Kind>("agent")

  return (
    <section aria-labelledby="kinds-title" className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-8">
      <Reveal className="flex flex-col items-center gap-5 text-center">
        <Eyebrow>{t({ en: `${count} components and blocks`, zh: `${count} 个组件与区块` })}</Eyebrow>
        <h2 id="kinds-title" className="lp-display text-balance text-4xl sm:text-6xl">
          <span className="block">{t({ en: "One library,", zh: "一个组件库，" })}</span>
          <span className="block">{t({ en: "many kinds of UI.", zh: "做各种界面。" })}</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 w-full sm:mt-16">
        <ToggleGroup
          variant="tile"
          value={[kind]}
          onValueChange={(next) => next[0] && setKind(next[0])}
          aria-label={t({ en: "Kind of UI", zh: "界面类型" })}
          className="mx-auto flex w-full max-w-2xl items-start justify-between gap-1 sm:justify-center sm:gap-6"
        >
          {KINDS.map((k) => (
            <ToggleGroupItem key={k.id} value={k.id} className="w-16 sm:w-24">
              <ToggleGroupItemIcon>{k.icon}</ToggleGroupItemIcon>
              {t(k.label)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 w-full">
        <div className="lp-grain lp-sky relative flex min-h-144 items-center justify-center overflow-hidden rounded-3xl px-4 py-10 sm:min-h-120 sm:px-10 sm:py-14">
          <LandingBackdropLayer className="-z-10" />
          {isSky() && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative */}
              <img aria-hidden src={asset("cloud.webp")} alt="" className="lp-drift pointer-events-none absolute -start-24 -bottom-16 -z-10 w-96 opacity-80 dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative */}
              <img aria-hidden src={asset("cloud.webp")} alt="" className="lp-drift pointer-events-none absolute -end-20 -top-12 -z-10 hidden w-80 -scale-x-100 opacity-70 [animation-delay:-6s] sm:block dark:hidden" />
            </>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={kind}
              className="flex w-full justify-center"
              initial={{ opacity: 0, y: still ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: still ? 0 : -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {kind === "forms" ? <FormsDemo /> : null}
              {kind === "data" ? <DataDemo /> : null}
              {kind === "agent" ? <AgentDemo live={!still} /> : null}
              {kind === "overlays" ? <OverlaysDemo /> : null}
              {kind === "native" ? <Phone className="w-full max-w-72" /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
