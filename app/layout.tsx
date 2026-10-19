import type { Metadata } from "next"

import { themeScript } from "@/components/docs/theme-script"
import { getNavGroups } from "@/lib/docs"
import { ToastProvider } from "@/registry/base-nova/ui/toast"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

import { RouteShell } from "./route-shell"

import "./fonts.css"
import "./globals.css"

export const metadata: Metadata = {
  // share image URLs are absolute; the base path is added to them by the framework
  metadataBase: new URL(new URL(process.env.SITE_URL ?? "https://qinyangwang.github.io/ui").origin),
  title: { default: "qinyang/ui", template: "%s · qinyang/ui" },
  description: "Quiet, precise React components, distributed as a shadcn registry.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const groups = getNavGroups().map((g) => ({
    category: g.category,
    items: g.items.map(({ name, title, summary }) => ({ name, title, description: summary })),
  }))
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ToastProvider>
          <TooltipProvider>
            <RouteShell groups={groups}>{children}</RouteShell>
          </TooltipProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
