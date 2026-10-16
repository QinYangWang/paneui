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
  { token: "surface-sunken", swatch: "bg-surface-sunken" },
  { token: "surface-standout", swatch: "bg-surface-standout" },
  { token: "primary", swatch: "bg-primary" },
  { token: "primary-subtle", swatch: "bg-primary-subtle" },
  { token: "secondary", swatch: "bg-secondary" },
  { token: "muted-foreground", swatch: "bg-muted-foreground" },
  { token: "fg-tertiary", swatch: "bg-fg-tertiary" },
  { token: "border", swatch: "bg-border" },
  { token: "border-strong", swatch: "bg-border-strong" },
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
  { cls: "rounded-xs", corner: "rounded-tl-xs", px: "2px", use: "Search highlights, favicons and tiny segments." },
  { cls: "rounded-sm", corner: "rounded-tl-sm", px: "4px", use: "Checkboxes, extra-small buttons, keys and small chips." },
  { cls: "rounded-md", corner: "rounded-tl-md", px: "6px", use: "Tab indicators inside a p-0.5 list." },
  { cls: "rounded-lg", corner: "rounded-tl-lg", px: "8px", use: "Controls and menu rows." },
  { cls: "rounded-xl", corner: "rounded-tl-xl", px: "10px", use: "Cards, tables and code blocks." },
  { cls: "rounded-2xl", corner: "rounded-tl-2xl", px: "12px", use: "Menus and popups, two-layer inset cards." },
  { cls: "rounded-3xl", corner: "rounded-tl-3xl", px: "16px", use: "Dialogs, drawers and big panels." },
  { cls: "rounded-4xl", corner: "rounded-tl-4xl", px: "16px", use: "Kept for older code; sits at the 16px cap." },
  { cls: "rounded-5xl", corner: "rounded-tl-5xl", px: "16px", use: "Kept for older code; sits at the 16px cap." },
]

const SHADOW_SCALE: { cls: string; token: string; use: string }[] = [
  { cls: "shadow-xs", token: "--shadow-border", use: "A 1px ring, no lift." },
  { cls: "shadow-sm", token: "--shadow-default", use: "Resting controls and cards." },
  { cls: "shadow-lg", token: "--shadow-lg", use: "Menus, popovers and floating panels (shadow-md is the same)." },
  { cls: "shadow-xl", token: "--shadow-xl", use: "Dialogs, drawers and sheets." },
]

const FONTS: { cls: string; face: string; use: string }[] = [
  { cls: "font-sans", face: "Inter, Noto Sans SC", use: "All UI text. Inter's ss03 set is on." },
  { cls: "font-mono", face: "JetBrains Mono", use: "Code, keys, terminals and tabular IDs." },
  { cls: "font-serif", face: "Newsreader, Noto Serif SC", use: "Long-form reading (the reading typeset preset)." },
]

const SHADOWS: { cls: string; use: string }[] = [
  { cls: "shadow-raised", use: "Resting controls and cards (reads shadow-sm). Hover steps to shadow-raised-hover." },
  { cls: "shadow-surface", use: "Popovers, menus and floating panels (reads shadow-lg)." },
  { cls: "shadow-well", use: "Inset hairline for fields and tracks." },
  { cls: "shadow-chip", use: "Keys and small chips." },
  { cls: "shadow-primary", use: "Filled primary buttons (none in dark)." },
]

const CSS_EXAMPLE = `:root {
  --radius: 0.5rem;
  --radius-max: 1rem;             /* no token goes past 16px */
  --background: #fff;
  --foreground: #000000df;        /* gray a12 */
  --muted-foreground: #0000009b;  /* gray a11 */
  --primary: #0090ff;             /* blue 9 */
  --primary-hover: #0588f0;       /* blue 10 */
  --primary-subtle: #008ff519;    /* blue a3 */
  --ring: #0084e6a1;              /* blue a8 */
  --border: #0000000f;            /* gray a3 */
  --shadow-lg: 0 0 0 0.5px #0000000f, 0 2px 3px -2px #0000000f, …;
  /* … */
}

.dark {
  --background: oklch(15% 0 0);
  --card: #111;                   /* gray 1 */
  --popover: oklch(25.2% 0 0);
  --foreground: #ffffffed;        /* gray a12 */
  --primary-hover: #3b9eff;       /* blue 10 */
  --border: #ffffff12;            /* gray a3 */
  /* … */
}

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --radius-xl: min(calc(var(--radius) * 1.25), var(--radius-max));
  --shadow-lg: var(--shadow-lg);
  /* … */
}`

const DARK_SCRIPT = `// Inline in <head>, before paint, so the page never flashes the wrong theme.
const mode = localStorage.getItem("theme") ?? "system"
const dark = mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
document.documentElement.classList.toggle("dark", dark)
document.documentElement.style.colorScheme = dark ? "dark" : "light"`

