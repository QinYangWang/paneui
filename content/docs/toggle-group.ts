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
    { id: "outline", title: "Outline", description: "Use `outline` with text items in settings panels." },
    { id: "single-toggle", title: "Single Toggle", description: "Use `Toggle` alone for a single on/off option, driven by `pressed` and `onPressedChange`." },
    { id: "sizes", title: "Sizes" },
    {
      id: "rtl",
      title: "RTL",
      description: `For right-to-left languages, wrap the tree in \`DirectionProvider\` and set \`dir="rtl"\` on its root.`,
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
