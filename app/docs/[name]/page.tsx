import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons"
import { CodeBlock } from "@/components/docs/code-block"
import { IconGrid } from "@/components/docs/icon-grid"
import { PreviewTabs } from "@/components/docs/preview-tabs"
import { demoFile, getItem, getItems, readSource, REGISTRY_NAME } from "@/lib/docs"
import { Badge } from "@/registry/base-nova/ui/badge"

export function generateStaticParams() {
  return getItems().map((i) => ({ name: i.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const item = getItem((await params).name)
  return item ? { title: item.title, description: item.description } : {}
}

export default async function DocPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const item = getItem(name)
  if (!item) notFound()

  const items = getItems()
  const index = items.findIndex((i) => i.name === name)
  const prev = items[index - 1]
  const next = items[index + 1]
  const usage = readSource(demoFile(name))

  return (
    <article className="flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-3">
        <div className="text-sm text-muted-foreground">{item.category}</div>
        <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
        <p className="text-lg text-muted-foreground">{item.description}</p>
        {item.dependencies.length + item.registryDependencies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[...item.dependencies, ...item.registryDependencies].map((d) => (
              <Badge key={d} variant="outline" size="sm">
                {d}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <PreviewTabs name={name} code={<CodeBlock code={usage} title={`${name}-demo.tsx`} />} />

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @${REGISTRY_NAME}/${name}`} lang="bash" />
      </section>

      {name === "icons" && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-tight">All icons</h2>
          <p className="text-muted-foreground">Click an icon to copy its JSX.</p>
          <IconGrid />
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Source</h2>
        {item.files.map((f) => (
          <CodeBlock key={f} code={readSource(f)} lang={f.endsWith(".css") ? "css" : "tsx"} title={f} />
        ))}
      </section>

      <nav className="flex items-center justify-between border-t border-border pt-6">
        {prev ? (
          <Link href={`/docs/${prev.name}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeftIcon size={16} />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/docs/${next.name}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            {next.title}
            <ArrowRightIcon size={16} />
          </Link>
        )}
      </nav>
    </article>
  )
}
