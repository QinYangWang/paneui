import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { themeScript } from "@/components/docs/theme-script"
import { getGroups } from "@/lib/docs"
import { ToastProvider } from "@/registry/base-nova/ui/toast"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

import { RouteShell } from "./route-shell"

import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "qinyang/ui", template: "%s · qinyang/ui" },
  description: "Quiet, precise components on Base UI, distributed via shadcn.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const groups = getGroups().map((g) => ({
    category: g.category,
    items: g.items.map(({ name, title, description }) => ({ name, title, description })),
  }))
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
          <TooltipProvider>
            <RouteShell groups={groups}>{children}</RouteShell>
          </TooltipProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
