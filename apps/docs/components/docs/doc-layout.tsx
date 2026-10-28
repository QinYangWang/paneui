import { LocalizedDate, LocalizedText } from "./localized"
import type { Localized } from "@/lib/site-locale"

import type * as React from "react"
import Link from "next/link"

import { ArrowLeftIcon, ArrowRightIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import type { DocsPageRef } from "@/lib/docs"
import { Card } from "@paneui/ui/components/card"
import { Outline, OutlinePopover } from "@paneui/ui/components/outline"
import { PageHeader, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@paneui/ui/components/page-header"
import { Separator } from "@paneui/ui/components/separator"

import { toOutline, type TocEntry } from "./doc-toc"
import { PageActions } from "./page-actions"

/** The page's Markdown twin, written by scripts/gen-docs-md.mjs: `/docs` → `/docs/index.md`, `/docs/button` → `/docs/button.md`. */
export function markdownPath(href: string) {
  return href === "/docs" ? "/docs/index.md" : `${href}.md`
}

/**
 * Page header: the title, the lede, then a row of page actions and anything page-specific
 * (badges, buttons), closed by a hairline. `eyebrow` is kept for callers but not shown.
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
  lede?: React.ReactNode | Localized
  children?: React.ReactNode
}) {
  void eyebrow
  void eyebrowHref
  return (
    <div data-slot="doc-header" className="flex flex-col gap-5 border-b border-border pb-6">
      <PageHeader size="lg">
        <PageHeaderContent>
          <PageHeaderTitle><LocalizedText text={title} /></PageHeaderTitle>
        </PageHeaderContent>
        {lede && <PageHeaderDescription>{typeof lede === "object" && "en" in lede ? <LocalizedText text={lede} /> : typeof lede === "string" ? <LocalizedText text={lede} /> : lede}</PageHeaderDescription>}
      </PageHeader>
      <div className="flex flex-wrap items-center gap-2">
        <PageActions markdownPath={markdownPath(href)} pagePath={href === "/docs" ? "/docs/" : `${href}/`} title={title} />
      </div>
      {children && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  )
}

function PageCard({ page, dir }: { page: DocsPageRef; dir: "prev" | "next" }) {
  const Arrow = dir === "prev" ? ArrowLeftIcon : ArrowRightIcon
  return (
    <Card
      interactive
      size="sm"
      render={<Link href={page.href} rel={dir} />}
      className={cn("min-w-0 flex-1 gap-1 px-4", dir === "next" && "items-end text-end")}
    >
      <span className="flex items-center gap-1 text-ui-sm text-muted-foreground">
        {dir === "prev" && <Arrow className="size-3.5" />}
        <LocalizedText text={dir === "prev" ? "Previous" : "Next"} />
        {dir === "next" && <Arrow className="size-3.5" />}
      </span>
      <span className="w-full truncate text-ui-lg font-medium text-foreground"><LocalizedText text={page.title} /></span>
      <span className="w-full truncate text-ui-sm text-muted-foreground"><LocalizedText text={page.section} /></span>
    </Card>
  )
}

/** Previous and next page in sidebar order, then when the page's sources last changed. */
/** `updated` is an ISO date string (props cross the island boundary as JSON). */
export function DocFooter({ prev, next, updated }: { prev?: DocsPageRef; next?: DocsPageRef; updated?: string }) {
  return (
    <footer data-md-skip className="flex flex-col gap-4">
      <Separator className="mb-2" />
      <nav aria-label="Pagination" className="flex flex-col gap-3 sm:flex-row">
        {prev ? <PageCard page={prev} dir="prev" /> : <span className="hidden flex-1 sm:block" />}
        {next ? <PageCard page={next} dir="next" /> : <span className="hidden flex-1 sm:block" />}
      </nav>
      {updated && (
        <p className="text-ui-sm text-muted-foreground">
          <LocalizedText text="Last updated" /> <LocalizedDate iso={updated} />
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
        {hasToc && (
          // Sticky under the header; on wide pages the button keeps a reading width.
          <div data-md-skip className={cn("sticky top-12 z-30 -my-4 bg-background py-2", !wide && "xl:hidden")}>
            <OutlinePopover items={toOutline(toc)} className={cn(wide && "max-w-sm")} />
          </div>
        )}
        {children}
      </article>
      {hasToc && !wide && (
        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-20">
            <Outline items={toOutline(toc)} />
          </div>
        </aside>
      )}
    </div>
  )
}
