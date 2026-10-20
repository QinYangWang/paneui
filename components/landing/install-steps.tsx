"use client"

import { CLI_PACKAGE, CommandPill } from "@/components/docs/install-command"
import { T, useT, type Localized } from "@/lib/site-locale"
import { Card } from "@/registry/base-nova/ui/card"

import { Reveal } from "./reveal"

const STEPS: { title: Localized; body: Localized; args: string }[] = [
  {
    title: { en: "Register the namespace", zh: "注册命名空间" },
    body: { en: "Point your project at this registry once.", zh: "一次性将项目指向此注册表。" },
    args: "init",
  },
  {
    title: { en: "Install the theme", zh: "安装主题" },
    body: { en: "Adds the colour tokens to your stylesheet.", zh: "把全部色板令牌加入你的样式表。" },
    args: "add @paneui/theme",
  },
  {
    title: { en: "Add components", zh: "添加组件" },
    body: { en: "Copies any item into your codebase as source.", zh: "把任意部件以源码复制进你的代码库。" },
    args: "add button",
  },
]

export function InstallSteps() {
  const t = useT()
  return (
    <section className="flex flex-col gap-5">
      <Reveal>
        <h2 className="text-balance text-xl font-semibold">
          <T en="Installation" zh="安装" />
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal key={t(step.title)} delay={0.04 * index}>
            <Card size="sm" className="h-full">
              <div className="flex h-full flex-col gap-3">
                <span className="font-mono text-ui-xs text-muted-foreground">{`0${index + 1}`}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">{t(step.title)}</h3>
                  <p className="text-pretty text-sm text-muted-foreground">{t(step.body)}</p>
                </div>
                <CommandPill command={`npx ${CLI_PACKAGE} ${step.args}`} className="mt-auto h-9" />
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
