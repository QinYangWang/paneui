import type { Metadata } from "next"

import { LandingPage } from "@/components/landing/landing-page"
import { getItems } from "@/lib/docs"

export const metadata: Metadata = {
  title: { absolute: "paneui — Small panes. Big ideas." },
  description: "React components for Web and Native that feel at home on the desktop.",
}

export default function Home() {
  // Components and blocks you can install; theme presets and helper files are left out.
  const count = getItems().filter((item) => item.type === "registry:ui" || item.type === "registry:block").length
  return <LandingPage count={count} />
}
