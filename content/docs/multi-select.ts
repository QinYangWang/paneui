import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/combobox"

export default {
  baseUi: { name: "Combobox", href: BASE },
  usage: {
    imports: `import { MultiSelect, MultiSelectContent, MultiSelectEmpty, MultiSelectItem, MultiSelectList, MultiSelectTrigger } from "@/components/ui/multi-select"`,
    code: `<MultiSelect items={labels}>
  <MultiSelectTrigger placeholder="Add labels" />
  <MultiSelectContent>
    <MultiSelectEmpty>No labels found.</MultiSelectEmpty>
    <MultiSelectList>
      {(label: string) => (
        <MultiSelectItem key={label} value={label}>
          {label}
        </MultiSelectItem>
      )}
    </MultiSelectList>
  </MultiSelectContent>
</MultiSelect>`,
  },
  composition: `MultiSelect
├── MultiSelectTrigger
└── MultiSelectContent
    ├── MultiSelectEmpty
    └── MultiSelectList
        ├── MultiSelectItem
        └── MultiSelectGroup
            ├── MultiSelectLabel
            ├── MultiSelectCollection
            │   └── MultiSelectItem
            └── MultiSelectSeparator`,
  examples: [
    {
      id: "groups",
      title: "Groups",
      description: "Use when the options fall into categories.",
    },
    {
      id: "objects",
      title: "Object Values",
      description: "Use when items are objects, with `itemToStringLabel`, `renderChip` and `getKey` turning them into text and keys.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use when other UI sets or reads the selection.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Typing filters; `Enter` toggles the highlighted option and keeps the list open. `Backspace` in an empty input removes the last chip.",
    },
    {
      title: "Motion",
      body: "Chips use a 520 / 34 / 0.6 spring. With reduced motion they only fade.",
    },
    {
      title: "Related",
      body: "See also [Combobox](/docs/combobox).",
    },
  ],
  api: [
    {
      name: "MultiSelect",
      description: "`Combobox.Root` with `multiple` always on.",
      extends: "Combobox.Root",
      extendsHref: `${BASE}#root`,
      props: [
        { name: "value", type: "Value[]", description: "Controlled selected values." },
        { name: "defaultValue", type: "Value[]", description: "Initially selected values." },
        { name: "onValueChange", type: "(value: Value[], details) => void", description: "Called when the selection changes." },
      ],
    },
    {
      name: "MultiSelectTrigger",
      description: "Holds the chips and the search input. The popup anchors to it.",
      extends: "Combobox.Chips",
      extendsHref: `${BASE}#chips`,
      props: [
        { name: "placeholder", type: "string", default: `"Select…"`, description: "Input placeholder while nothing is selected." },
        {
          name: "renderChip",
          type: "(value) => ReactNode",
          default: "value.label ?? value.value ?? String(value)",
          description: "Chip content for a selected value.",
        },
        {
          name: "getKey",
          type: "(value, index: number) => Key",
          default: "value.value ?? value.id ?? index (strings: the value)",
          description: "React key for each chip.",
        },
      ],
    },
    {
      name: "MultiSelectContent",
      description: "Portal, positioner and popup, anchored to the trigger.",
      extends: "Combobox.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        { name: "side", type: `"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"`, default: `"bottom"`, description: "Side of the trigger to place the popup on." },
        { name: "sideOffset", type: "number", default: "6", description: "Gap from the trigger in px." },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Alignment against the trigger." },
      ],
    },
    {
      name: "MultiSelectItem",
      description: "Option row with a tick that fills when chosen.",
      extends: "Combobox.Item",
      extendsHref: `${BASE}#item`,
      props: [],
      dataAttributes: [
        { name: "data-selected", description: "Present when the value is chosen (fills the tick)." },
        { name: "data-highlighted", description: "Present on the highlighted item." },
      ],
    },
    {
      name: "MultiSelectList",
      description: "Alias of `ComboboxList`.",
      extends: "Combobox.List",
      extendsHref: `${BASE}#list`,
      props: [],
    },
    { name: "MultiSelectGroup", description: "Alias of `ComboboxGroup`.", extends: "Combobox.Group", extendsHref: `${BASE}#group`, props: [] },
    { name: "MultiSelectLabel", description: "Alias of `ComboboxLabel`.", extends: "Combobox.GroupLabel", extendsHref: `${BASE}#group-label`, props: [] },
    { name: "MultiSelectSeparator", description: "Alias of `ComboboxSeparator`.", extends: "Combobox.Separator", extendsHref: `${BASE}#separator`, props: [] },
    { name: "MultiSelectEmpty", description: "Alias of `ComboboxEmpty`.", extends: "Combobox.Empty", extendsHref: `${BASE}#empty`, props: [] },
    { name: "MultiSelectCollection", description: "Alias of `ComboboxCollection`.", extends: "Combobox.Collection", extendsHref: `${BASE}#collection`, props: [] },
  ],
} satisfies ComponentDoc
