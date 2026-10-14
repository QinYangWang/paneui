import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { Badge } from "@/registry/base-nova/ui/badge"

export const metadata = { title: "Changelog" }

type Entry = { id: string; date: string; title: string; tag?: string; changes: React.ReactNode[] }

/* Newest first. Summarised from the repository history; dates are commit dates. */
const ENTRIES: Entry[] = [
  {
    id: "2026-10-14-native-desktop",
    date: "October 14, 2026",
    title: "Native desktop style, neutral primary and accent presets",
    tag: "Theme",
    changes: [
      <>
        New visual direction after Synara and Codex: system UI font on a 13px <Code>text-ui</Code> scale, translucent
        fills for secondary, muted and accent, 5–6% hairline borders, a 0.625rem radius with multiplier steps and an inset
        docs shell.
      </>,
      <>
        The primary colour is now neutral (near-black in light, near-white in dark). Five accent presets,{" "}
        <Code>theme-blue</Code>, <Code>theme-green</Code>, <Code>theme-orange</Code>, <Code>theme-rose</Code> and{" "}
        <Code>theme-violet</Code>, ship as registry items; see <TextLink href="/docs/theming#accent-presets">Theming</TextLink>.
      </>,
      <>Desktop density across controls: 32px buttons and inputs, 26px menu rows, no press scale on standard controls.</>,
      <>Docs: a Getting started section (Introduction, Installation, Theming, CLI &amp; registry, Changelog) and a components overview.</>,
    ],
  },
  {
    id: "2026-10-14-docs",
    date: "October 14, 2026",
    title: "Component pages, templates and lint rules",
    tag: "Docs",
    changes: [
      <>Every component page now has install tabs, usage, composition, examples and an API reference with an on-page TOC.</>,
      <>
        Five full-page templates: SaaS Dashboard, Agent Workspace, Landing Page, Docs Site and Personal Blog, plus the{" "}
        <Code>prose-qy</Code> long-form typography utility.
      </>,
      <>
        Design-system lint rules on <Code>@shadcn/lint</Code> and an AGENTS.md guide keep tokens, radii and motion
        consistent.
      </>,
      <>
        <Code>Card</Code> gained an inset variant with <Code>CardPanel</Code> for presented content, and{" "}
        <Code>IconChip</Code> became the frame for header icons.
      </>,
      <>37 showcase-only components and the dock were removed to keep the library focused on app UI.</>,
    ],
  },
  {
    id: "2026-10-13-library",
    date: "October 13, 2026",
    title: "The library grows: motion, agents, charts and blocks",
    tag: "Components",
    changes: [
      <>Forms, overlays and disclosure components, text and number motion, and selection controls.</>,
      <>Motion components: stateful and confirm buttons, action swaps, morphing surfaces, pickers, slider variants, scroll effects.</>,
      <>Navigation, virtualized tables, agent surfaces (messages, tool calls, diffs, plans), charts and composed blocks.</>,
      <>
        The docs site: live gallery, per-component pages, an animated-sidebar nav, a ⌘K command palette and a light / dark /
        system theme menu, published as a static export.
      </>,
    ],
  },
  {
    id: "2026-10-12-init",
    date: "October 12, 2026",
    title: "First release",
    tag: "Release",
    changes: [
      <>A shadcn registry on Base UI (the base-nova style) with Tailwind CSS 4, the first core components and the puffy icon set.</>,
    ],
  },
]

export default function Changelog() {
  return (
    <GuidePage href="/docs/changelog" toc={ENTRIES.map((e) => ({ id: e.id, title: e.title }))}>
      {ENTRIES.map((e) => (
        <section key={e.id} className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time>{e.date}</time>
            {e.tag && <Badge size="sm">{e.tag}</Badge>}
          </div>
          <GuideH2 id={e.id}>{e.title}</GuideH2>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
            {e.changes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      ))}
    </GuidePage>
  )
}
