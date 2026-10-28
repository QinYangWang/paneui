"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { CommandCopy } from "@paneui/ui/components/command-copy"
import { CLI_PACKAGE } from "@/components/docs/install-command"
import { useT } from "@/lib/site-locale"

import { EASE, useStill } from "./reveal"

const COMMAND = `npx ${CLI_PACKAGE}@latest init`

const rise = (delay: number, still: boolean) => ({
  initial: { opacity: 0, y: still ? 0 : 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: still ? 0.3 : 0.7, delay: still ? 0 : delay, ease: EASE },
})

/** Centred hero: a dotted field, the headline, one line, the install command and two buttons. */
export function Hero() {
  const t = useT()
  const still = useStill()
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-border">
      <div aria-hidden className="lp-dots absolute inset-x-0 top-0 -z-10 h-72" />
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 pt-28 pb-20 text-center sm:pt-36 sm:pb-24">
        <motion.h1 id="hero-title" className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl" {...rise(0, still)}>
          {t({ en: "React components for app interfaces", zh: "为应用界面而做的 React 组件" })}
        </motion.h1>
        <motion.p className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg" {...rise(0.08, still)}>
          {t({ en: "Accessible, animated and themed. The source lands in your app, ready to edit.", zh: "无障碍、带动效、可换主题。源码直接放进你的项目，随时修改。" })}
        </motion.p>
        <motion.div className="mt-8 w-full max-w-md" {...rise(0.16, still)}>
          <CommandCopy command={COMMAND} />
        </motion.div>
        <motion.div className="mt-5 flex flex-wrap items-center justify-center gap-2" {...rise(0.22, still)}>
          <Button nativeButton={false} render={<Link href="/docs" />}>
            {t({ en: "Get started", zh: "开始使用" })}
            <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
          </Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/docs/components" />}>
            {t({ en: "Browse components", zh: "浏览组件" })}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
