import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/combobox"

export default {
  baseUi: { name: "Combobox", href: BASE },
  usage: {
    imports: `import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"`,
    code: `<Combobox items={cities}>
  <ComboboxInput placeholder="Search cities" />
  <ComboboxContent>
    <ComboboxEmpty>No city found.</ComboboxEmpty>
    <ComboboxList>
      {(city: string) => (
        <ComboboxItem key={city} value={city}>
          {city}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  },
  composition: `Combobox
├── ComboboxInput            (or ComboboxTrigger > ComboboxValue)
└── ComboboxContent
    ├── ComboboxSearch       (with ComboboxTrigger)
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxGroup
            ├── ComboboxLabel
            ├── ComboboxCollection
            │   └── ComboboxItem
            └── ComboboxSeparator`,
  examples: [
    {
      id: "popup-search",
      title: "Search In Popup",
      description: "Use `ComboboxTrigger` with `ComboboxSearch` when the field should look like a select.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Set `size` on `Combobox` to size the input and its rows together.",
    },
    {
      id: "input-options",
      title: "Input Options",
      description: "Turn off controls a field doesn't need, like the clear button when a choice is required.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use `value` and `onValueChange` when the selection drives other UI; clearing sets it to `null`.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disable a `ComboboxItem` for an unavailable option, or `Combobox` to lock the field.",
    },
    {
      id: "rtl",
      title: "RTL",
      description: `For right-to-left languages, wrap the tree in \`DirectionProvider\` and set \`dir="rtl"\` on its root.`,
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Typing filters the list; `ArrowUp` / `ArrowDown` move the highlight, `Enter` picks it and `Escape` closes the popup (standard combobox behaviour).",
    },
    {
      title: "Related",
      body: "[Multi Select](/docs/multi-select) is the same primitive in `multiple` mode, with chips.",
    },
  ],
  api: [
    {
      name: "Combobox",
      description: "Re-export of the primitive root, taking `items`, `value`, `defaultValue`, `onValueChange`, `filter`, `disabled` and its other props.",
      extends: "Combobox.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "ComboboxInput",
      description: "Search input in an inset well with optional search icon, clear and chevron buttons.",
      extends: "Combobox.Input",
      extendsHref: `${BASE}#input`,
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Height 24 / 28 / 32 / 36px. Defaults to the `Combobox` size, then a sized `Field`." },
        { name: "showSearchIcon", type: "boolean", default: "true", description: "Show the leading search icon." },
        {
          name: "showClear",
          type: "boolean",
          default: "true",
          description: "Render a clear button, shown once something is chosen.",
        },
        { name: "showTrigger", type: "boolean", default: "true", description: "Render the chevron that opens the list." },
      ],
      dataAttributes: [
        { name: "data-size", description: "On the input group, the `size` value." },
        { name: "data-disabled", description: "On the input group while disabled." },
      ],
    },
    {
      name: "ComboboxTrigger",
      description: "Raised button showing the chosen value, like `SelectTrigger`. Put `ComboboxValue` inside.",
      extends: "Combobox.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [{ name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Height 24 / 28 / 32 / 36px. Defaults to the `Combobox` size, then a sized `Field`." }],
      dataAttributes: [{ name: "data-popup-open", description: "Present while the list is open." }],
    },
    {
      name: "ComboboxValue",
      description: "Re-export. Renders the selected value, or `placeholder` when empty.",
      extends: "Combobox.Value",
      extendsHref: `${BASE}#value`,
      props: [],
    },
    {
      name: "ComboboxSearch",
      description: "Search field styled for the top of the popup.",
      extends: "Combobox.Input",
      extendsHref: `${BASE}#input`,
      props: [],
    },
    {
      name: "ComboboxContent",
      description: "Portal, positioner and popup in one. As wide as its anchor.",
      extends: "Combobox.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "side", type: `"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"`, default: `"bottom"`, description: "Side of the anchor to place the popup on." },
        { name: "sideOffset", type: "number", default: "6", description: "Gap from the anchor in px." },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Alignment against the anchor." },
        { name: "anchor", type: "Element | RefObject<Element> | VirtualElement | null", description: "Position against another element." },
      ],
    },
    {
      name: "ComboboxList",
      description: "Scrollable list. Takes a render function called per item (or group).",
      extends: "Combobox.List",
      extendsHref: `${BASE}#list`,
      props: [],
    },
    {
      name: "ComboboxItem",
      description: "Option row with a check indicator on the right when selected.",
      extends: "Combobox.Item",
      extendsHref: `${BASE}#item`,
      props: [],
      dataAttributes: [
        { name: "data-highlighted", description: "Present on the keyboard / pointer highlighted item." },
        { name: "data-disabled", description: "Present when the item is disabled." },
      ],
    },
    { name: "ComboboxGroup", extends: "Combobox.Group", extendsHref: `${BASE}#group`, props: [] },
    { name: "ComboboxLabel", extends: "Combobox.GroupLabel", extendsHref: `${BASE}#group-label`, props: [] },
    { name: "ComboboxSeparator", extends: "Combobox.Separator", extendsHref: `${BASE}#separator`, props: [] },
    {
      name: "ComboboxEmpty",
      description: "Shown only when the filter leaves nothing to pick.",
      extends: "Combobox.Empty",
      extendsHref: `${BASE}#empty`,
      props: [],
    },
    {
      name: "ComboboxCollection",
      description: "Re-export. Renders a group's `items` with a render function.",
      extends: "Combobox.Collection",
      extendsHref: `${BASE}#collection`,
      props: [],
    },
    {
      name: "useComboboxFilter",
      description: "Re-export of `Combobox.useFilter`, returning locale-aware `contains`, `startsWith` and `endsWith` matchers for `filter`.",
      extends: "Combobox.useFilter",
      extendsHref: BASE,
      props: [],
    },
  ],
} satisfies ComponentDoc
