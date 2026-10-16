import type { Metadata } from "next"

import { DocsTemplate, type DocsLayout } from "@/registry/base-nova/templates/docs/docs"

/** Preview routes for the docs template's other layouts; /templates/docs is the classic one. */
const LAYOUTS: { layout: DocsLayout; title: string }[] = [
  { layout: "notebook", title: "Notebook" },
  { layout: "flux", title: "Flux" },
  { layout: "spacious", title: "Spacious" },
  { layout: "home", title: "Home" },
]

export const dynamicParams = false

export function generateStaticParams() {
  return LAYOUTS.map((l) => ({ layout: l.layout }))
}

export async function generateMetadata({ params }: { params: Promise<{ layout: string }> }): Promise<Metadata> {
  const { layout } = await params
  return { title: `Docs template · ${LAYOUTS.find((l) => l.layout === layout)?.title ?? layout}` }
}

export default async function DocsLayoutPreview({ params }: { params: Promise<{ layout: string }> }) {
  const { layout } = await params
  return <DocsTemplate layout={layout as DocsLayout} />
}
