import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Radio Group", href: "https://base-ui.com/react/components/radio" },
  usage: {
    imports: `import { SwatchPicker } from "@/components/ui/swatch-picker"`,
    code: `<SwatchPicker
  label="Tag colour"
  swatches={[
    { value: "none", label: "None" },
    { value: "teal", label: "Teal", color: "var(--chart-1)" },
    { value: "pink", label: "Pink", color: "var(--chart-3)" },
  ]}
  value={color}
  onValueChange={setColor}
/>`,
  },
  examples: [{ id: "letter", title: "Letter", description: "`variant=\"letter\"` shows an \"A\" in each colour, for text colour menus." }],
  notes: [
    { title: "Palette, not picker", body: "For any colour use `ColorPicker`. `SwatchPicker` is a fixed palette, a radio group: one tab stop, arrow keys move between swatches. A swatch without `color` is the \"none\" choice and gets a slash." },
    { title: "Colours", body: "Pass theme tokens (`var(--chart-1)`) for UI that follows light and dark, or hex when the value leaves the app (the email editor's palette)." },
  ],
  api: [
    { name: "SwatchPicker", extends: "Base UI RadioGroup", extendsHref: "https://base-ui.com/react/components/radio#api-reference", props: [
      { name: "swatches", type: "{ value: string; label: string; color?: string }[]", required: true, description: "The palette. `label` is the accessible name and tooltip." },
      { name: "variant", type: `"dot" | "letter"`, default: `"dot"`, description: "Colour dots or an \"A\" per colour." },
      { name: "label", type: "React.ReactNode", description: "Visible label above the swatches (also labels the group)." },
    ] },
  ],
} satisfies ComponentDoc
