"use client"

import { DocsTemplate, type DocsLayout } from "@/registry/templates/docs/docs"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"

/** `/templates/docs` is the classic layout; the others live at `/templates/docs/<layout>`. */
export type DocsTemplateData = { layout: DocsLayout }

/** A docs template page in one of its five layouts. */
export default function DocsTemplateRoute({ site, data }: { site: SiteProps; data: DocsTemplateData }) {
  return (
    <SiteRoot {...site}>
      <DocsTemplate layout={data.layout} />
    </SiteRoot>
  )
}
