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
    description: "React components you install as source with the shadcn CLI.",
    keywords: ["about", "overview", "start", "principles"],
  },
  {
    href: "/docs/installation",
    title: "Installation",
    description: "Register the namespace, install the theme, then add components.",
    keywords: ["setup", "install", "components.json", "registry"],
  },
  {
    href: "/docs/theming",
    title: "Theming",
    description: "How the theme tokens work and how to change them.",
    keywords: ["theme", "tokens", "dark mode", "accent", "colors", "css variables", "radius", "shadow", "typography"],
  },
  {
    href: "/docs/colors",
    title: "Colors",
    description: "Every colour token by role, and a picker for your own accent.",
    keywords: ["color", "colour", "tokens", "palette", "accent", "primary", "custom accent", "oklch", "dark mode", "css variables"],
  },
  {
    href: "/docs/cli",
    title: "CLI & registry",
    description: "Find, inspect and install registry items from the command line.",
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
