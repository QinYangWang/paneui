import type { Metadata } from "next"

import { Hero } from "@/components/landing/hero"
import { InstallSteps } from "@/components/landing/install-steps"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Principles } from "@/components/landing/principles"
import { Showcase } from "@/components/landing/showcase"
import { getItems } from "@/lib/docs"

export const metadata: Metadata = {
  title: { absolute: "paneui" },
  description: "React components that feel at home on the desktop.",
}

/** Registry demos shown in the showcase panes, in display order. */
const SHOWCASE = ["button", "tabs", "avatar", "switch", "task-row", "command-palette"]

export default function LandingPage() {
  const items = getItems()
  const panes = SHOWCASE.map((name) => ({ name, title: items.find((i) => i.name === name)?.title ?? name }))
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Showcase panes={panes} />
      <Principles />
      <InstallSteps />
      <LandingFooter />
    </div>
  )
}
