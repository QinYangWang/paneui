import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons"
import { categorySlug } from "@/components/docs/category-icons"
import { IconGrid } from "@/components/docs/icon-grid"
import { Inline } from "@/components/docs/doc-inline"
import { DocToc, type TocEntry } from "@/components/docs/doc-toc"
import { InstallCommand, PackageInstall } from "@/components/docs/install-command"
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
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/base-nova/ui/tabs"
import { docsContent } from "@/content/docs/index.generated"
import type { PartDoc } from "@/lib/doc-types"

export function generateStaticParams() {
  return getItems().map((i) => ({ name: i.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const item = getItem((await params).name)
  return item ? { title: item.title, description: item.description } : {}
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group/h scroll-mt-20 text-xl font-semibold tracking-tight">
      <a href={`#${id}`} className="outline-none focus-visible:underline">
        {children}
      </a>
    </h2>
  )
}

function ApiPart({ part }: { part: PartDoc }) {
  const id = `api-${part.name.toLowerCase()}`
  return (
    <div className="flex flex-col gap-3">
      <h3 id={id} className="scroll-mt-20 font-mono text-base font-semibold">
        {part.name}
      </h3>
      {(part.description || part.extends) && (
        <p className="text-muted-foreground">
          {part.description && <Inline text={part.description} />}
          {part.extends && (
            <>
              {part.description ? " " : ""}Also accepts every prop of{" "}
              {part.extendsHref ? (
                <a
                  href={part.extendsHref}
                  className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  {part.extends}
                </a>
              ) : (
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                  {part.extends}
                </code>
              )}
              .
            </>
          )}
        </p>
      )}
      {part.props.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-card shadow-raised">
          <table className="w-full min-w-xl border-collapse text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-4 py-2.5 font-medium">Prop</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium">Default</th>
                <th className="px-4 py-2.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {part.props.map((p) => (
                <tr key={p.name} className="border-b border-border align-top last:border-b-0">
                  <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-foreground">
                    {p.name}
                    {p.required && <span className="text-destructive">*</span>}
                  </td>
                  <td className="max-w-64 px-4 py-2.5 font-mono text-xs break-words text-primary">{p.type}</td>
                  <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-muted-foreground">
                    {p.default ?? "—"}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    <Inline text={p.description} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {part.dataAttributes && part.dataAttributes.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-card shadow-raised">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-4 py-2.5 font-medium">Data attribute</th>
                <th className="px-4 py-2.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {part.dataAttributes.map((d) => (
                <tr key={d.name} className="border-b border-border align-top last:border-b-0">
                  <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-foreground">{d.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    <Inline text={d.description} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
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
  const doc = docsContent[name]
  const exampleCode = (id: string) => readSource(`registry/base-nova/examples/${name}/${id}.tsx`)
  const toc: TocEntry[] = [
    { id: "installation", title: "Installation" },
    ...(doc ? [{ id: "usage", title: "Usage" }] : []),
    ...(doc?.composition ? [{ id: "composition", title: "Composition" }] : []),
    ...(doc && doc.examples.length > 0
      ? [
          { id: "examples", title: "Examples" },
          ...doc.examples.map((e) => ({
            id: `example-${e.id}`,
            title: e.title,
            depth: 2 as const,
          })),
        ]
      : []),
    ...(doc?.notes ?? []).map((n) => ({
      id: `note-${n.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: n.title,
    })),
    ...(name === "icons" ? [{ id: "all-icons", title: "All icons" }] : []),
    ...(doc && (doc.api.length > 0 || doc.baseUi) ? [{ id: "api-reference", title: "API Reference" }] : []),
  ]
  const prefix = `@${REGISTRY_NAME}/`
  const deps = [
    ...item.registryDependencies.map((d) => {
      const local = d.startsWith(prefix) ? getItem(d.slice(prefix.length)) : undefined
      return { label: d, href: local ? `/docs/${local.name}` : undefined }
    }),
    ...item.dependencies.map((d) => ({ label: d, href: undefined })),
  ]

  return (
    <div className="mx-auto flex max-w-6xl gap-12">
      <article className="mx-auto flex min-w-0 max-w-3xl flex-1 flex-col gap-10">
        <header className="flex flex-col gap-3">
          <Breadcrumb className="-ml-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/docs" />}>Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={`/#${categorySlug(item.category)}`} />}>
                  {item.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
          <p className="text-lg text-muted-foreground">{item.description}</p>
          {doc?.baseUi && (
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" size="sm" render={<a href={doc.baseUi.href} />}>
                Base UI {doc.baseUi.name}
              </Badge>
            </div>
          )}
          {item.category === "Templates" && (
            <div className="flex flex-wrap gap-2 pt-1">
              <Button nativeButton={false} render={<Link href={`/templates/${item.name}/`} />}>
                Open template
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </div>
          )}
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
                ),
              )}
            </div>
          )}
        </header>

        <PreviewTabs name={name} code={<AgentCodeBlock code={usage} filename={`${name}-demo.tsx`} maxHeight={520} />} />

        <section className="flex flex-col gap-4">
          <H2 id="installation">Installation</H2>
          <Tabs defaultValue="command">
            <TabsList>
              <TabsTab value="command">Command</TabsTab>
              <TabsTab value="manual">Manual</TabsTab>
            </TabsList>
            <TabsPanel value="command" className="pt-2">
              <InstallCommand args={`add @${REGISTRY_NAME}/${name}`} />
            </TabsPanel>
            <TabsPanel value="manual" className="flex flex-col gap-5 pt-2">
              {item.dependencies.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <p className="font-medium">Install the dependencies:</p>
                  <PackageInstall packages={item.dependencies} />
                </div>
              )}
              {item.registryDependencies.length > 0 && (
                <p className="text-muted-foreground">
                  Add the registry items it builds on first:{" "}
                  {item.registryDependencies.map((d, i) => (
                    <React.Fragment key={d}>
                      {i > 0 && ", "}
                      <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                        {d}
                      </code>
                    </React.Fragment>
                  ))}
                  .
                </p>
              )}
              <div className="flex flex-col gap-2.5">
                <p className="font-medium">Copy the source into your project:</p>
                {item.files.map((f) => (
                  <AgentCodeBlock key={f} code={readSource(f)} filename={f} maxHeight={420} />
                ))}
              </div>
              <p className="text-muted-foreground">Update the import paths to match your project setup.</p>
            </TabsPanel>
          </Tabs>
        </section>

        {doc && (
          <section className="flex flex-col gap-4">
            <H2 id="usage">Usage</H2>
            <AgentCodeBlock code={doc.usage.imports} language="tsx" />
            <AgentCodeBlock code={doc.usage.code} language="tsx" />
          </section>
        )}

        {doc?.composition && (
          <section className="flex flex-col gap-4">
            <H2 id="composition">Composition</H2>
            <AgentCodeBlock code={doc.composition} language="text" />
          </section>
        )}

        {doc && doc.examples.length > 0 && (
          <section className="flex flex-col gap-10">
            <H2 id="examples">Examples</H2>
            {doc.examples.map((ex) => (
              <div key={ex.id} className="flex flex-col gap-3">
                <h3 id={`example-${ex.id}`} className="scroll-mt-20 text-lg font-semibold tracking-tight">
                  {ex.title}
                </h3>
                {ex.description && (
                  <p className="text-muted-foreground">
                    <Inline text={ex.description} />
                  </p>
                )}
                <PreviewTabs
                  example={`${name}/${ex.id}`}
                  code={<AgentCodeBlock code={exampleCode(ex.id)} filename={`${ex.id}.tsx`} maxHeight={420} />}
                />
              </div>
            ))}
          </section>
        )}

        {doc?.notes?.map((n) => (
          <section key={n.title} className="flex flex-col gap-3">
            <H2 id={`note-${n.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{n.title}</H2>
            <p className="text-muted-foreground">
              <Inline text={n.body} />
            </p>
          </section>
        ))}

        {name === "icons" && (
          <section className="flex flex-col gap-3">
            <H2 id="all-icons">All icons</H2>
            <p className="text-muted-foreground">Click an icon to copy its JSX.</p>
            <IconGrid />
          </section>
        )}

        {doc && (doc.api.length > 0 || doc.baseUi) && (
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <H2 id="api-reference">API Reference</H2>
              {doc.baseUi && (
                <p className="text-muted-foreground">
                  Built on{" "}
                  <a
                    href={`${doc.baseUi.href}#api-reference`}
                    className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    Base UI {doc.baseUi.name}
                  </a>
                  . Only the props this library adds or changes are listed; everything else passes through.
                </p>
              )}
            </div>
            {doc.api.map((part) => (
              <ApiPart key={part.name} part={part} />
            ))}
          </section>
        )}

        <nav aria-label="Pagination" className="flex items-center justify-between gap-3 border-t border-border pt-6">
          {prev ? (
            <Button
              variant="secondary"
              nativeButton={false}
              render={<Link href={`/docs/${prev.name}`} />}
              className="min-w-0"
            >
              <ArrowLeftIcon data-icon="inline-start" />
              <span className="truncate">{prev.title}</span>
            </Button>
          ) : (
            <span />
          )}
          {next && (
            <Button
              variant="secondary"
              nativeButton={false}
              render={<Link href={`/docs/${next.name}`} />}
              className="min-w-0"
            >
              <span className="truncate">{next.title}</span>
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          )}
        </nav>
      </article>
      <aside className="hidden w-48 shrink-0 xl:block">
        <div className="sticky top-20">
          <DocToc entries={toc} />
        </div>
      </aside>
    </div>
  )
}
