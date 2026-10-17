import Link from "next/link"

import { ArrowRightIcon } from "@/components/icons"
import { categoryIcons, categorySlug } from "@/components/docs/category-icons"
import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { getGroups, getItems, REGISTRY_NAME } from "@/lib/docs"
import { Button } from "@/registry/base-nova/ui/button"
import { Card } from "@/registry/base-nova/ui/card"

export const metadata = { title: "Introduction" }

const PRINCIPLES = [
  {
    title: "Open code",
    body: "Every item installs into your project as source through the shadcn CLI. To change a component, edit its file.",
  },
  {
    title: "Native desktop style",
    body: "Sizes and surfaces are tuned for dense app screens rather than marketing pages.",
  },
  {
    title: "Accessible primitives",
    body: "Interactive parts sit on headless primitives, so focus, keyboard and ARIA behaviour come built in.",
  },
  {
    title: "Motion with restraint",
    body: "Animations settle without bounce, and each one becomes a cross-fade when the user prefers reduced motion.",
  },
  {
    title: "Tokens only",
    body: "Components read theme tokens, never raw colours, so a theme or accent change restyles everything at once. Lint rules enforce it.",
  },
]

export default function Introduction() {
  const groups = getGroups()
  const total = getItems().length
  const toc = [
    { id: "principles", title: "Principles" },
    { id: "whats-inside", title: "What's inside" },
    { id: "stack", title: "Stack" },
    { id: "quick-start", title: "Quick start" },
  ]

  return (
    <GuidePage
      href="/docs"
      toc={toc}
      lede={`${total} React components, blocks and templates you install as source with the shadcn CLI.`}
    >
      <div className="flex flex-col gap-4 text-muted-foreground">
        <p>
          qinyang/ui is a shadcn registry, not an npm package. Add the <Code>@{REGISTRY_NAME}</Code> namespace to your
          project once, then the CLI copies each component and its dependencies into your codebase. From then on the code
          is yours.
        </p>
        <p>
          Use it for app interfaces. Start from a template when you want the pieces already wired together.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <GuideH2 id="principles">Principles</GuideH2>
        <dl className="flex flex-col gap-4">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="flex flex-col gap-1">
              <dt className="font-medium">{p.title}</dt>
              <dd className="text-muted-foreground">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="whats-inside">What&apos;s inside</GuideH2>
        <div data-md="links" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {groups.map((g) => {
            const Icon = categoryIcons[g.category]
            return (
              <Card key={g.category} interactive size="sm" render={<Link href={`/#${categorySlug(g.category)}`} />} className="px-4">
                <span className="flex items-center gap-2 font-medium">
                  {Icon && <Icon size={16} className="text-muted-foreground" />}
                  <span data-md-title>{g.category}</span>
                  <span className="ms-auto text-ui-xs text-muted-foreground tabular-nums">{g.items.length}</span>
                </span>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="stack">Stack</GuideH2>
        <ul className="flex list-disc flex-col gap-2 ps-5 text-muted-foreground marker:text-border">
          <li>
            Headless primitives for interactive parts (the <Code>base-nova</Code> style).
          </li>
          <li>
            <TextLink href="https://tailwindcss.com">Tailwind CSS 4</TextLink> with CSS-variable tokens declared in{" "}
            <Code>@theme inline</Code>.
          </li>
          <li>
            <Code>motion/react</Code> for springs and layout animation.
          </li>
          <li>
            The <TextLink href="https://ui.shadcn.com/docs/cli">shadcn CLI</TextLink> for distribution, and an icon set
            shipped as <Code>@{REGISTRY_NAME}/icons</Code>.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="quick-start">Quick start</GuideH2>
        <p className="text-muted-foreground">
          Add the namespace (see <TextLink href="/docs/installation">Installation</TextLink>), then install the theme and a
          first component.
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme @${REGISTRY_NAME}/button`} />
        <div data-md="links" className="flex flex-wrap gap-2">
          <Button nativeButton={false} render={<Link href="/docs/installation" />}>
            Installation
            <ArrowRightIcon className="rtl:-scale-x-100" data-icon="inline-end" />
          </Button>
          <Button variant="secondary" nativeButton={false} render={<Link href="/" />}>
            Browse components
          </Button>
        </div>
      </section>
    </GuidePage>
  )
}
