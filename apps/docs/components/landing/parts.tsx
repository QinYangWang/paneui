"use client"

import * as React from "react"
import Link from "next/link"

import { ArrowRightIcon, ExternalLinkIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"

/** Public files under /landing, with the site's base path. */
export const asset = (file: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/landing/${file}`

const pill = {
  solid: "bg-foreground text-background hover:bg-foreground/85",
  glass: "bg-card/70 text-foreground shadow-raised backdrop-blur-xl hover:bg-card",
}

/**
 * The landing's call to action: a round-ended link. `solid` is the main action; `glass` sits on
 * the scenery and lets it through.
 */
export function PillLink({
  href,
  tone = "glass",
  size = "default",
  external,
  arrow,
  className,
  children,
}: {
  href: string
  tone?: keyof typeof pill
  size?: "default" | "sm"
  /** Leaves the Next router: other apps on the same host (/native/) or another site. */
  external?: boolean
  arrow?: boolean
  className?: string
  children: React.ReactNode
}) {
  const classes = cn(
    "group/pill inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap outline-none transition-[background-color,box-shadow,color] duration-150 focus-visible:ring-2 focus-visible:ring-ring/50",
    size === "sm" ? "h-9 px-4 text-ui" : "h-11 px-5 text-ui-lg sm:px-6",
    pill[tone],
    className
  )
  const icon = arrow ? (
    external && href.startsWith("http") ? (
      <ExternalLinkIcon size={16} className="opacity-70 rtl:-scale-x-100" />
    ) : (
      <ArrowRightIcon size={16} className="opacity-70 transition-transform duration-200 group-hover/pill:translate-x-0.5 rtl:-scale-x-100" />
    )
  ) : null
  if (external)
    return (
      <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
        {icon}
      </a>
    )
  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  )
}

/** The small label above a heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-ui-lg font-medium text-foreground/70", className)}>{children}</p>
}

/** A desktop window with its own title bar, for live pieces of UI on the scenery. */
export function MiniWindow({
  title,
  end,
  className,
  bodyClassName,
  children,
}: {
  title?: React.ReactNode
  end?: React.ReactNode
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("frame-3xl frame-p-1.5 flex flex-col rounded-3xl bg-shell/80 shadow-xl backdrop-blur-xl", className)}>
      <div className="flex h-8 shrink-0 items-center gap-3 px-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </span>
        {title ? <span className="min-w-0 truncate text-ui font-medium text-muted-foreground">{title}</span> : null}
        {end ? <span className="ms-auto flex items-center">{end}</span> : null}
      </div>
      <div className={cn("frame-inner min-h-0 flex-1 overflow-hidden bg-background", bodyClassName)}>{children}</div>
    </div>
  )
}