const ACCENT_RUNTIME = `/* Switch at runtime by setting data-accent on <html>: one block per mode swaps the eight roles */
html[data-accent="violet"] {
  --primary: #6e56cf;               /* violet 9 */
  --primary-hover: #654dc4;         /* violet 10 */
  --primary-active: #6550b9;        /* violet 11 */
  --primary-foreground: #fff;
  --primary-subtle: #4400ee0f;      /* violet a3 */
  --primary-subtle-hover: #4300ff1b;
  --primary-border: #3100fb35;      /* violet a6 */
  --ring: #2b00d066;                /* violet a8 */
}
html[data-accent="violet"].dark {
  --primary-hover: #7d66d9;
  --primary-active: #baa7ff;
  /* … */
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
    { id: "fonts", title: "Fonts" },
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
          whose <Code>cn()</Code> merges the <Code>text-ui-*</Code> sizes as font sizes. For a tinted wash, use the{" "}
          <Code>-subtle</Code> token, such as <Code>bg-success-subtle</Code>.
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
          The accent is eight role variables per mode, blue by default: <Code>primary</Code> and its{" "}
          <Code>-hover</Code>, <Code>-active</Code>, <Code>-foreground</Code>, <Code>-subtle</Code>,{" "}
          <Code>-subtle-hover</Code> and <Code>-border</Code> variants, plus <Code>ring</Code>. Every preset reads the same
          steps of its own 12-step scale, so surfaces, text and charts stay the same. Install one after the theme.
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
          To let users switch, keep the default roles on <Code>:root</Code>, add one block per accent keyed on an attribute,
          and apply the saved choice in the same pre-paint script as dark mode.
        </p>
        <p className="text-muted-foreground">
          For a brand colour, use the picker on <TextLink href="/docs/colors#accent">Customize</TextLink> to derive the eight
          roles and copy them.
        </p>
        <AgentCodeBlock code={ACCENT_RUNTIME} filename="globals.css" language="css" />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="typography">Typography</GuideH2>
        <p className="text-muted-foreground">
          Use the <Code>text-ui*</Code> sizes inside components, and keep <Code>text-sm</Code> to <Code>text-2xl</Code> for
          reading copy and page headings. Set titles in <Code>font-semibold</Code>, labels and buttons in{" "}
          <Code>font-medium</Code>, and use <Code>font-semimedium</Code> (450) where 400 reads too light on a dense row.
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
        <GuideH2 id="fonts">Fonts</GuideH2>
        <p className="text-muted-foreground">
          The theme names its faces in <Code>--font-sans</Code>, <Code>--font-mono</Code> and <Code>--font-serif</Code>, each
          with a CJK face and the system stack behind it. Without the font files it renders in system fonts, so installing
          them is optional.
        </p>
        <Table head={["Utility", "Face", "Use for"]}>
          {FONTS.map((f) => (
            <tr key={f.cls} className={row}>
              <td className={`${td} font-mono text-xs whitespace-nowrap text-foreground`}>{f.cls}</td>
              <td className={`${td} whitespace-nowrap text-muted-foreground`}>{f.face}</td>
              <td className={`${td} text-muted-foreground`}>{f.use}</td>
            </tr>
          ))}
        </Table>
        <InstallCommand args={`add @${REGISTRY_NAME}/fonts`} />
        <p className="text-muted-foreground">
          This adds the font packages and <Code>app/fonts.css</Code>; import that file once in your root layout. Each face is
          split by unicode range, so a page downloads only the glyph sets it shows. For code that lines up with Chinese text,
          install a CJK-aligned monospace such as Sarasa Gothic or Maple Mono yourself and put it first in{" "}
          <Code>--font-mono</Code>.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="radius">Radius</GuideH2>
        <p className="text-muted-foreground">
          Every step is a multiple of <Code>--radius</Code>, so change the base and the whole scale follows. No step goes
          past <Code>--radius-max</Code> (16px): larger corners turn controls into pills and push nested parts apart. Keep nested
          corners concentric, with the inner radius equal to the outer radius minus the padding between them. That is why{" "}
          <Code>p-1</Code> menus (<Code>rounded-2xl</Code>) hold <Code>rounded-lg</Code> rows. Use <Code>rounded-full</Code>{" "}
          only for shapes that are actually round. Sizes below are at the default <Code>0.5rem</Code>; try other
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
          Four shadow levels back Tailwind&apos;s <Code>shadow-xs</Code> to <Code>shadow-xl</Code>, so plain utilities pick
          them up. Give resting cards, tables and code blocks <Code>shadow-raised</Code>, never a floating level. Show hover
          on rows, menu items and ghost buttons with a fill (<Code>bg-secondary</Code>), not a ring.
        </p>
        <Table head={["", "Class", "Token", "Use for"]}>
          {SHADOW_SCALE.map((s) => (
            <tr key={s.cls} className={row}>
              <td className={`${td} w-14`}>
                <span className={`block size-8 rounded-lg bg-popover ${s.cls}`} />
              </td>
              <td className={`${td} font-mono text-xs whitespace-nowrap text-foreground`}>{s.cls}</td>
              <td className={`${td} font-mono text-xs whitespace-nowrap text-muted-foreground`}>{s.token}</td>
              <td className={`${td} text-muted-foreground`}>{s.use}</td>
            </tr>
          ))}
        </Table>
        <p className="text-muted-foreground">Components read these named levels, each built on the scale above.</p>
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
          Define a new token with a value for both modes, then map it in <Code>@theme inline</Code> to get the utilities.
        </p>
        <AgentCodeBlock code={NEW_TOKEN} filename="globals.css" language="css" />
      </section>
    </GuidePage>
  )
}
