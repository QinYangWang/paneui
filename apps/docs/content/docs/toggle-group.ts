import type { ComponentDoc } from "@/lib/doc-types"

const variant = {
  name: "variant",
  type: `"default" | "outline"`,
  default: `"default"`,
  description: "`default` fills only the pressed item; `outline` frames every item, for settings panels.",
}
const size = {
  name: "size",
  type: `"xs" | "sm" | "default" | "lg"`,
  default: `"default"`,
  description: "Height 24 / 28 / 32 / 36px, matching the button sizes.",
}

export default {
  summary: {"en": "Turns formatting or view options on and off.", "zh": "切换格式或视图选项。"},
  baseUi: { name: "Toggle Group", href: "https://base-ui.com/react/components/toggle-group" },
  usage: {
    imports: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    code: `<ToggleGroup multiple defaultValue={["bold"]} aria-label="Text style">
  <ToggleGroupItem value="bold" aria-label="Bold"><BoldIcon /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><ItalicIcon /></ToggleGroupItem>
</ToggleGroup>`,
  },
  composition: `ToggleGroup
└── ToggleGroupItem

Toggle`,
  examples: [
    { id: "outline", title: { en: "Outline", zh: "边框" },  },
    { id: "single-toggle", title: { en: "Single Toggle", zh: "单个切换" },  },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" } },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    { title: "One value or many", body: "The value is always an array. Without `multiple` it holds at most one item, so read `value[0]`; to stop the user clearing the choice, ignore empty arrays in `onValueChange`." },
    { title: "When to use something else", body: "For a one-of-few value with a raised thumb (billing cycle, view mode) use `SegmentedControl`. Inside a `Toolbar`, use `ToolbarToggle` so the item joins the toolbar's arrow-key loop." },
  ],
  api: [
    { name: "ToggleGroup", extends: "ToggleGroup", extendsHref: "https://base-ui.com/react/components/toggle-group#api-reference", props: [variant, size], dataAttributes: [{ name: "data-variant", description: "The group variant." }, { name: "data-size", description: "The group size." }] },
    { name: "ToggleGroupItem", description: "Takes `variant` / `size` from the group unless set.", extends: "Toggle", extendsHref: "https://base-ui.com/react/components/toggle#api-reference", props: [{ name: "value", type: "string", description: "The item's value in the group.", required: true }], dataAttributes: [{ name: "data-pressed", description: "Present when pressed." }, { name: "data-variant", description: "The resolved variant." }, { name: "data-size", description: "The resolved size." }] },
    { name: "Toggle", extends: "Toggle", extendsHref: "https://base-ui.com/react/components/toggle#api-reference", props: [variant, size] },
  ],
} satisfies ComponentDoc
