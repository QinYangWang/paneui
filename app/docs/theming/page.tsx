import { PRESET_THEMES, type PresetAccent } from "@/components/docs/accent-color"
import { Code, GuideH2, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { ThemingSystem } from "@/components/docs/theming-system"
import { REGISTRY_NAME } from "@/lib/docs"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

export const metadata = { title: "Theming" }

const tableCls = "w-full min-w-xl border-collapse text-left text-sm"
const th = "px-4 py-2.5 font-medium"
const td = "px-4 py-2.5 align-top"
const row = "border-b border-border last:border-b-0"

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-card shadow-raised">
      <table className={tableCls}>
        <thead className="text-muted-foreground">
          <tr className="border-b border-border">
            {head.map((h) => (
              <th key={h} className={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

/* Swatch classes are written out in full so Tailwind generates them. */
const SWATCHES: { token: string; swatch: string }[] = [
  { token: "background", swatch: "bg-background" },
  { token: "card", swatch: "bg-card" },
  { token: "primary", swatch: "bg-primary" },
  { token: "secondary", swatch: "bg-secondary" },
  { token: "muted-foreground", swatch: "bg-muted-foreground" },
  { token: "border", swatch: "bg-border" },
  { token: "ring", swatch: "bg-ring" },
  { token: "destructive", swatch: "bg-destructive" },
  { token: "success", swatch: "bg-success" },
  { token: "warning", swatch: "bg-warning" },
  { token: "chart-1…5", swatch: "bg-chart-1" },
  { token: "shell", swatch: "bg-shell" },
]

/** Accent presets with their light and dark primaries (accent-color.ts mirrors app/globals.css). */
const ACCENTS = (Object.keys(PRESET_THEMES) as PresetAccent[])
  .filter((name) => name !== "neutral")
  .map((name) => ({ name, light: PRESET_THEMES[name].light.primary, dark: PRESET_THEMES[name].dark.primary }))

const TYPE: { cls: string; size: string; use: string }[] = [
  { cls: "text-ui-2xs", size: "10px", use: "Tiny counters and labels." },
  { cls: "text-ui-xs", size: "11px", use: "Meta, shortcuts, counts." },
  { cls: "text-ui-sm", size: "12px", use: "Captions, badges, small controls, tooltips." },
  { cls: "text-ui", size: "13px", use: "Default UI: buttons, inputs, menus, nav, body inside components." },
  { cls: "text-ui-lg", size: "14px", use: "Large controls and card titles." },
]

const RADII: { cls: string; corner: string; px: string; use: string }[] = [
  { cls: "rounded-sm", corner: "rounded-tl-sm", px: "6px", use: "xs buttons, kbd, small chips." },
  { cls: "rounded-md", corner: "rounded-tl-md", px: "8px", use: "Tab indicators inside a p-0.5 list." },
  { cls: "rounded-lg", corner: "rounded-tl-lg", px: "10px", use: "Buttons, inputs, triggers, tab lists, menu and select rows." },
  { cls: "rounded-xl", corner: "rounded-tl-xl", px: "14px", use: "Menus and popups (p-1, concentric with rounded-lg rows), cards, tables, code blocks." },
  { cls: "rounded-2xl", corner: "rounded-tl-2xl", px: "18px", use: "Two-layer inset cards and big panels." },
  { cls: "rounded-3xl", corner: "rounded-tl-3xl", px: "22px", use: "Dialogs." },
]

const SHADOWS: { cls: string; use: string }[] = [
  { cls: "shadow-raised", use: "Resting controls and cards: a 1px hairline ring plus a 1–2px drop. Hover steps to shadow-raised-hover." },
  { cls: "shadow-surface", use: "Popovers, menus, dialogs and floating panels only." },
  { cls: "shadow-well", use: "Inset hairline for fields and tracks." },
  { cls: "shadow-chip", use: "kbd and small chips." },
  { cls: "shadow-primary", use: "Filled primary buttons (none in dark)." },
]

const CSS_EXAMPLE = `:root {
  --radius: 0.625rem;
  --background: oklch(0.9911 0 0);
  --foreground: oklch(0.269 0 0);
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0 0 0 / 3%);
  --border: oklch(0 0 0 / 5%);
  /* … */
}

.dark {
  --background: oklch(0.1638 0 0);
  --foreground: oklch(0.97 0 0);
  --primary: oklch(0.97 0 0);
  --secondary: oklch(1 0 0 / 4%);
  --border: oklch(1 0 0 / 4%);
  /* … */
}

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --radius-xl: calc(var(--radius) * 1.4);
  /* … */
}`

const DARK_SCRIPT = `// Inline in <head>, before paint, so the page never flashes the wrong theme.
const mode = localStorage.getItem("theme") ?? "system"
const dark = mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
document.documentElement.classList.toggle("dark", dark)
document.documentElement.style.colorScheme = dark ? "dark" : "light"`

const ACCENT_RUNTIME = `/* Switch at runtime by setting data-accent on <html> */
html[data-accent="blue"] {
  --primary: oklch(0.57 0.15 258);
  --primary-foreground: oklch(1 0 0);
  --ring: oklch(0.57 0.15 258);
}
html[data-accent="blue"].dark {
  --primary: oklch(0.6 0.145 256);
  --primary-foreground: oklch(1 0 0);
  --ring: oklch(0.6 0.145 256);
}`

const NEW_TOKEN = `:root  { --info: oklch(0.6 0.12 230); }
.dark  { --info: oklch(0.68 0.12 230); }

@theme inline {
  --color-info: var(--info);   /* → bg-info, text-info, ring-info/20 … */
}`

export default function Theming() {
  const toc = [
    { id: "how-it-works", title: "How the system works" },
    { id: "colors", title: "Colors" },
    { id: "dark-mode", title: "Dark mode" },
    { id: "accent-presets", title: "Accent presets" },
    { id: "typography", title: "Typography" },
    { id: "radius", title: "Radius" },
    { id: "elevation", title: "Elevation" },
    { id: "native-style", title: "Native style rules" },
    { id: "adding-tokens", title: "Adding tokens" },
  ]
  return (
    <GuidePage href="/docs/theming" toc={toc}>
      <section className="flex flex-col gap-4">
        <GuideH2 id="how-it-works">How the system works</GuideH2>
        <ThemingSystem />
        <InstallCommand args={`add @${REGISTRY_NAME}/theme`} />
        <p className="text-muted-foreground">
          <Code>@{REGISTRY_NAME}/theme</Code> writes the variables below and installs <Code>@{REGISTRY_NAME}/utils</Code>,
          a <Code>cn()</Code> whose tailwind-merge config treats the <Code>text-ui-*</Code> sizes as font sizes. Washes use
          opacity modifiers such as <Code>bg-success/12</Code> or <Code>ring-primary/20</Code>.
        </p>
        <AgentCodeBlock code={CSS_EXAMPLE} filename="globals.css (excerpt)" language="css" maxHeight={360} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="colors">Colors</GuideH2>
        <p className="text-muted-foreground">
          Colours are grouped by role: background, fill, text, border, state and chart. Each has a matching{" "}
          <Code>-foreground</Code> token where text sits on it. Never use palette colours (<Code>bg-zinc-100</Code>) or hex
          values in components. Every token with its light and dark value is on{" "}
          <TextLink href="/docs/colors">Colors</TextLink>.
        </p>
        <div className="flex flex-wrap gap-2">
          {SWATCHES.map((s) => (
            <span key={s.token} className="flex items-center gap-2 rounded-lg bg-card py-1.5 pr-2.5 pl-1.5 shadow-raised">
              <span className={`block size-5 rounded-sm shadow-chip ${s.swatch}`} />
              <span className="font-mono text-xs">{s.token}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="dark-mode">Dark mode</GuideH2>
        <p className="text-muted-foreground">
          Dark mode is class based: <Code>.dark</Code> on <Code>&lt;html&gt;</Code> switches every token, and the theme
          declares the variant as <Code>@custom-variant dark (&amp;:is(.dark *))</Code>. Set <Code>color-scheme</Code> along
          with it so native scrollbars and form controls follow. Elevation in dark mode is the hairline ring only, and{" "}
          <Code>primary</Code> turns near-white, so pair it with <Code>text-primary-foreground</Code>, never{" "}
          <Code>text-white</Code>.
        </p>
        <AgentCodeBlock code={DARK_SCRIPT} filename="theme-script.js" language="js" />
        <p className="text-muted-foreground">
          <TextLink href="/docs/theme-toggle">Theme Toggle</TextLink> stores the choice and repaints the page with a circular
          reveal through the View Transition API; this site pairs it with a Light / Dark / System menu.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="accent-presets">Accent presets</GuideH2>
        <p className="text-muted-foreground">
          The default primary is neutral: near-black in light mode, near-white in dark. Each preset replaces only{" "}
          <Code>primary</Code>, <Code>primary-foreground</Code> and an opaque <Code>ring</Code> for both modes; everything
          else stays neutral. Install one after the theme:
        </p>
        <div className="flex flex-wrap gap-2">
          {ACCENTS.map((a) => (
            <div key={a.name} className="flex items-center gap-2.5 rounded-xl bg-card py-2.5 pr-3.5 pl-3 shadow-raised">
              <span className="flex">
                <span className="block size-5 rounded-full bg-(--swatch) ring-2 ring-card" style={{ "--swatch": a.light } as React.CSSProperties} />
                <span className="-ml-1.5 block size-5 rounded-full bg-(--swatch) ring-2 ring-card" style={{ "--swatch": a.dark } as React.CSSProperties} />
              </span>
              <span className="font-mono text-xs">theme-{a.name}</span>
            </div>
          ))}
        </div>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme-violet`} />
        <p className="text-muted-foreground">
          Installed this way the preset overwrites the variables on <Code>:root</Code> and <Code>.dark</Code>, so the accent
          is permanent. To let users switch, as the accent menu in this site&apos;s header does, keep the neutral values and
          add one block per accent keyed on an attribute, then persist the choice (this site uses{" "}
          <Code>localStorage[&quot;accent&quot;]</Code>, applied by the same pre-paint script as dark mode).
        </p>
        <p className="text-muted-foreground">
          Need a brand colour instead? <TextLink href="/docs/colors#accent">Colors</TextLink> has a live picker that
          derives the dark variant in OKLCH and copies the exact <Code>:root</Code> / <Code>.dark</Code> overrides.
        </p>
        <AgentCodeBlock code={ACCENT_RUNTIME} filename="globals.css" language="css" />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="typography">Typography</GuideH2>
        <p className="text-muted-foreground">
          UI text uses the system font (<Code>-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, system-ui</Code>) with
          normal letter-spacing on a native 13px scale. Code, keys and terminals use JetBrains Mono, falling back to SF Mono
          and Menlo. Library components use the <Code>text-ui*</Code> sizes; Tailwind&apos;s <Code>text-sm</Code> to{" "}
          <Code>text-2xl</Code> stay for reading copy and page headings. Titles are <Code>font-semibold</Code>, labels and
          buttons <Code>font-medium</Code>.
        </p>
        <Table head={["Class", "Size", "Use for"]}>
          {TYPE.map((t) => (
            <tr key={t.cls} className={row}>
              <td className={`${td} font-mono text-xs whitespace-nowrap text-foreground`}>{t.cls}</td>
              <td className={`${td} whitespace-nowrap text-muted-foreground tabular-nums`}>{t.size}</td>
              <td className={`${td} text-muted-foreground`}>{t.use}</td>
            </tr>
          ))}
        </Table>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="radius">Radius</GuideH2>
        <p className="text-muted-foreground">
          One base, <Code>--radius: 0.625rem</Code>, with fixed multipliers (0.6×, 0.8×, 1×, 1.4×, 1.8×, 2.2×). Change the
          base and every step follows. Keep nested corners concentric: an inner radius equals the outer radius minus the
          padding between them, which is why <Code>p-1</Code> menus (<Code>rounded-xl</Code>) hold{" "}
          <Code>rounded-lg</Code> rows. <Code>rounded-full</Code> is only for round things: avatars, dots, switches, badges,
          circular icon buttons.
        </p>
        <Table head={["", "Class", "Size", "Use for"]}>
          {RADII.map((r) => (
            <tr key={r.cls} className={row}>
              <td className={`${td} w-12`}>
                <span className={`block size-7 border-t-2 border-l-2 border-foreground/40 ${r.corner}`} />
              </td>
              <td className={`${td} font-mono text-xs whitespace-nowrap text-foreground`}>{r.cls}</td>
              <td className={`${td} whitespace-nowrap text-muted-foreground tabular-nums`}>{r.px}</td>
              <td className={`${td} text-muted-foreground`}>{r.use}</td>
            </tr>
          ))}
        </Table>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="elevation">Elevation</GuideH2>
        <p className="text-muted-foreground">
          Near-flat: hairline rings with at most a soft drop. Resting cards, tables and code blocks use{" "}
          <Code>shadow-raised</Code>, never <Code>shadow-surface</Code>. Hover on rows, menu items, ghost buttons and nav is a
          fill (<Code>bg-secondary</Code>), not a ring.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SHADOWS.map((s) => (
            <div key={s.cls} className="flex items-start gap-3 rounded-xl p-3">
              <span className={`block size-10 shrink-0 rounded-lg bg-card ${s.cls}`} />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-mono text-xs text-foreground">{s.cls}</span>
                <span className="text-sm text-muted-foreground">{s.use}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="native-style">Native style rules</GuideH2>
        <p className="text-muted-foreground">
          The look follows Synara and Codex desktop apps. A few rules keep new components consistent with it:
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
          <li>
            <Code>secondary</Code>, <Code>muted</Code> and <Code>accent</Code> are fills; use <Code>bg-card</Code>,{" "}
            <Code>bg-popover</Code> or <Code>bg-background</Code> for anything that must be opaque.
          </li>
          <li>No gradient sheens, inset highlights, text shadows or glows.</li>
          <li>
            Desktop density: buttons and inputs <Code>h-8</Code> (sm <Code>h-7</Code>, xs <Code>h-6</Code>), menu rows 26px,
            checkboxes 16px, switches 32×20. Disabled is <Code>opacity-64</Code>.
          </li>
          <li>
            Standard controls answer a press with a fill change, not a scale. Popups enter from <Code>scale-98</Code> and
            opacity.
          </li>
          <li>
            Focus is always <Code>focus-visible:ring-2 focus-visible:ring-ring/50</Code>.
          </li>
          <li>
            App chrome sits on <Code>bg-shell</Code>, with content in a <Code>shell-inset</Code> panel: a 0.5px hairline,{" "}
            <Code>rounded-shell</Code> (13px) and a 3px gap to the window edges.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="adding-tokens">Adding tokens</GuideH2>
        <p className="text-muted-foreground">
          Define a new token in OKLCH with a value for both modes, then map it in <Code>@theme inline</Code> to get the
          utilities. Contributors to this repository add tokens in their own reviewed change (see AGENTS.md).
        </p>
        <AgentCodeBlock code={NEW_TOKEN} filename="globals.css" language="css" />
      </section>
    </GuidePage>
  )
}
