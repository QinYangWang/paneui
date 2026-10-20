"use client"

import Link from "next/link"

import { ArrowRightIcon, CheckIcon, CopyIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import { ActionSwapBlurIcon } from "@paneui/ui/components/action-swap-blur"
import { Button } from "@paneui/ui/components/button"
import { useCopy } from "@paneui/ui/components/code-block"
import { CLI_PACKAGE } from "@/components/docs/install-command"
import { T, useT, type Localized } from "@/lib/site-locale"

import { Eyebrow } from "./pane-mark"
import { Reveal } from "./reveal"

const LINES: { command: string; note: Localized }[] = [
  { command: `npx ${CLI_PACKAGE}@latest init`, note: { en: "Registers @paneui and installs the theme", zh: "注册 @paneui 并安装主题" } },
  { command: `npx ${CLI_PACKAGE}@latest add button card`, note: { en: "Copies the source into your app", zh: "把源码复制进你的项目" } },
  { command: `npx ${CLI_PACKAGE}@latest update`, note: { en: "Pulls new versions when you want them", zh: "需要时再拉取新版本" } },
]

function Line({ index, command, note, last }: { index: number; command: string; note: string; last: boolean }) {
  const t = useT()
  const { copied, copy } = useCopy()
  return (
    <li className={cn("flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-8 sm:py-6", !last && "border-b border-standout-foreground/10")}>
      <div className="flex items-baseline gap-3 sm:contents">
        <span className="font-serif text-2xl leading-none text-standout-foreground/40 tabular-nums sm:order-1 sm:w-14 sm:shrink-0 sm:text-5xl">{`0${index + 1}`}</span>
        <span className="text-ui-sm text-standout-foreground/60 sm:order-3 sm:w-60 sm:shrink-0 sm:text-end sm:text-ui">{note}</span>
      </div>
      <div className="flex min-w-0 items-center gap-2 sm:contents">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-ui-sm scrollbar-none sm:order-2 sm:text-lg">
          <span aria-hidden className="select-none text-standout-foreground/40">$ </span>
          {command}
        </code>
        <button
          type="button"
          onClick={() => copy(command)}
          aria-label={copied ? t({ en: "Copied", zh: "已复制" }) : t({ en: "Copy command", zh: "复制命令" })}
          className="relative inline-flex size-8 shrink-0 items-center sm:order-4 justify-center rounded-lg text-standout-foreground/60 outline-none transition-colors hover:bg-standout-foreground/10 hover:text-standout-foreground focus-visible:ring-2 focus-visible:ring-ring/50 after:absolute after:-inset-1"
        >
          <ActionSwapBlurIcon value={copied ? "copied" : "copy"}>{copied ? <CheckIcon /> : <CopyIcon />}</ActionSwapBlurIcon>
        </button>
      </div>
    </li>
  )
}

export function Install() {
  const t = useT()
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 sm:px-8">
      <Reveal className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <Eyebrow index={3}>
            <T en="Install" zh="安装" />
          </Eyebrow>
          <h2 className="text-balance break-keep text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
            <T en="Start in one line." zh="一行命令，开始。" />
          </h2>
        </div>
        <div className="flex flex-col items-start gap-4 lg:pb-2">
          <p className="max-w-md text-pretty break-keep text-lg leading-relaxed text-muted-foreground">
            <T en="Works in any React 19 project with Tailwind CSS 4. The files land in your repo, so nothing is locked away." zh="适用于任何使用 Tailwind CSS 4 的 React 19 项目。文件直接放进你的仓库，没有黑盒。" />
          </p>
          <Button variant="secondary" nativeButton={false} render={<Link href="/docs/cli" />}>
            <T en="CLI reference" zh="CLI 文档" />
            <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
          </Button>
        </div>
      </Reveal>
      <Reveal>
        <div className="frame-3xl rounded-3xl bg-surface-standout px-4 py-1 text-standout-foreground shadow-xl sm:px-10 sm:py-4">
          <ol>
            {LINES.map((line, i) => (
              <Line key={line.command} index={i} command={line.command} note={t(line.note)} last={i === LINES.length - 1} />
            ))}
          </ol>
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 px-1 text-ui text-muted-foreground">
          <T en="Or with the shadcn CLI" zh="也可以用 shadcn CLI" />
          <code className="font-mono text-ui-sm text-foreground">npx shadcn@latest add @paneui/button</code>
        </p>
      </Reveal>
    </section>
  )
}
