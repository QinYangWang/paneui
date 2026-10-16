import type * as React from "react"
import Link from "next/link"

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import type { DocsPageRef } from "@/lib/docs"

import { DocToc, DocTocPopover, type TocEntry } from "./doc-toc"
import { PageActions } from "./page-actions"

/** The page's Markdown twin, written by scripts/gen-docs-md.mjs: `/docs` → `/docs/index.md`, `/docs/button` → `/docs/button.md`. */
export function markdownPath(href: string) {
  return href === "/docs" ? "/docs/index.md" : `${href}.md`
}

/**
 * Page header: the section as a small eyebrow (linking to it), then the title with the page
 * actions beside it, then the lede and anything page-specific (badges, buttons).
 */
export function DocHeader({
  href,
  eyebrow,
  eyebrowHref,
  title,
  lede,
  children,
}: {
  href: string
  eyebrow: string
  eyebrowHref: string
  title: string
  lede?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <header className="flex flex-col gap-3">
      <Link
        href={eyebrowHref}
        className="w-fit rounded-sm text-ui font-medium text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {eyebrow}
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <h1 className="min-w-0 text-3xl font-semibold tracking-tight text-balance">{title}</h1>
        <div className="sm:pt-1.5">
          <PageActions markdownPath={markdownPath(href)} pagePath={href === "/docs" ? "/docs/" : `${href}/`} title={title} />
        </div>
      </div>
      {lede && <p className="text-lg text-pretty text-muted-foreground">{lede}</p>}
      {children}
    </header>
  )
}

const dateFormat = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })

function PageCard({ page, dir }: { page: DocsPageRef; dir: "prev" | "next" }) {
  const Arrow = dir === "prev" ? ArrowLeftIcon : ArrowRightIcon
  return (
    <Link
      href={page.href}
      rel={dir}
      className={cn(
        "group/card flex min-w-0 flex-1 flex-col gap-1 rounded-xl bg-card px-4 py-3 shadow-raised transition-[box-shadow,background-color] duration-150 outline-none hover:bg-accent hover:shadow-raised-hover focus-visible:ring-2 focus-visible:ring-ring/50",
        dir === "next" && "items-end text-end",
      )}
    >
      <span className="flex items-center gap-1 text-ui-sm text-muted-foreground">
        {dir === "prev" && <Arrow className="size-3.5" />}
        {dir === "prev" ? "Previous" : "Next"}
        {dir === "next" && <Arrow className="size-3.5" />}
      </span>
      <span className="w-full truncate text-ui-lg font-medium text-foreground">{page.title}</span>
      <span className="w-full truncate text-ui-sm text-muted-foreground">{page.section}</span>
    </Link>
  )
}

/** Previous and next page in sidebar order, then when the page's sources last changed. */
export function DocFooter({ prev, next, updated }: { prev?: DocsPageRef; next?: DocsPageRef; updated?: Date }) {
  return (
    <footer data-md-skip className="flex flex-col gap-4 border-t border-border pt-6">
      <nav aria-label="Pagination" className="flex flex-col gap-3 sm:flex-row">
        {prev ? <PageCard page={prev} dir="prev" /> : <span className="hidden flex-1 sm:block" />}
        {next ? <PageCard page={next} dir="next" /> : <span className="hidden flex-1 sm:block" />}
      </nav>
      {updated && (
        <p className="text-ui-sm text-muted-foreground">
          Last updated <time dateTime={updated.toISOString()}>{dateFormat.format(updated)}</time>
        </p>
      )}
    </footer>
  )
}

/**
 * Article plus outline. Regular pages keep the outline in a sticky rail from `xl` and fold it into
 * a popover button above the content below that; `wide` pages give the rail's width to the content
 * and always use the popover.
 */
export function DocLayout({ toc, wide, children }: { toc?: TocEntry[]; wide?: boolean; children: React.ReactNode }) {
  const hasToc = !!toc && toc.length > 0
  return (
    <div className="mx-auto flex max-w-6xl gap-12">
      <article className={cn("mx-auto flex min-w-0 flex-1 flex-col gap-10", wide ? "max-w-6xl" : "max-w-3xl")}>
        {hasToc && <DocTocPopover entries={toc} narrow={wide} className={wide ? undefined : "xl:hidden"} />}
        {children}
      </article>
      {hasToc && !wide && (
        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-20">
            <DocToc entries={toc} />
          </div>
        </aside>
      )}
    </div>
  )
}
