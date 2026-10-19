import type { Localized } from "@/lib/site-locale"

import type * as React from "react"
import Link from "next/link"

import { getPrevNext, lastUpdated } from "@/lib/docs"

import { DocHeading } from "./doc-heading"
import { codeContent, INLINE_CODE_CLS } from "./doc-inline"
import { DocFooter, DocHeader, DocLayout } from "./doc-layout"
import type { TocEntry } from "./doc-toc"
import { GUIDE_PAGES } from "./docs-pages"

/** Section heading with a copy-link anchor, matching the component pages. */
export function GuideH2({ id, children }: { id: string; children: React.ReactNode }) {
  return <DocHeading id={id}>{children}</DocHeading>
}

export function GuideH3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <DocHeading as="h3" id={id}>
      {children}
    </DocHeading>
  )
}

/** Inline code in reading copy. */
export function Code({ children }: { children: React.ReactNode }) {
  return <code className={`${INLINE_CODE_CLS} text-xs`}>{codeContent(children)}</code>
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

/** The files a guide page is made from, for its "Last updated" date. */
function guideSources(href: string) {
  const page = href === "/docs" ? "app/docs/page.tsx" : `app${href}/page.tsx`
  if (href === "/docs/skill") return [page, "skills/qinyang-design", "components/docs/skill-examples.tsx"]
  return [page]
}

/**
 * Layout for the "Getting started" pages: eyebrow, title, page actions and lede from
 * GUIDE_PAGES, the page body, previous / next in sidebar order with the last-updated date, and
 * the "On this page" outline.
 */
export function GuidePage({ href, toc, lede, children }: { href: string; toc?: TocEntry[]; lede?: React.ReactNode | Localized; children: React.ReactNode }) {
  const page = GUIDE_PAGES.find((p) => p.href === href)!
  const { prev, next } = getPrevNext(href)

  return (
    <DocLayout toc={toc}>
      <DocHeader href={href} eyebrow="Getting started" eyebrowHref="/docs" title={page.title} lede={lede ?? page.description} />
      {children}
      <DocFooter prev={prev} next={next} updated={lastUpdated(guideSources(href))} />
    </DocLayout>
  )
}
