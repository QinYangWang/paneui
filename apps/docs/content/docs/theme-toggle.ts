import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Switches the page between light and dark themes.", "zh": "切换明暗主题。"},
  usage: {
    imports: `import { ThemeToggle } from "@/components/ui/theme-toggle"`,
    code: `<ThemeToggle />`,
  },
  examples: [
    {
      id: "tri-state",
      title: { en: "Light, Dark and System", zh: "浅色、深色与跟随系统" },
    },
    {
      id: "use-theme",
      title: { en: "useTheme", zh: "useTheme" },
      description: { en: "Use the hook for a menu or segmented control of your own.", zh: "适用于自定义菜单或分段控件。" },
    },
    {
      id: "sizes",
      title: { en: "Sizes", zh: "尺寸" },
    },
    {
      id: "slow-reveal",
      title: { en: "Reveal Duration", zh: "显示时长" },
    },
    {
      id: "use-theme-toggle",
      title: { en: "useThemeToggle", zh: "useThemeToggle" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The reveal uses the View Transition API and starts at the click point, or at the button's centre for keyboard presses. With reduced motion, or without the API, the theme swaps instantly and the icon only cross-fades.",
    },
    {
      title: "Persistence",
      body: "The choice is saved to `localStorage` under `storageKey` (`\"light\"` or `\"dark\"`); choosing System removes the key, and no key means the page follows the OS, including OS changes while it is open. A `theme-change` window event (`THEME_CHANGE_EVENT`) fires, so several toggles stay in sync, and other tabs follow through the storage event.",
    },
    {
      title: "Labels",
      body: "The button is named by the locale: `switchToLightTheme` or `switchToDarkTheme`, `themeCycle(current, next)` with `themeLight`, `themeDark` and `themeSystem` in the tri-state mode, and `toggleTheme` before the theme is known. An `aria-label` prop wins.",
    },
    {
      title: "Pre-paint script",
      body: "Inline `getThemeScript()` in a `<script>` at the top of `<head>` so the first paint has the right theme: `<script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />` (pass your `storageKey` if you changed it). It sets the `.dark` class and `color-scheme`, and with no stored value keeps following OS changes even before the page hydrates.",
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
        { name: "modes", type: '"binary" | "tri"', default: '"binary"', description: "`binary` flips light and dark. `tri` cycles light, dark and system and shows the stored choice (a monitor icon for system)." },
      ],
      dataAttributes: [{ name: "data-mode", description: "The current mode when `modes=\"tri\"`." }],
    },
    {
      name: "useTheme",
      description: "Returns `{ theme, resolvedTheme, systemTheme, setTheme }`. `theme` is the stored choice (`\"system\"` when nothing is stored), `resolvedTheme` the theme on the page. All are `null` until mounted.",
      props: [
        { name: "storageKey", type: "string", default: `"theme"`, description: "`localStorage` key." },
        { name: "duration", type: "number", default: "560", description: "Reveal duration in ms." },
        { name: "onThemeChange", type: `(theme: "light" | "dark") => void`, description: "Called after the theme on the page changes." },
        {
          name: "setTheme",
          type: `(theme: "light" | "dark" | "system", options?: { origin?: { x: number; y: number } }) => void`,
          description: "Returned. Store a choice and reveal the result from `origin`; `\"system\"` removes the key.",
        },
      ],
    },
    {
      name: "getThemeScript",
      description: "`(storageKey?: string) => string`. Source of the pre-paint script.",
      props: [],
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
