"use client"

import { CircleDotIcon, MonitorIcon, SquareCodeIcon } from "@/components/icons"
import { T, useT, type Localized } from "@/lib/site-locale"
import { Card } from "@/registry/base-nova/ui/card"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"

import { Reveal } from "./reveal"

const PRINCIPLES: { icon: typeof MonitorIcon; title: Localized; body: Localized }[] = [
  {
    icon: CircleDotIcon,
    title: { en: "Concentric radius", zh: "同轴圆角" },
    body: { en: "Every corner derives from one radius, so nested parts stay aligned.", zh: "所有圆角源自同一半径，嵌套部件始终对齐。" },
  },
  {
    icon: MonitorIcon,
    title: { en: "Native desktop density", zh: "桌面原生密度" },
    body: { en: "Sizes and spacing are tuned for dense app screens, not marketing pages.", zh: "尺寸与间距为密集的应用界面而调，而非营销页面。" },
  },
  {
    icon: SquareCodeIcon,
    title: { en: "You own the code", zh: "代码归你" },
    body: { en: "Each item installs into your project as source, ready to change.", zh: "每个部件都以源码装进项目，可直接修改。" },
  },
]

export function Principles() {
  const t = useT()
  return (
    <section className="flex flex-col gap-5">
      <Reveal>
        <h2 className="text-balance text-xl font-semibold">
          <T en="Principles" zh="原则" />
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PRINCIPLES.map((principle, index) => {
          const Icon = principle.icon
          return (
            <Reveal key={t(principle.title)} delay={0.04 * index}>
              <Card size="sm" className="h-full">
                <div className="flex flex-col gap-3">
                  <IconChip size="lg">
                    <Icon />
                  </IconChip>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{t(principle.title)}</h3>
                    <p className="text-pretty text-sm text-muted-foreground">{t(principle.body)}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
