import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons"
import { categorySlug } from "@/components/docs/category-icons"
import { IconGrid } from "@/components/docs/icon-grid"
import { AgentSkill } from "@/components/docs/agent-skill"
import { Inline } from "@/components/docs/doc-inline"
import { DocToc, type TocEntry } from "@/components/docs/doc-toc"
import { InstallCommand, PackageInstall } from "@/components/docs/install-command"
import { PreviewTabs } from "@/components/docs/preview-tabs"
import { demoFile, getItem, getItems, getNavGroups, readSource, REGISTRY_NAME, SITE_URL } from "@/lib/docs"
import { DocsCode, highlight } from "@/components/docs/docs-code"
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
  return item ? { title: item.title, description: item.summary } : {}
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
        // Phones: one stacked entry per prop (name and default, type, description) instead of a four-column table.
        <dl className="flex flex-col rounded-xl bg-card text-sm shadow-raised sm:hidden">
          {part.props.map((p) => (
            <div key={p.name} className="flex min-w-0 flex-col gap-1 border-b border-border px-4 py-3 last:border-b-0">
              <dt className="flex min-w-0 items-baseline justify-between gap-3 font-mono text-xs">
                <span className="min-w-0 break-all text-foreground">
                  {p.name}
                  {p.required && <span className="text-destructive">*</span>}
                </span>
                {p.default && <span className="shrink-0 text-muted-foreground">= {p.default}</span>}
              </dt>
              <dd className="font-mono text-xs break-words text-primary">{p.type}</dd>
              {p.description && (
                <dd className="text-pretty text-muted-foreground">
                  <Inline text={p.description} />
                </dd>
              )}
            </div>
          ))}
        </dl>
      )}
      {part.props.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-card shadow-raised max-sm:hidden">
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
        <dl className="flex flex-col rounded-xl bg-card text-sm shadow-raised sm:hidden">
          {part.dataAttributes.map((d) => (
            <div key={d.name} className="flex min-w-0 flex-col gap-1 border-b border-border px-4 py-3 last:border-b-0">
              <dt className="font-mono text-xs break-all text-foreground">{d.name}</dt>
              <dd className="text-pretty text-muted-foreground">
                <Inline text={d.description} />
              </dd>
            </div>
          ))}
        </dl>
      )}
      {part.dataAttributes && part.dataAttributes.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-card shadow-raised max-sm:hidden">
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

  // Prev/next follow the sidebar: categories in order, A–Z inside each.
  const items = getNavGroups().flatMap((g) => g.items)
  const index = items.findIndex((i) => i.name === name)
  const prev = items[index - 1]
  const next = items[index + 1]
  const usage = readSource(demoFile(name))
  const doc = docsContent[name]
  const exampleCode = (id: string) => readSource(`registry/base-nova/examples/${name}/${id}.tsx`)
  const iconSkill = name === "icons" ? readSource("skills/puffy-icons/SKILL.md") : ""
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
    ...(name === "icons"
      ? [
          { id: "icon-styles", title: "Icon styles" },
          { id: "make-your-own-icons", title: "Make your own icons" },
          { id: "all-icons", title: "All icons" },
        ]
      : []),
    ...(doc && (doc.api.length > 0 || doc.baseUi) ? [{ id: "api-reference", title: "API Reference" }] : []),
  ]
  const isTemplate = item.category === "Templates"
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
              {isTemplate ? (
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href={`/#${categorySlug(item.category)}`} />}>Templates</BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href="/" />}>Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href={`/#${categorySlug(item.category)}`} />}>
                      {item.category}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
          <p className="text-lg text-muted-foreground">{item.summary}</p>
          {doc?.baseUi && (
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" size="sm" render={<a href={doc.baseUi.href} />}>
                {doc.baseUi.name} primitive
              </Badge>
            </div>
          )}
          {isTemplate && (
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

        <PreviewTabs name={name} code={<DocsCode code={usage} filename={`${name}-demo.tsx`} maxHeight={520} />} />

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
                  <DocsCode key={f} code={readSource(f)} filename={f} maxHeight={420} />
                ))}
              </div>
              <p className="text-muted-foreground">Update the import paths to match your project setup.</p>
            </TabsPanel>
          </Tabs>
        </section>

        {doc && (
          <section className="flex flex-col gap-4">
            <H2 id="usage">Usage</H2>
            <DocsCode code={doc.usage.imports} language="tsx" />
            <DocsCode code={doc.usage.code} language="tsx" />
          </section>
        )}

        {doc?.composition && (
          <section className="flex flex-col gap-4">
            <H2 id="composition">Composition</H2>
            <DocsCode code={doc.composition} language="text" />
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
                  <div className="typeset typeset-docs text-muted-foreground">
                    <p>
                      <Inline text={ex.description} />
                    </p>
                  </div>
                )}
                <PreviewTabs
                  example={`${name}/${ex.id}`}
                  code={<DocsCode code={exampleCode(ex.id)} filename={`${ex.id}.tsx`} maxHeight={420} />}
                />
              </div>
            ))}
          </section>
        )}

        {doc?.notes?.map((n) => (
          <section key={n.title} className="flex flex-col gap-3">
            <H2 id={`note-${n.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{n.title}</H2>
            <div className="typeset typeset-docs text-muted-foreground">
              <p>
                <Inline text={n.body} />
              </p>
            </div>
          </section>
        ))}

        {name === "icons" && (
          <section className="flex flex-col gap-3">
            <H2 id="icon-styles">Icon styles</H2>
            <p className="text-pretty text-muted-foreground">
              The default set is rounded: outline glyphs on a 24×24 grid with 1.75px round strokes and soft corners. The
              same names and props also ship in two other styles: puffy (filled shapes on an 18×18 grid) and outline (the
              puffy shapes as 1.6px outlines). Every style installs to 
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">components/icons.tsx</code>,
              so one command switches every component in your project. Preview them with the toggle under All icons.
            </p>
            <InstallCommand args={`add ${SITE_URL}/r/icons-puffy.json --overwrite`} />
            <InstallCommand args={`add ${SITE_URL}/r/icons-outline.json --overwrite`} />
            <p className="text-pretty text-muted-foreground">Back to rounded:</p>
            <InstallCommand args={`add ${SITE_URL}/r/icons.json --overwrite`} />
            <p className="text-pretty text-muted-foreground">
              Components list the icon set as a dependency, so adding one later asks whether to overwrite 
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">components/icons.tsx</code>.
              Answer no (the default) to keep your style. If you add components with 
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">--overwrite</code>, the
              rounded set comes back: run your style&apos;s command again afterwards.
            </p>
          </section>
        )}

        {name === "icons" && (
          <section className="flex flex-col gap-3">
            <H2 id="make-your-own-icons">Make your own icons</H2>
            <p className="text-pretty text-muted-foreground">
              Need a glyph the set doesn&apos;t have? Install the <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">puffy-icons</code>{" "}
              agent skill and ask your coding agent for it. The skill carries the drawing rules for every style (grids,
              primitives, corner radii), reference icons, a preview script to check the result at small sizes, and how to
              add it to your{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">components/icons.tsx</code>.
              Works with any coding agent that reads Agent Skills.
            </p>
            <AgentSkill name="puffy-icons" skill={iconSkill} html={await highlight(iconSkill, "markdown")} />
          </section>
        )}

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
                    the {doc.baseUi.name} primitive
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
