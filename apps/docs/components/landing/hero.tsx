"use client"

import Link from "next/link"

import { ArrowRightIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { CommandCopy } from "@paneui/ui/components/command-copy"
import { CLI_PACKAGE } from "@/components/docs/install-command"
import { useT } from "@/lib/site-locale"

import { FRAME } from "./landing-chrome"

const COMMAND = `npx ${CLI_PACKAGE}@latest init`

/**
 * Hero on the page's frame: the headline on the left seven columns, the line, the install command
 * and the two actions on the right five, their last lines meeting on one baseline. The wall
 * of live components follows straight under it as the first screen's picture.
 */
export function Hero() {
  const t = useT()
  return (
    <section aria-labelledby="hero-title" className={`${FRAME} pt-14 pb-24 sm:pt-20 lg:pt-24`}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        {/* Painted on the first frame: nothing on the first screen waits for the island to hydrate or animate in. */}
        <h1 id="hero-title" className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:col-span-7 lg:text-7xl">
          {t({ en: "React components for app interfaces", zh: "为应用界面而做的 React 组件" })}
        </h1>
        <div className="flex flex-col gap-5 lg:col-span-5">
          <p className="max-w-md text-base text-pretty text-muted-foreground sm:text-lg">
            {t({ en: "Accessible, animated and themed. The source lands in your app, ready to edit.", zh: "无障碍、带动效、可换主题。源码直接放进你的项目，随时修改。" })}
          </p>
          <div className="flex w-full max-w-md flex-col gap-3">
            <CommandCopy command={COMMAND} />
            <div className="flex flex-wrap items-center gap-2">
              <Button nativeButton={false} render={<Link href="/docs" />}>
                {t({ en: "Get started", zh: "开始使用" })}
                <ArrowRightIcon data-icon="inline-end" className="rtl:-scale-x-100" />
              </Button>
              <Button variant="outline" nativeButton={false} render={<Link href="/docs/components" />}>
                {t({ en: "Browse components", zh: "浏览组件" })}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
