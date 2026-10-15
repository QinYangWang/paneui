import type { ComponentDoc } from "@/lib/doc-types"

const variant = {
  name: "variant",
  type: `"default" | "outline"`,
  default: `"default"`,
  description: "`default` is a bare row whose pressed item gets a fill; `outline` draws a hairline around every item (settings panels).",
}
const size = {
  name: "size",
  type: `"default" | "sm" | "xs"`,
  default: `"default"`,
  description: "32 / 28 / 24px tall, the button density.",
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
    { id: "outline", title: "Outline", description: "`variant=\"outline\"` with text items, as in an image settings panel. The group holds one value unless `multiple` is set." },
    { id: "single-toggle", title: "Single Toggle", description: "`Toggle` on its own: `pressed` and `onPressedChange`." },
  ],
  notes: [
    { title: "One value or many", body: "The value is always an array. Without `multiple` it holds at most one item, so read `value[0]`; to stop the user clearing the choice, ignore empty arrays in `onValueChange`." },
    { title: "When to use something else", body: "For a one-of-few value with a raised thumb (billing cycle, view mode) use `SegmentedControl`. Inside a `Toolbar`, use `ToolbarToggle` so the item joins the toolbar's arrow-key loop." },
  ],
  api: [
    { name: "ToggleGroup", extends: "ToggleGroup", extendsHref: "https://base-ui.com/react/components/toggle-group#api-reference", props: [variant, size], dataAttributes: [{ name: "data-variant", description: "The group variant." }] },
    { name: "ToggleGroupItem", description: "Takes `variant` / `size` from the group unless set.", extends: "Toggle", extendsHref: "https://base-ui.com/react/components/toggle#api-reference", props: [{ name: "value", type: "string", description: "The item's value in the group.", required: true }], dataAttributes: [{ name: "data-pressed", description: "Present when pressed." }] },
    { name: "Toggle", extends: "Toggle", extendsHref: "https://base-ui.com/react/components/toggle#api-reference", props: [variant, size] },
  ],
} satisfies ComponentDoc
