import Link from "next/link"

import { ArrowRightIcon } from "@/components/icons"
import { categoryIcons, categorySlug } from "@/components/docs/category-icons"
import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { getGroups, getItems, REGISTRY_NAME } from "@/lib/docs"
import { Button } from "@/registry/base-nova/ui/button"

export const metadata = { title: "Introduction" }

/** One line per category for the "What's inside" grid. */
const CATEGORY_BLURBS: Record<string, string> = {
  Foundations: "The theme tokens, the puffy icon set and the icon chip every header uses.",
  Forms: "Buttons, fields, pickers and confirm controls at a 32px desktop density.",
  Overlays: "Menus, popovers, dialogs, drawers, sheets and toasts.",
  Display: "Cards, badges, alerts, accordions, loaders and the theme toggle.",
  Navigation: "Tabs, breadcrumbs, the animated sidebar and a file tree.",
  Text: "Reveals, shimmers, scrambles and rolling digits for copy and numbers.",
  Motion: "Scroll, drag, magnetic and shader effects that respect reduced motion.",
  Data: "Virtualized, editable and paginated tables.",
  Agents: "Messages, streaming replies, tool calls, diffs and plans for agent UIs.",
  Charts: "Charts and activity calendars on the five-hue chart palette.",
  Blocks: "Composed pieces: prompt bar, command palette, uploads, forms and more.",
  Templates: "Full apps to start from, installable in one command: SaaS (landing, dashboard, settings, auth), agent workspace (ACP), docs, blog.",
}

const PRINCIPLES = [
  {
    title: "Open code",
    body: "Every item installs as source into your project through the shadcn CLI. There is no package to upgrade around: edit the component itself.",
  },
  {
    title: "Native desktop style",
    body: "System UI font on a 13px scale, translucent fills instead of grey surfaces, hairline borders and near-flat elevation.",
  },
  {
    title: "Accessible primitives",
    body: "Interactive parts are built on a maintained headless primitive layer, so focus management, keyboard support and ARIA come built in.",
  },
  {
    title: "Motion with restraint",
    body: "Critically damped springs, no press scale on standard controls, and every movement falls back to a cross-fade under prefers-reduced-motion.",
  },
  {
    title: "Tokens only",
    body: "Components read theme tokens, never palette colours or hex values, so light, dark and the accent presets restyle everything at once. Lint rules enforce it.",
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
      lede={`${total} copy-paste React components, blocks and templates for Tailwind CSS 4, in a quiet native desktop style. Install any of them with the shadcn CLI.`}
    >
      <div className="flex flex-col gap-4 text-muted-foreground">
        <p>
          qinyang/ui is a shadcn registry, not an npm package. You add the <Code>@{REGISTRY_NAME}</Code> namespace to your
          project once, then the CLI copies each component, with the components it builds on, into your codebase. From then
          on the code is yours.
        </p>
        <p>
          The library leans toward app interfaces: dense forms and menus, agent and chat surfaces, charts and data tables,
          plus a handful of full-page templates that show the pieces working together.
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {groups.map((g) => {
            const Icon = categoryIcons[g.category]
            return (
              <Link
                key={g.category}
                href={`/#${categorySlug(g.category)}`}
                className="flex flex-col gap-1.5 rounded-xl bg-card p-4 shadow-raised transition-[box-shadow] duration-150 outline-none hover:shadow-raised-hover focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <span className="flex items-center gap-2 font-medium">
                  {Icon && <Icon size={16} className="text-muted-foreground" />}
                  {g.category}
                  <span className="ml-auto text-ui-xs text-muted-foreground tabular-nums">{g.items.length}</span>
                </span>
                <span className="text-sm text-muted-foreground">{CATEGORY_BLURBS[g.category]}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="stack">Stack</GuideH2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
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
            The <TextLink href="https://ui.shadcn.com/docs/cli">shadcn CLI</TextLink> for distribution, and a puffy 18×18
            icon set shipped as <Code>@{REGISTRY_NAME}/icons</Code>.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="quick-start">Quick start</GuideH2>
        <p className="text-muted-foreground">
          After adding the namespace (see <TextLink href="/docs/installation">Installation</TextLink>), install the theme and
          a first component:
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme @${REGISTRY_NAME}/button`} />
        <div className="flex flex-wrap gap-2">
          <Button nativeButton={false} render={<Link href="/docs/installation" />}>
            Installation
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button variant="secondary" nativeButton={false} render={<Link href="/" />}>
            Browse components
          </Button>
        </div>
      </section>
    </GuidePage>
  )
}
