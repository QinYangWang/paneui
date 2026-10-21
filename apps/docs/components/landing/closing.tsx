"use client"

import { CheckIcon, CopyIcon, PaneuiLogoIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import { ActionSwapBlurIcon } from "@paneui/ui/components/action-swap-blur"
import { useCopy } from "@paneui/ui/components/code-block"
import { CLI_PACKAGE } from "@/components/docs/install-command"
import { useT } from "@/lib/site-locale"

import { asset, Eyebrow, PillLink } from "./parts"
import { Reveal } from "./reveal"

/** A quiet line between the big cards, signed with the mark. */
export function Quote({ children, align = "start" }: { children: React.ReactNode; align?: "start" | "end" }) {
  return (
    <Reveal className="mx-auto w-full max-w-5xl px-5 sm:px-8">
      <figure className={cn("flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-start", align === "end" && "sm:flex-row-reverse sm:text-end")}>
        <figcaption className="flex shrink-0 items-center gap-3 text-ui-lg text-muted-foreground">
          <span className="flex size-10 items-center justify-center rounded-full bg-card shadow-raised">
            <PaneuiLogoIcon size={20} />
          </span>
          paneui
        </figcaption>
        <span aria-hidden className="hidden h-px w-16 shrink-0 bg-border sm:block" />
        <blockquote className="lp-display text-balance max-w-2xl text-2xl text-foreground/85 sm:text-3xl">{children}</blockquote>
      </figure>
    </Reveal>
  )
}

const COMMAND = `npx ${CLI_PACKAGE}@latest init`

export function Install() {
  const t = useT()
  const { copied, copy } = useCopy()
  return (
    <section aria-labelledby="install-title" className="relative isolate mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative */}
      <img aria-hidden src={asset("cloud.webp")} alt="" className="lp-drift pointer-events-none absolute -start-24 -top-20 -z-10 w-80 opacity-70 sm:w-md dark:hidden" />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative */}
      <img aria-hidden src={asset("cloud.webp")} alt="" className="lp-drift pointer-events-none absolute -end-28 top-48 -z-10 hidden w-96 -scale-x-100 opacity-60 [animation-delay:-7s] sm:block dark:hidden" />
      <Reveal className="flex flex-col items-center gap-5">
        <Eyebrow>{t({ en: "Install", zh: "安装" })}</Eyebrow>
        <h2 id="install-title" className="lp-display text-balance text-4xl sm:text-6xl">
          <span className="block">{t({ en: "Start with", zh: "一行命令，" })}</span>
          <span className="block">{t({ en: "one line.", zh: "就能开始。" })}</span>
        </h2>
        <p className="max-w-md text-pretty text-base text-foreground/70 sm:text-lg">
          {t({ en: "Works in any React 19 project with Tailwind CSS 4.", zh: "适用于任何使用 Tailwind CSS 4 的 React 19 项目。" })}
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-10 w-full max-w-xl">
        <div className="flex h-14 w-full items-center gap-3 rounded-full bg-card/80 ps-4 pe-2 sm:ps-6 shadow-xl backdrop-blur-xl">
          <code className="min-w-0 flex-1 overflow-x-auto text-start font-mono text-ui-sm whitespace-nowrap sm:text-ui-lg scrollbar-none">
            <span aria-hidden className="text-muted-foreground select-none">$ </span>
            {COMMAND}
          </code>
          <button
            type="button"
            onClick={() => copy(COMMAND)}
            aria-label={copied ? t({ en: "Copied", zh: "已复制" }) : t({ en: "Copy command", zh: "复制命令" })}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background outline-none transition-colors duration-150 hover:bg-foreground/85 focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <ActionSwapBlurIcon value={copied ? "copied" : "copy"}>{copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}</ActionSwapBlurIcon>
          </button>
        </div>
        <div className="mt-5">
          <PillLink href="/docs/installation" size="sm" arrow>
            {t({ en: "Installation guide", zh: "安装指南" })}
          </PillLink>
        </div>
      </Reveal>
    </section>
  )
}

/** The last card: one more way in. */
export function GetStarted() {
  const t = useT()
  return (
    <Reveal as="section" className="mx-auto w-full max-w-6xl px-2 sm:px-8">
      <div
        aria-labelledby="start-title"
        className="lp-grain lp-mint flex flex-col items-start gap-8 overflow-hidden rounded-3xl px-6 py-10 sm:px-12 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-14"
      >
        <div className="flex flex-col gap-3">
          <h2 id="start-title" className="lp-display text-balance text-4xl sm:text-5xl">
            {t({ en: "Let’s get started.", zh: "现在就开始吧。" })}
          </h2>
          <p className="lp-display text-balance text-xl text-foreground/70 sm:text-2xl">{t({ en: "Free and open source, under MIT.", zh: "免费开源，MIT 许可。" })}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
          <PillLink href="/docs/components">{t({ en: "Browse components", zh: "浏览组件" })}</PillLink>
          <PillLink href="/docs" tone="solid">
            {t({ en: "Read the docs", zh: "阅读文档" })}
          </PillLink>
        </div>
      </div>
    </Reveal>
  )
}
