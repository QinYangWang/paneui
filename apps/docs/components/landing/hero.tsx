"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import { Button } from "@paneui/ui/components/button"
import { CLI_PACKAGE, CommandPill } from "@/components/docs/install-command"
import { T, useSiteLocale } from "@/lib/site-locale"

import { PaneWindow } from "./pane-window"

const EASE = [0.22, 1, 0.36, 1] as const

function Rise({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className={cn("block", className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  )
}

export function Hero() {
  const zh = useSiteLocale() === "zh"
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-12 sm:px-8 sm:pt-20">
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
          <Rise delay={0} className="font-mono text-ui-sm text-muted-foreground uppercase tracking-wider">
            <T en="React components for Web and Native" zh="面向 Web 与 Native 的 React 组件" />
          </Rise>
          <h1 className="text-balance text-5xl leading-none font-semibold tracking-tight sm:text-7xl xl:text-8xl">
            <Rise delay={0.05}>
              <T en="Small panes." zh="一方窗格，" />
            </Rise>
            <Rise delay={0.14} className={cn("pt-1 font-serif font-normal text-primary sm:pt-2", !zh && "italic")}>
              <T en="Big ideas." zh="万千可能。" />
            </Rise>
          </h1>
        </div>
        <motion.div
          className="flex flex-col gap-5 lg:col-span-5 lg:pb-2 xl:col-span-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <p className="max-w-md text-pretty break-keep text-lg leading-relaxed text-muted-foreground">
            <T
              en="Components that feel at home on the desktop. Copy the source into your app and make it yours."
              zh="有桌面原生质感的组件。源码装进项目，随你改。"
            />
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="lg" nativeButton={false} render={<Link href="/docs/installation" />}>
              <T en="Get started" zh="快速上手" />
              <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
            </Button>
            <Button size="lg" variant="secondary" nativeButton={false} render={<Link href="/docs/components" />}>
              <T en="Browse components" zh="浏览组件" />
            </Button>
          </div>
          <CommandPill command={`npx ${CLI_PACKAGE}@latest init`} className="w-full max-w-sm" />
        </motion.div>
      </div>
      <PaneWindow className="mt-12 sm:mt-16" />
    </section>
  )
}
