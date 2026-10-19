import type { Metadata } from "next"

import { themeScript } from "@/components/docs/theme-script"
import { getNavGroups } from "@/lib/docs"
import { ogImageSize } from "@/registry/base-nova/ui/og-image"
import { ToastProvider } from "@/registry/base-nova/ui/toast"
import { TooltipProvider } from "@/registry/base-nova/ui/tooltip"

import { RouteShell } from "./route-shell"

import "./fonts.css"
import "./globals.css"

const OG_IMAGE = { ...ogImageSize, type: "image/png", alt: "taimatsu/ui: desktop-density React components" }

export const metadata: Metadata = {
  // share image URLs are absolute
  metadataBase: new URL(new URL(process.env.SITE_URL ?? "https://qinyangwang.github.io/ui").origin),
  title: { default: "taimatsu/ui", template: "%s · taimatsu/ui" },
  description: "Quiet, precise React components, distributed as a shadcn registry.",
  // Metadata image URLs don't get the base path, so it is added here.
  openGraph: { images: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/og.png`, ...OG_IMAGE }] },
  twitter: { card: "summary_large_image", images: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/og.png`, ...OG_IMAGE }] },
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
