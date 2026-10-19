"use client"

import Link from "next/link"

import { ArrowRightIcon } from "@/components/icons"
import { LazyDemo } from "@/components/docs/lazy-demo"
import { T } from "@/lib/site-locale"
import { Card, CardHeader, CardPanel, CardTitle } from "@/registry/base-nova/ui/card"

import { Reveal } from "./reveal"

/** Live registry demos in window panes; the names come from the server (lib/docs). */
export function Showcase({ panes }: { panes: { name: string; title: string }[] }) {
  return (
    <section className="flex flex-col gap-5">
      <Reveal>
        <h2 className="text-balance text-xl font-semibold">
          <T en="Showcase" zh="组件一览" />
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {panes.map((pane, index) => (
          <Reveal key={pane.name} delay={0.04 * index} className="min-w-0">
            <Card variant="inset" className="group/pane h-full">
              <CardPanel className="flex-1 py-0">
                {/* Demos mount near the viewport and unmount when far away; see LazyDemo. */}
                <LazyDemo name={pane.name} eager={index < 3} className="border-b-0 bg-transparent" />
              </CardPanel>
              <Link
                href={`/docs/${pane.name}`}
                className="outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
              >
                {/* Panes carry the name and the preview only (copy-density rule 1). */}
                <CardHeader className="grid-cols-[minmax(0,1fr)_auto] items-center py-3">
                  <CardTitle className="font-medium">{pane.title}</CardTitle>
                  <ArrowRightIcon
                    size={16}
                    className="col-start-2 shrink-0 text-muted-foreground transition-transform group-hover/pane:translate-x-0.5 group-hover/pane:text-foreground rtl:-scale-x-100 rtl:group-hover/pane:-translate-x-0.5"
                  />
                </CardHeader>
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
