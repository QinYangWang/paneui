import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons"
import { categorySlug } from "@/components/docs/category-icons"
import { IconGrid } from "@/components/docs/icon-grid"
import { InstallCommand } from "@/components/docs/install-command"
import { PreviewTabs } from "@/components/docs/preview-tabs"
import { demoFile, getItem, getItems, readSource, REGISTRY_NAME } from "@/lib/docs"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { Badge } from "@/registry/base-nova/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"
import { Button } from "@/registry/base-nova/ui/button"

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
  const prefix = `@${REGISTRY_NAME}/`
  const deps = [
    ...item.registryDependencies.map((d) => {
      const local = d.startsWith(prefix) ? getItem(d.slice(prefix.length)) : undefined
      return { label: d, href: local ? `/docs/${local.name}` : undefined }
    }),
    ...item.dependencies.map((d) => ({ label: d, href: undefined })),
  ]

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-10">
      <header className="flex flex-col gap-3">
        <Breadcrumb className="-ml-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/docs" />}>Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={`/#${categorySlug(item.category)}`} />}>{item.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
        <p className="text-lg text-muted-foreground">{item.description}</p>
        {deps.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {deps.map((d) =>
              d.href ? (
                <Badge key={d.label} variant="chip" size="sm" render={<Link href={d.href} />}>
                  {d.label}
                </Badge>
              ) : (
                <Badge key={d.label} variant="outline" size="sm">
                  {d.label}
                </Badge>
              )
            )}
          </div>
        )}
      </header>

      <PreviewTabs name={name} code={<AgentCodeBlock code={usage} filename={`${name}-demo.tsx`} maxHeight={520} />} />

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
        <InstallCommand args={`add @${REGISTRY_NAME}/${name}`} />
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
          <AgentCodeBlock key={f} code={readSource(f)} filename={f} maxHeight={520} />
        ))}
      </section>

      <nav aria-label="Pagination" className="flex items-center justify-between gap-3 border-t border-border pt-6">
        {prev ? (
          <Button variant="secondary" nativeButton={false} render={<Link href={`/docs/${prev.name}`} />} className="min-w-0">
            <ArrowLeftIcon data-icon="inline-start" />
            <span className="truncate">{prev.title}</span>
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button variant="secondary" nativeButton={false} render={<Link href={`/docs/${next.name}`} />} className="min-w-0">
            <span className="truncate">{next.title}</span>
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        )}
      </nav>
    </article>
  )
}
