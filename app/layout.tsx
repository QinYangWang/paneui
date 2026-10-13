import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google"

import { Sidebar } from "@/components/docs/sidebar"
import { ThemeToggle, themeScript } from "@/components/docs/theme-toggle"
import { getGroups } from "@/lib/docs"
import { ToastProvider } from "@/registry/base-nova/ui/toast"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "qinyang/ui", template: "%s · qinyang/ui" },
  description: "Soft, tactile components on Base UI, distributed via shadcn.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const groups = getGroups().map((g) => ({ category: g.category, items: g.items.map(({ name, title }) => ({ name, title })) }))
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
        <TooltipProvider>
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
            <Link href="/" className="font-semibold tracking-tight">
              qinyang/ui
            </Link>
            <nav className="flex items-center gap-5 text-sm text-muted-foreground">
              <Link href="/docs" className="hover:text-foreground">Docs</Link>
              <Link href="/" className="hover:text-foreground">Components</Link>
              <Link href="/docs/icons" className="hover:text-foreground">Icons</Link>
              <ThemeToggle className="ml-1" />
            </nav>
          </div>
        </header>
        <div className="mx-auto flex max-w-7xl gap-10 px-6">
          <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-52 shrink-0 overflow-y-auto overscroll-contain py-8 scrollbar-hover md:block">
            <Sidebar groups={groups} />
          </aside>
          <main className="min-w-0 flex-1 py-10">{children}</main>
        </div>
        </TooltipProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
