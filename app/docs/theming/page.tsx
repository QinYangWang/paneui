import { DEFAULT_ACCENT, PRESET_THEMES, type PresetAccent } from "@/components/docs/accent-color"
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
  { token: "chart-1…8", swatch: "bg-chart-1" },
  { token: "shell", swatch: "bg-shell" },
]

/** Accent presets with their light and dark primaries (accent-color.ts mirrors app/globals.css). */
const ACCENTS = (Object.keys(PRESET_THEMES) as PresetAccent[]).map((name) => ({
  name,
  light: PRESET_THEMES[name].light.primary,
  dark: PRESET_THEMES[name].dark.primary,
  isDefault: name === DEFAULT_ACCENT,
}))

const TYPE: { cls: string; size: string; use: string }[] = [
  { cls: "text-ui-2xs", size: "10px", use: "Tiny counters and labels." },
  { cls: "text-ui-xs", size: "11px", use: "Meta text, shortcuts and counts." },
  { cls: "text-ui-sm", size: "12px", use: "Captions, badges, small controls, tooltips." },
  { cls: "text-ui", size: "13px", use: "The default for controls, menus and text inside components." },
  { cls: "text-ui-lg", size: "14px", use: "Large controls and card titles." },
]

const RADII: { cls: string; corner: string; px: string; use: string }[] = [
  { cls: "rounded-2xs", corner: "rounded-tl-2xs", px: "3px", use: "Search highlights and favicons." },
  { cls: "rounded-xs", corner: "rounded-tl-xs", px: "4px", use: "Checkboxes and extra-small segments and tabs." },
  { cls: "rounded-sm", corner: "rounded-tl-sm", px: "6px", use: "Extra-small buttons, keys and small chips." },
  { cls: "rounded-md", corner: "rounded-tl-md", px: "8px", use: "Tab indicators inside a p-0.5 list." },
  { cls: "rounded-lg", corner: "rounded-tl-lg", px: "10px", use: "Controls and menu rows." },
  { cls: "rounded-xl", corner: "rounded-tl-xl", px: "14px", use: "Menus, popups, cards, tables and code blocks." },
  { cls: "rounded-2xl", corner: "rounded-tl-2xl", px: "18px", use: "Two-layer inset cards and big panels." },
  { cls: "rounded-3xl", corner: "rounded-tl-3xl", px: "22px", use: "Dialogs." },
]

const SHADOWS: { cls: string; use: string }[] = [
  { cls: "shadow-raised", use: "Resting controls and cards. Hover steps to shadow-raised-hover." },
  { cls: "shadow-surface", use: "Popovers, menus, dialogs and floating panels only." },
  { cls: "shadow-well", use: "Inset hairline for fields and tracks." },
  { cls: "shadow-chip", use: "Keys and small chips." },
  { cls: "shadow-primary", use: "Filled primary buttons (none in dark)." },
]

const CSS_EXAMPLE = `:root {
  --radius: 0.625rem;
  --accent-500: oklch(62.3% 0.214 259.815);  /* blue ramp, 50 … 950 */
  --accent-600: oklch(54.6% 0.245 262.881);
  --background: oklch(100% 0 0);             /* white */
  --foreground: oklch(14.5% 0 0);            /* neutral-950 */
  --muted-foreground: oklch(55.6% 0 0);      /* neutral-500 */
  --primary: var(--accent-600);
  --ring: var(--accent-500);
  --border: oklch(0% 0 0 / 8%);              /* neutral-200 on white */
  /* … */
}

.dark {
  --background: oklch(18.2% 0 0);            /* #121212 */
  --card: oklch(26.9% 0 0);                  /* neutral-800 */
  --foreground: oklch(98.5% 0 0);            /* neutral-50 */
  --muted-foreground: oklch(70.8% 0 0);      /* neutral-400 */
  --border: oklch(100% 0 0 / 8%);            /* neutral-800 on the page */
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

const ACCENT_RUNTIME = `/* Switch at runtime by setting data-accent on <html>: swap the ramp, primary and ring follow */
html[data-accent="violet"] {
  --accent-50: oklch(96.9% 0.016 293.756);
  /* … 100 … 900 … */
  --accent-500: oklch(60.6% 0.250 292.717);
  --accent-600: oklch(54.1% 0.281 293.009);
  --accent-950: oklch(28.3% 0.141 291.089);
}

