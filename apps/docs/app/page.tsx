import type { Metadata } from "next"

import { LandingPage } from "@/components/landing/landing-page"

export const metadata: Metadata = {
  title: { absolute: "paneui — Small panes. Big ideas." },
  description: "React components for interfaces people work in. Own the source, shape every detail.",
}

export default function Home() {
  return <LandingPage />
}
