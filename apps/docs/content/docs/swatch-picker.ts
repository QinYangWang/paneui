import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Picks one colour from a fixed palette.", "zh": "从固定色板中选择颜色。"},
  baseUi: { name: "Radio Group", href: "https://base-ui.com/react/components/radio" },
  usage: {
    imports: `import { SwatchPicker } from "@/components/ui/swatch-picker"`,
    code: `<SwatchPicker
  label="Tag colour"
  swatches={[
    { value: "none", label: "None" },
    { value: "blue", label: "Blue", color: "var(--chart-1)" },
    { value: "pink", label: "Pink", color: "var(--chart-5)" },
  ]}
  value={color}
  onValueChange={setColor}
/>`,
  },
  examples: [{ id: "letter", title: { en: "Letter", zh: "字母" },  }],
  notes: [
    { title: "Palette, not picker", body: { en: "For an arbitrary colour use `ColorPicker`; `SwatchPicker` is a fixed palette. It is a radio group with one tab stop, and arrow keys move between swatches. A swatch without `color` is the \"none\" choice.", zh: "任意颜色请用 `ColorPicker`；`SwatchPicker` 是固定调色板。它是一个单选组，只有一个 Tab 停靠点，方向键在色块间移动。没有 `color` 的色块是“无”选项。" } },
    { title: "Colours", body: { en: "Pass theme tokens (`var(--chart-1)`) for UI that follows light and dark, or hex when the value leaves the app (the email editor's palette).", zh: "需要跟随明暗模式的 UI 传主题变量（`var(--chart-1)`），值要离开应用时传十六进制（如邮件编辑器的调色板）。" } },
  ],
  api: [
    { name: "SwatchPicker", extends: "RadioGroup", extendsHref: "https://base-ui.com/react/components/radio#api-reference", props: [
      { name: "swatches", type: "{ value: string; label: string; color?: string }[]", required: true, description: { en: "The palette. `label` is the accessible name and tooltip.", zh: "调色板。`label` 是可访问名称和提示。" } },
      { name: "variant", type: `"dot" | "letter"`, default: `"dot"`, description: { en: "Colour dots or an \"A\" per colour.", zh: "颜色圆点，或每个颜色的“A”。" } },
      { name: "label", type: "React.ReactNode", description: { en: "Visible label above the swatches (also labels the group).", zh: "色块上方的可见标签（同时作为组的标签）。" } },
    ] },
  ],
} satisfies ComponentDoc
