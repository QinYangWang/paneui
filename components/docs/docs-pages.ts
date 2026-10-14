/**
 * The docs' "Getting started" pages, in sidebar order. Shared by the sidebar,
 * the ⌘K palette, breadcrumbs and the guide pages' prev/next links, so the
 * names stay identical everywhere. Client-safe (no server-only imports).
 */
export type GuidePage = { href: string; title: string; description: string; keywords: string[] }

export const GUIDE_PAGES = [
  {
    href: "/docs",
    title: "Introduction",
    description: "Copy-paste React components on Base UI, Tailwind 4 and Motion, in a quiet native desktop style.",
    keywords: ["about", "overview", "start", "principles"],
  },
  {
    href: "/docs/installation",
    title: "Installation",
    description: "Add the @qinyang namespace to components.json, install the theme, then add components with the shadcn CLI.",
    keywords: ["setup", "install", "components.json", "registry"],
  },
  {
    href: "/docs/theming",
    title: "Theming",
    description: "The tokens every component reads: colours, dark mode, accent presets, type scale, radius and elevation.",
    keywords: ["theme", "tokens", "dark mode", "accent", "colors", "css variables", "radius", "shadow", "typography"],
  },
  {
    href: "/docs/cli",
    title: "CLI & registry",
    description: "Browse, inspect and install @qinyang items with the shadcn CLI, or point it straight at an item URL.",
    keywords: ["shadcn", "cli", "add", "view", "search", "registry", "json"],
  },
  {
    href: "/docs/changelog",
    title: "Changelog",
    description: "What changed in qinyang/ui, newest first.",
    keywords: ["releases", "updates", "history", "news"],
  },
] as const satisfies readonly GuidePage[]

/** The components overview (all live previews, by category). */
export const COMPONENTS_HREF = "/"
export const COMPONENTS_TITLE = "Overview"
