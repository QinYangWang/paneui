import type { Localized } from "@/lib/site-locale"

import type * as React from "react"

import type { DocNav } from "@/lib/doc-types"

import { DocHeading } from "./doc-heading"
import { codeContent, INLINE_CODE_CLS } from "./doc-inline"
import { DocFooter, DocHeader, DocLayout } from "./doc-layout"
import type { TocEntry } from "./doc-toc"
import { GUIDE_PAGES } from "./docs-pages"
import { TextLink } from "./text-link"

export { TextLink }

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


/** The files a guide page is made from, for its "Last updated" date. */
/**
 * Layout for the "Getting started" pages: eyebrow, title, page actions and lede from
 * GUIDE_PAGES, the page body, previous / next in sidebar order with the last-updated date (`nav`,
 * computed at build time by guideNav() in lib/build.ts), and
 * the "On this page" outline.
 */
export function GuidePage({ href, nav, toc, lede, children }: { href: string; nav: DocNav; toc?: TocEntry[]; lede?: React.ReactNode | Localized; children: React.ReactNode }) {
  const page = GUIDE_PAGES.find((p) => p.href === href)!

  return (
    <DocLayout toc={toc}>
      <DocHeader href={href} eyebrow="Getting started" eyebrowHref="/docs" title={page.title} lede={lede ?? page.description} />
      {children}
      <DocFooter prev={nav.prev} next={nav.next} updated={nav.updated} />
    </DocLayout>
  )
}
