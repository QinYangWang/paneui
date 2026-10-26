import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Chooses and remembers an accent colour.", "zh": "选择并记住主题色。"},
  baseUi: { name: "Radio Group", href: "https://base-ui.com/react/components/radio" },
  usage: {
    imports: `import { AccentPicker, AccentPresets } from "@/components/ui/accent-picker"`,
    code: `// once, near the top of your root layout's <body>
<AccentPresets />

// in your appearance settings
<AccentPicker showLabels />`,
  },
  examples: [],
  notes: [
    { title: "How it works", body: { en: "It sets `data-accent` on `<html>` (blue, the default, has no attribute) and stores the pick in `localStorage[\"accent\"]`. The preset roles ship inside the component as CSS and are injected once, so it works in any app with `@paneui/theme`. `AccentPresets` renders that CSS plus a pre-paint script so a reload never flashes the default.", zh: "它在 `<html>` 上设置 `data-accent`（默认的 blue 不带属性），并把选择存入 `localStorage[\"accent\"]`。预设主题色以 CSS 形式随组件提供，且只注入一次，因此在任何使用 `@paneui/theme` 的应用中都能生效。`AccentPresets` 会渲染这段 CSS 以及一个预绘制脚本，因此刷新页面不会闪现默认主题色。" } },
    { title: "Custom control", body: { en: "`useAccent()` returns `[accent, setAccent]` for a menu or select of your own.", zh: "`useAccent()` 返回 `[accent, setAccent]`，便于自建菜单或选择器。" } },
  ],
  api: [
    {
      name: "AccentPicker",
      extends: "RadioGroup",
      props: [
        { name: "accents", type: "Accent[]", default: "all six", description: { en: "Presets to offer, from `blue`, `neutral`, `green`, `orange`, `rose` and `violet`.", zh: "可提供的预设：`blue`、`neutral`、`green`、`orange`、`rose` 和 `violet`。" } },
        { name: "showLabels", type: "boolean", default: "false", description: { en: "Names under the swatches.", zh: "色块下方的名称。" } },
      ],
    },
    { name: "useAccent", description: { en: "Returns `[accent, setAccent]`, kept in sync across pickers and tabs.", zh: "返回 `[accent, setAccent]`，并在各选择器和标签页之间保持同步。" }, props: [] },
    { name: "AccentPresets", description: { en: "`<style>` with the presets plus a pre-paint script.", zh: "包含预设的 `<style>` 以及预绘制脚本。" }, props: [] },
  ],
} satisfies ComponentDoc
