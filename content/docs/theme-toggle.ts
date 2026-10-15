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
      description: "Use a smaller `size-*` class in dense toolbars, matching the glyph with `iconSize`.",
    },
    {
      id: "slow-reveal",
      title: "Reveal Duration",
    },
    {
      id: "use-theme-toggle",
      title: "useThemeToggle",
      description: "Use the hook to build your own control; `setTheme(theme, { origin })` starts the reveal from any point.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The reveal uses the View Transition API and starts at the click point, or at the button's centre for keyboard presses. With reduced motion, or without the API, the theme swaps instantly and the icon only cross-fades.",
    },
    {
      title: "Persistence",
      body: "The choice is saved to `localStorage` under `storageKey` and a `theme-change` window event (`THEME_CHANGE_EVENT`) fires, so several toggles stay in sync. Add a pre-paint script that reads the same key to avoid a flash on load.",
    },
  ],
  api: [
    {
      name: "ThemeToggle",
      description: "Round 32px button that flips the `.dark` class on `<html>`.",
      extends: "button",
      props: [
        { name: "iconSize", type: "number", default: "16", description: "Sun / moon icon size in px." },
        { name: "variant", type: '"raised" | "ghost"', default: '"raised"', description: "Round raised button, or a 28px ghost toolbar button that matches `size=\"icon-sm\"` ghost Buttons." },
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
