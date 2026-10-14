import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { Badge } from "@/registry/base-nova/ui/badge"

export const metadata = { title: "Changelog" }

type Entry = { id: string; date: string; title: string; tag?: string; changes: React.ReactNode[] }

/* Newest first. Summarised from the repository history; dates are commit dates. */
const ENTRIES: Entry[] = [
  {
    id: "2026-10-15-templates",
    date: "October 15, 2026",
    title: "SaaS and agent workspace templates, Notion-style and email editors",
    tag: "Templates",
    changes: [
      <>
        One-command templates: <Code>shadcn init -d -n my-app &lt;url&gt;</Code> creates a Next.js app with the theme, every
        component and the routes in place, with no <Code>components.json</Code> setup (published items reference their
        dependencies by URL). See <TextLink href="/docs/cli#templates">CLI &amp; registry</TextLink>.
      </>,
      <>
        <Code>saas</Code> replaces the Landing Page and SaaS Dashboard templates: marketing home, pricing and changelog,
        login, sign-up, password reset and email code with mock auth, a dashboard with overview, analytics and a customers
        table, settings (profile, account, billing, team, notifications, appearance) and a 404.
      </>,
      <>
        <Code>agent-workspace</Code> is rebuilt after Synara as an Agent Client Protocol client: threads, tabs, split chat
        panes, terminal, file explorer, review diffs and an offline demo agent, plus a WebSocket bridge
        (<Code>server/acp-bridge.mjs</Code>) that runs Claude Code, Codex, Gemini CLI or any ACP agent.
      </>,
      <>
        <TextLink href="/docs/notion-editor">Notion editor</TextLink> (Tiptap: slash menu, bubble menu, drag handles,
        callouts, toggles, tables, MDX import and export) and <TextLink href="/docs/email-editor">email editor</TextLink>{" "}
        (maily.to-style blocks and variables, rendered to email HTML with React Email).
      </>,
      <>
        28 new components the templates are built from: sparkline, trend-chart, bar-list, stat-card, empty-state,
        page-header, usage-meter, settings-section, field, password-input, segmented-control, accent-picker, pagination,
        workspace-switcher, user-menu, data-table, resizable, tab-strip, icon-rail, terminal-view, thread-list-item,
        work-summary, edited-files-card, model-picker, toggle-group, toolbar, menu-list and swatch-picker; the
        agent-composer block; a plain variant for signup-form and new options on file-diff and message-scroller.
      </>,
      <>
        The theme item now sets <Code>--color-primary</Code>, <Code>--color-ring</Code> and the dark primary and chart
        colours explicitly, so a fresh shadcn app no longer keeps its default dark primary.
      </>,
    ],
  },
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
