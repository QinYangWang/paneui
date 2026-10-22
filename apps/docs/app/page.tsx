import type { Metadata } from "next"

import { highlight } from "@/components/docs/docs-code"
import { LandingPage } from "@/components/landing/landing-page"
import { getItems } from "@/lib/docs"

export const metadata: Metadata = {
  title: { absolute: "PaneUI — React components for Web and Native" },
  description: "React components for Web and Native. The source lands in your app.",
}

/* The file shown in the homepage's "own the code" card, highlighted at build time. */
const BUTTON_SOURCE = `import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const button = cva("h-8 rounded-lg px-3", {
  variants: {
    tone: {
      solid: "bg-primary",
      ghost: "hover:bg-secondary",
    },
  },
})

export function Button({ tone, ...props }) {
  return (
    <button
      className={cn(button({ tone }))}
      {...props}
    />
  )
}
`

export default async function Home() {
  // Components and blocks you can install; theme presets and helper files are left out.
  const count = getItems().filter((item) => item.type === "registry:ui" || item.type === "registry:block").length
  return <LandingPage count={count} codeHtml={await highlight(BUTTON_SOURCE, "tsx")} />
}