/* Neutral also re-points primary: near-black in light, near-white with dark text in dark */
html[data-accent="neutral"] { /* neutral ramp … */ --primary: var(--accent-900); --ring: var(--accent-400); }
html[data-accent="neutral"].dark {
  --primary: var(--accent-100);
  --primary-foreground: var(--accent-900);
  --ring: var(--accent-500);
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
          whose <Code>cn()</Code> merges the <Code>text-ui-*</Code> sizes as font sizes. For a tinted wash, add an opacity
          modifier such as <Code>bg-success/12</Code>.
        </p>
        <AgentCodeBlock code={CSS_EXAMPLE} filename="globals.css (excerpt)" language="css" maxHeight={360} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="colors">Colors</GuideH2>
        <p className="text-muted-foreground">
          Colours are named by role, and each surface has a matching <Code>-foreground</Code> token for text on it. Use
          tokens in components, never palette colours (<Code>bg-zinc-100</Code>) or hex values. Every token&apos;s light and
          dark value is on <TextLink href="/docs/colors">Customize</TextLink>.
        </p>
        <div className="flex flex-wrap gap-2">
          {SWATCHES.map((s) => (
            <span key={s.token} className="frame-lg frame-p-1.5 flex items-center gap-2 bg-card pr-2.5 shadow-raised">
              <span className={`block size-5 rounded-inner shadow-chip ${s.swatch}`} />
              <span className="font-mono text-xs">{s.token}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="dark-mode">Dark mode</GuideH2>
        <p className="text-muted-foreground">
          Put <Code>.dark</Code> on <Code>&lt;html&gt;</Code> to switch every token. The theme declares the variant as{" "}
          <Code>@custom-variant dark (&amp;:is(.dark *))</Code>. Set <Code>color-scheme</Code> at the same time so native
          scrollbars and form controls follow. Pair <Code>primary</Code> with <Code>text-primary-foreground</Code>, never <Code>text-white</Code>, because the
          neutral preset makes it near-white in dark mode.
        </p>
        <AgentCodeBlock code={DARK_SCRIPT} filename="theme-script.js" language="js" />
        <p className="text-muted-foreground">
          To let users switch, use <TextLink href="/docs/theme-toggle">Theme Toggle</TextLink>, which stores the choice for
          the script above.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="accent-presets">Accent presets</GuideH2>
        <p className="text-muted-foreground">
          The accent is one <Code>--accent-50…950</Code> ramp, blue by default. <Code>primary</Code> reads the 600 stop
          (700 for green and orange, so white text keeps 4.5:1 contrast) and <Code>ring</Code> the 500 stop. A preset
          swaps only the ramp, so surfaces, text and charts stay the same. Install one after the theme.
        </p>
        <div className="flex flex-wrap gap-2">
          {ACCENTS.map((a) => (
            <div key={a.name} className="flex items-center gap-2.5 rounded-xl bg-card py-2.5 pr-3.5 pl-3 shadow-raised">
              <span className="flex">
                <span className="block size-5 rounded-full bg-(--swatch) ring-2 ring-card" style={{ "--swatch": a.light } as React.CSSProperties} />
                <span className="-ml-1.5 block size-5 rounded-full bg-(--swatch) ring-2 ring-card" style={{ "--swatch": a.dark } as React.CSSProperties} />
              </span>
              <span className="font-mono text-xs">theme-{a.name}</span>
              {a.isDefault ? <span className="text-ui-xs text-muted-foreground">default</span> : null}
            </div>
          ))}
        </div>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme-violet`} />
        <p className="text-muted-foreground">
          An installed preset overwrites the variables on <Code>:root</Code> and <Code>.dark</Code>, so the accent is fixed.
          To let users switch, keep the default ramp on <Code>:root</Code>, add one block per accent keyed on an attribute,
          and apply the saved choice in the same pre-paint script as dark mode.
        </p>
        <p className="text-muted-foreground">
          For a brand colour, use the picker on <TextLink href="/docs/colors#accent">Customize</TextLink> to build a ramp and
          copy its overrides.
        </p>
        <AgentCodeBlock code={ACCENT_RUNTIME} filename="globals.css" language="css" />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="typography">Typography</GuideH2>
        <p className="text-muted-foreground">
          UI text uses the system font and code uses a monospace font. Use the <Code>text-ui*</Code> sizes inside
          components, and keep <Code>text-sm</Code> to <Code>text-2xl</Code> for reading copy and page headings. Set titles
          in <Code>font-semibold</Code> and labels and buttons in <Code>font-medium</Code>.
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
          Every step is a multiple of <Code>--radius</Code>, so change the base and the whole scale follows. Keep nested
          corners concentric, with the inner radius equal to the outer radius minus the padding between them. That is why{" "}
          <Code>p-1</Code> menus (<Code>rounded-xl</Code>) hold <Code>rounded-lg</Code> rows. Use <Code>rounded-full</Code>{" "}
          only for shapes that are actually round. Sizes below are at the default <Code>0.625rem</Code>; try other
          values on <TextLink href="/docs/colors#radius">Customize</TextLink>.
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
          Give resting cards, tables and code blocks <Code>shadow-raised</Code>, never <Code>shadow-surface</Code>. Show
          hover on rows, menu items and ghost buttons with a fill (<Code>bg-secondary</Code>), not a ring.
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
          Follow these rules when you build a new component.
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
          <li>
            <Code>secondary</Code>, <Code>muted</Code> and <Code>accent</Code> are fills; use <Code>bg-card</Code>,{" "}
            <Code>bg-popover</Code> or <Code>bg-background</Code> for anything that must be opaque.
          </li>
          <li>No gradient sheens, inset highlights, text shadows or glows.</li>
          <li>
            Size buttons and inputs at <Code>h-8</Code> (sm <Code>h-7</Code>, xs <Code>h-6</Code>) and menu rows at 26px.
            Show disabled with <Code>opacity-64</Code>.
          </li>
          <li>
            Answer a press on standard controls with a fill change, not a scale. Popups enter from <Code>scale-98</Code> and
            opacity.
          </li>
          <li>
            Show focus with <Code>focus-visible:ring-2 focus-visible:ring-ring/50</Code>.
          </li>
          <li>
            Put app chrome on <Code>bg-shell</Code> and the content in a <Code>shell-inset</Code> panel.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="adding-tokens">Adding tokens</GuideH2>
        <p className="text-muted-foreground">
          Define a new token in OKLCH with a value for both modes, then map it in <Code>@theme inline</Code> to get the
          utilities.
        </p>
        <AgentCodeBlock code={NEW_TOKEN} filename="globals.css" language="css" />
      </section>
    </GuidePage>
  )
}
