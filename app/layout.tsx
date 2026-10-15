import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"

import { themeScript } from "@/components/docs/theme-script"
import { getNavGroups } from "@/lib/docs"
import { ToastProvider } from "@/registry/base-nova/ui/toast"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

import { RouteShell } from "./route-shell"

import "./globals.css"

// UI text uses the system font stack (globals.css); only the mono face is loaded.
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] })

export const metadata: Metadata = {
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
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <ToastProvider>
          <TooltipProvider>
            <RouteShell groups={groups}>{children}</RouteShell>
          </TooltipProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
