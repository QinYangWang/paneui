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
    { title: "Palette, not picker", body: "For an arbitrary colour use `ColorPicker`; `SwatchPicker` is a fixed palette. It is a radio group with one tab stop, and arrow keys move between swatches. A swatch without `color` is the \"none\" choice." },
    { title: "Colours", body: "Pass theme tokens (`var(--chart-1)`) for UI that follows light and dark, or hex when the value leaves the app (the email editor's palette)." },
  ],
  api: [
    { name: "SwatchPicker", extends: "RadioGroup", extendsHref: "https://base-ui.com/react/components/radio#api-reference", props: [
      { name: "swatches", type: "{ value: string; label: string; color?: string }[]", required: true, description: "The palette. `label` is the accessible name and tooltip." },
      { name: "variant", type: `"dot" | "letter"`, default: `"dot"`, description: "Colour dots or an \"A\" per colour." },
      { name: "label", type: "React.ReactNode", description: "Visible label above the swatches (also labels the group)." },
    ] },
  ],
} satisfies ComponentDoc
