"use client"

import * as React from "react"

import { CalendarDaysIcon, FileIcon, InboxIcon, SettingsIcon, UserIcon } from "@paneui/ui/icons"
import { Alert, AlertAction, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@paneui/ui/components/alert"
import { Button } from "@paneui/ui/components/button"
import { Calendar } from "@paneui/ui/components/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@paneui/ui/components/card"
import { Checkbox } from "@paneui/ui/components/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@paneui/ui/components/command"
import { Field, FieldGroup, FieldLabel } from "@paneui/ui/components/field"
import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"
import { Progress, ProgressLabel, ProgressValue } from "@paneui/ui/components/progress"
import { Radio, RadioGroup } from "@paneui/ui/components/radio"
import { Switch } from "@paneui/ui/components/switch"
import { TrendChart } from "@paneui/ui/components/trend-chart"
import { useT, type Localized } from "@/lib/site-locale"

import { AccentControls } from "./features"
import { Checklist, Composer, Deploy, Messages, Requests, Usage } from "./pieces"
import { useStill } from "./reveal"

function ProjectCard() {
  const t = useT()
  return (
    <Card>
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
  )
}

function NotifyCard() {
  const t = useT()
  return (
    <Card size="sm">
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

function UsersCard() {
  const t = useT()
  const data = MONTHS.map((m, i) => ({ label: t(m), values: { new: 12 + i * 3 + (i % 2) * 2, back: 5 + i * 2 + ((i + 1) % 2) } }))
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t({ en: "Active users", zh: "活跃用户" })}</CardTitle>
      </CardHeader>
      <CardContent>
        <TrendChart
          series={[
            { id: "new", label: t({ en: "New", zh: "新用户" }) },
            { id: "back", label: t({ en: "Returning", zh: "回访" }) },
          ]}
          data={data}
          height={160}
          formatValue={(v) => `${v}k`}
          label={t({ en: "Active users by month", zh: "每月活跃用户" })}
        />
      </CardContent>
    </Card>
  )
}

function StorageCard() {
  const t = useT()
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{t({ en: "Storage", zh: "存储" })}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={72}>
          <ProgressLabel>{t({ en: "Upload", zh: "上传" })}</ProgressLabel>
          <ProgressValue />
        </Progress>
        <Progress value={18}>
          <ProgressLabel>{t({ en: "Backups", zh: "备份" })}</ProgressLabel>
          <ProgressValue />
        </Progress>
      </CardContent>
    </Card>
  )
}

function UpdateAlert() {
  const t = useT()
  return (
    <Alert variant="info">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>{t({ en: "Update available", zh: "有可用更新" })}</AlertTitle>
        <AlertDescription>{t({ en: "A newer version is ready.", zh: "新版本已就绪。" })}</AlertDescription>
      </AlertContent>
      <AlertAction>
        <Button size="xs">{t({ en: "Update", zh: "更新" })}</Button>
      </AlertAction>
    </Alert>
  )
}

function CalendarCard() {
  const [date, setDate] = React.useState<Date | null>(null)
  // The date is set after mount so the static HTML and the first client render match.
  React.useEffect(() => setDate(new Date()), [])
  return (
    <Card className="items-center p-3">
      <Calendar value={date} onValueChange={setDate} />
    </Card>
  )
}

function CommandCard() {
  const t = useT()
  return (
    <div className="rounded-xl shadow-raised">
      <Command>
        <CommandInput placeholder={t({ en: "Type a command", zh: "输入命令" })} aria-label={t({ en: "Search commands", zh: "搜索命令" })} />
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

function ChatCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-background p-4 shadow-raised">
      <Messages />
      <Composer />
    </div>
  )
}

/**
 * The component wall: live components in four masonry columns, with the accent and radius
 * controls above. Changing either repaints every card at once.
 */
export function Wall() {
  const t = useT()
  const still = useStill()
  const columns: React.ReactNode[][] = [
    [<ProjectCard key="project" />, <UpdateAlert key="alert" />, <Requests key="requests" />],
    [<UsersCard key="users" />, <NotifyCard key="notify" />, <StorageCard key="storage" />],
    [<CommandCard key="command" />, <Deploy key="deploy" />, <Checklist key="checklist" live={!still} />],
    [<CalendarCard key="calendar" />, <ChatCard key="chat" />, <Usage key="usage" />],
  ]
  return (
    <section aria-labelledby="wall-title" className="flex flex-col items-center gap-8 px-4 sm:px-6">
      <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
        <h2 id="wall-title" className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {t({ en: "One install, and it already looks like this", zh: "装上就是这个样子" })}
        </h2>
        <p className="text-base text-pretty text-muted-foreground sm:text-lg">
          {t({
            en: "Press anything. Then change the accent or the corners: every card reads the same tokens.",
            zh: "随便点点看。再换个主题色或圆角：所有卡片读取同一套变量。",
          })}
        </p>
      </div>
      <AccentControls />
      <div className="grid w-full max-w-7xl grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {columns.map((col, i) => (
          <div key={i} className="flex min-w-0 flex-col gap-4">
            {col}
          </div>
        ))}
      </div>
    </section>
  )
}
