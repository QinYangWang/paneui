import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Switches the page between light and dark themes.", "zh": "切换明暗主题。"},
  usage: {
    imports: `import { ThemeToggle } from "@/components/ui/theme-toggle"`,
    code: `<ThemeToggle />`,
  },
  examples: [
    { id: "switch", title: { en: "Segmented Switch", zh: "分段切换" }, description: { en: "Use in a header where both modes should stay visible.", zh: "适合需要同时看到两种模式的顶栏。" } },
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
      body: { en: "The reveal uses the View Transition API and starts at the click point, or at the button's centre for keyboard presses. With reduced motion, or without the API, the theme swaps instantly and the icon only cross-fades.", zh: "显示使用 View Transition API，从点击点开始，键盘按下时从按钮中心开始。在减少动态效果下，或没有该 API 时，主题立即切换，图标仅交叉淡入淡出。" },
    },
    {
      title: "Persistence",
      body: { en: "The choice is saved to `localStorage` under `storageKey` (`\"light\"` or `\"dark\"`); choosing System removes the key, and no key means the page follows the OS, including OS changes while it is open. A `theme-change` window event (`THEME_CHANGE_EVENT`) fires, so several toggles stay in sync, and other tabs follow through the storage event.", zh: "选择保存在 `localStorage` 的 `storageKey` 下（`\"light\"` 或 `\"dark\"`）；选择 System 会移除键，无键意味着页面跟随操作系统，包括打开时的操作系统变化。会触发 `theme-change` 窗口事件（`THEME_CHANGE_EVENT`），因此多个切换器保持同步，其他标签页通过存储事件跟随。" },
    },
    {
      title: "Labels",
      body: { en: "The button is named by the locale: `switchToLightTheme` or `switchToDarkTheme`, `themeCycle(current, next)` with `themeLight`, `themeDark` and `themeSystem` in the tri-state mode, and `toggleTheme` before the theme is known. An `aria-label` prop wins.", zh: "按钮由 locale 命名：`switchToLightTheme` 或 `switchToDarkTheme`，三态模式下为 `themeCycle(current, next)` 并带有 `themeLight`、`themeDark` 和 `themeSystem`，主题未知前为 `toggleTheme`。`aria-label` prop 优先。" },
    },
    {
      title: "Pre-paint script",
      body: { en: "Inline `getThemeScript()` in a `<script>` at the top of `<head>` so the first paint has the right theme: `<script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />` (pass your `storageKey` if you changed it). It sets the `.dark` class and `color-scheme`, and with no stored value keeps following OS changes even before the page hydrates.", zh: "在 `<head>` 顶部的 `<script>` 中内联 `getThemeScript()`，使首次绘制具有正确主题：`<script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />`（如果更改了 `storageKey` 请传入）。它设置 `.dark` 类和 `color-scheme`，在没有存储值时即使在页面水合前也继续跟随操作系统变化。" },
    },
  ],
  api: [
    {
      name: "ThemeToggle",
      description: { en: "Round 32px button that flips the `.dark` class on `<html>`.", zh: "32px 圆形按钮，切换 `<html>` 上的 `.dark` 类。" },
      extends: "button",
      props: [
        { name: "iconSize", type: "number", default: "16", description: { en: "Sun / moon icon size in px.", zh: "太阳 / 月亮图标大小，单位 px。" } },
        { name: "variant", type: '"raised" | "ghost"', default: '"raised"', description: { en: "Round raised button, or a 28px ghost toolbar button that matches `size=\"icon-sm\"` ghost Buttons.", zh: "圆形凸起按钮，或与 `size=\"icon-sm\"` ghost Button 匹配的 28px ghost 工具栏按钮。" } },
        { name: "storageKey", type: "string", default: `"theme"`, description: { en: "`localStorage` key for the saved theme.", zh: "保存主题的 `localStorage` 键。" } },
        { name: "duration", type: "number", default: "560", description: { en: "Reveal duration in ms.", zh: "显示持续时间，单位 ms。" } },
        { name: "onThemeChange", type: `(theme: "light" | "dark") => void`, description: { en: "Called after the theme changes.", zh: "主题更改后调用。" } },
        { name: "modes", type: '"binary" | "tri"', default: '"binary"', description: { en: "`binary` flips light and dark. `tri` cycles light, dark and system and shows the stored choice (a monitor icon for system).", zh: "`binary` 翻转亮色和暗色。`tri` 循环亮色、暗色和系统，并显示存储的选择（系统为显示器图标）。" } },
      ],
      dataAttributes: [{ name: "data-mode", description: { en: "The current mode when `modes=\"tri\"`.", zh: "`modes=\"tri\"` 时的当前模式。" } }],
    },
    {
      name: "ThemeSwitch",
      description: { en: "Segmented pill with a sliding thumb; shares storage and events with ThemeToggle.", zh: "带滑动指示的分段胶囊；与 ThemeToggle 共用存储和事件。" },
      extends: "div",
      props: [
        { name: "modes", type: '"binary" | "tri"', default: '"binary"', description: { en: "`tri` adds a system option.", zh: "`tri` 增加跟随系统选项。" } },
        { name: "storageKey", type: "string", default: `"theme"`, description: { en: "`localStorage` key for the saved theme.", zh: "保存主题的 `localStorage` 键。" } },
        { name: "duration", type: "number", default: "560", description: { en: "Reveal duration in ms.", zh: "显示持续时间，单位 ms。" } },
      ],
    },
    {
      name: "useTheme",
      description: { en: "Returns `{ theme, resolvedTheme, systemTheme, setTheme }`. `theme` is the stored choice (`\"system\"` when nothing is stored), `resolvedTheme` the theme on the page. All are `null` until mounted.", zh: "返回 `{ theme, resolvedTheme, systemTheme, setTheme }`。`theme` 是存储的选择（无存储时为 `\"system\"`），`resolvedTheme` 是页面上的主题。挂载前均为 `null`。" },
      props: [
        { name: "storageKey", type: "string", default: `"theme"`, description: { en: "`localStorage` key.", zh: "`localStorage` 键。" } },
        { name: "duration", type: "number", default: "560", description: { en: "Reveal duration in ms.", zh: "显示持续时间，单位 ms。" } },
        { name: "onThemeChange", type: `(theme: "light" | "dark") => void`, description: { en: "Called after the theme on the page changes.", zh: "页面上的主题更改后调用。" } },
        {
          name: "setTheme",
          type: `(theme: "light" | "dark" | "system", options?: { origin?: { x: number; y: number } }) => void`,
          description: { en: "Returned. Store a choice and reveal the result from `origin`; `\"system\"` removes the key.", zh: "返回。存储选择并从 `origin` 显示结果；`\"system\"` 移除键。" },
        },
      ],
    },
    {
      name: "getThemeScript",
      description: { en: "`(storageKey?: string) => string`. Source of the pre-paint script.", zh: "`(storageKey?: string) => string`。预绘制脚本的源。" },
      props: [],
    },
    {
      name: "useThemeToggle",
      description: { en: "Returns `{ theme, setTheme, toggle }`. `theme` is `null` until mounted, then follows the `.dark` class.", zh: "返回 `{ theme, setTheme, toggle }`。`theme` 在挂载前为 `null`，之后跟随 `.dark` 类。" },
      props: [
        { name: "storageKey", type: "string", default: `"theme"`, description: { en: "`localStorage` key.", zh: "`localStorage` 键。" } },
        { name: "duration", type: "number", default: "560", description: { en: "Reveal duration in ms.", zh: "显示持续时间，单位 ms。" } },
        { name: "onThemeChange", type: `(theme: "light" | "dark") => void`, description: { en: "Called after the theme changes.", zh: "主题更改后调用。" } },
        {
          name: "setTheme",
          type: `(theme: "light" | "dark", options?: { origin?: { x: number; y: number } }) => void`,
          description: { en: "Returned. Switch to a theme, revealing from `origin` (defaults to the viewport centre).", zh: "返回。切换到某个主题，从 `origin` 显示（默认为视口中心）。" },
        },
        {
          name: "toggle",
          type: "(options?: { origin?: { x: number; y: number } }) => void",
          description: { en: "Returned. Switch to the other theme.", zh: "返回。切换到另一个主题。" },
        },
      ],
    },
  ],
} satisfies ComponentDoc
