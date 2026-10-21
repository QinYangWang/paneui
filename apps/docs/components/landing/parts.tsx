"use client"

import * as React from "react"
import { cn } from "@paneui/ui/lib/utils"

/** Public files under /landing, with the site's base path. */
export const asset = (file: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/landing/${file}`

/** The small label above a heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-ui-lg font-medium text-foreground/70", className)}>{children}</p>
}
