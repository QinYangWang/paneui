"use client"

import Link from "next/link"

import { ArrowRightIcon, TaimatsuLogoIcon } from "@/components/icons"
import { CLI_NAME, CommandPill } from "@/components/docs/install-command"
import { T } from "@/lib/site-locale"
import { Button } from "@/registry/base-nova/ui/button"

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-5 pt-4 text-center sm:pt-8">
      <div className="flex items-center gap-2.5">
        <TaimatsuLogoIcon size={30} className="text-foreground" />
        <span className="text-2xl font-semibold tracking-tight">paneui</span>
      </div>
      <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        <T en="Interfaces, one pane at a time." zh="界面，一格一格做。" />
      </h1>
      <p className="text-pretty text-lg text-muted-foreground">
        <T en="React components that feel at home on the desktop." zh="有桌面原生质感的 React 组件。" />
      </p>
      <div className="flex flex-wrap justify-center gap-2 pt-1">
        <Button nativeButton={false} render={<Link href="/docs/installation" />}>
          <T en="Get started" zh="快速上手" />
          <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
        </Button>
        <Button variant="secondary" nativeButton={false} render={<Link href="/docs/components" />}>
          <T en="Components" zh="组件一览" />
        </Button>
      </div>
      {/* CLI_NAME reads the npm name from packages/cli, so the pill tracks the rename to `paneui`. */}
      <CommandPill command={`npx ${CLI_NAME} init`} className="mt-1 w-full max-w-60" />
    </section>
  )
}
