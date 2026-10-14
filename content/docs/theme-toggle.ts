import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ThemeToggle } from "@/components/ui/theme-toggle"`,
    code: `<ThemeToggle />`,
  },
  examples: [
    {
      id: "sizes",
      title: "Sizes",
      description: "Set the button size with a `size-*` class and match the glyph with `iconSize`.",
    },
    {
      id: "slow-reveal",
      title: "Reveal Duration",
      description: "`duration` sets how long the circular reveal takes, in ms.",
    },
    {
      id: "use-theme-toggle",
      title: "useThemeToggle",
      description: "Build your own control with the hook: `setTheme(theme, { origin })` grows the reveal from any point.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The new theme is revealed with a circular clip-path from the click point through the View Transition API; keyboard presses grow it from the button's centre. With reduced motion, or without the API, the theme swaps instantly and the icon only cross-fades.",
    },
    {
      title: "Persistence",
      body: "The choice is saved to `localStorage` under `storageKey` and a `theme-change` window event (`THEME_CHANGE_EVENT`) fires, so several toggles stay in sync. Add a pre-paint script that reads the same key to avoid a flash on load.",
    },
  ],
  api: [
    {
      name: "ThemeToggle",
      description: "Round 36px button that flips the `.dark` class on `<html>`.",
      extends: "button",
      props: [
        { name: "iconSize", type: "number", default: "16", description: "Sun / moon icon size in px." },
        { name: "storageKey", type: "string", default: `"theme"`, description: "`localStorage` key for the saved theme." },
        { name: "duration", type: "number", default: "560", description: "Reveal duration in ms." },
        { name: "onThemeChange", type: `(theme: "light" | "dark") => void`, description: "Called after the theme changes." },
      ],
    },
    {
      name: "useThemeToggle",
      description: "Returns `{ theme, setTheme, toggle }`. `theme` is `null` until mounted, then follows the `.dark` class.",
      props: [
        { name: "storageKey", type: "string", default: `"theme"`, description: "`localStorage` key." },
        { name: "duration", type: "number", default: "560", description: "Reveal duration in ms." },
        { name: "onThemeChange", type: `(theme: "light" | "dark") => void`, description: "Called after the theme changes." },
        {
          name: "setTheme",
          type: `(theme: "light" | "dark", options?: { origin?: { x: number; y: number } }) => void`,
          description: "Returned. Switch to a theme, revealing from `origin` (defaults to the viewport centre).",
        },
        {
          name: "toggle",
          type: "(options?: { origin?: { x: number; y: number } }) => void",
          description: "Returned. Switch to the other theme.",
        },
      ],
    },
  ],
} satisfies ComponentDoc
