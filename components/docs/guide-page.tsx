import type * as React from "react"
import Link from "next/link"

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"
import { Button } from "@/registry/base-nova/ui/button"

import { DocToc, type TocEntry } from "./doc-toc"
import { COMPONENTS_HREF, GUIDE_PAGES } from "./docs-pages"

/** Section heading with a self-link, matching the component pages. */
export function GuideH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-20 text-xl font-semibold tracking-tight">
      <a href={`#${id}`} className="outline-none focus-visible:underline">
        {children}
      </a>
    </h2>
  )
}

export function GuideH3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-20 text-lg font-semibold tracking-tight">
      {children}
    </h3>
  )
}

/** Inline code in reading copy. */
export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">{children}</code>
}

/** Underlined text link for reading copy (internal hrefs use next/link). */
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
  return href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

/**
 * Layout for the "Getting started" pages: breadcrumb, title and lede from
 * GUIDE_PAGES, the page body, prev/next through the guide (the last page
 * continues to the components overview) and an "On this page" rail.
 */
export function GuidePage({ href, toc, lede, children }: { href: string; toc?: TocEntry[]; lede?: React.ReactNode; children: React.ReactNode }) {
  const index = GUIDE_PAGES.findIndex((p) => p.href === href)
  const page = GUIDE_PAGES[index]
  const prev = GUIDE_PAGES[index - 1]
  const next: { href: string; title: string } = GUIDE_PAGES[index + 1] ?? { href: COMPONENTS_HREF, title: "Components" }

  return (
    <div className="mx-auto flex max-w-6xl gap-12">
      <article className="mx-auto flex min-w-0 max-w-3xl flex-1 flex-col gap-10">
        <header className="flex flex-col gap-3">
          <Breadcrumb className="-ml-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/docs" />}>Getting started</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{page.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
          <p className="text-lg text-muted-foreground">{lede ?? page.description}</p>
        </header>

        {children}

        <nav aria-label="Pagination" className="flex items-center justify-between gap-3 border-t border-border pt-6">
          {prev ? (
            <Button variant="secondary" nativeButton={false} render={<Link href={prev.href} />} className="min-w-0">
              <ArrowLeftIcon data-icon="inline-start" />
              <span className="truncate">{prev.title}</span>
            </Button>
          ) : (
            <span />
          )}
          <Button variant="secondary" nativeButton={false} render={<Link href={next.href} />} className="min-w-0">
            <span className="truncate">{next.title}</span>
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </nav>
      </article>
      {toc && toc.length > 0 && (
        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-20">
            <DocToc entries={toc} />
          </div>
        </aside>
      )}
    </div>
  )
}
