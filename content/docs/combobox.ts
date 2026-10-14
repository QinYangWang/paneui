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
      description: "Use `ComboboxTrigger` with `ComboboxValue` for a select-like button, and put `ComboboxSearch` at the top of the popup.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "`ComboboxInput` and `ComboboxTrigger` take `size` `\"sm\"` (28px) or `\"default\"` (32px).",
    },
    {
      id: "input-options",
      title: "Input Options",
      description: "Hide the leading search icon, the clear button or the chevron with `showSearchIcon`, `showClear` and `showTrigger`.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Own the selection with `value` and `onValueChange`; the clear button sets it to `null`.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Pass `disabled` to a `ComboboxItem` to skip one option, or to `Combobox` to lock the whole field.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Typing filters the list; `ArrowUp` / `ArrowDown` move the highlight, `Enter` picks it and `Escape` closes the popup (Base UI Combobox behaviour).",
    },
    {
      title: "Related",
      body: "[Multi Select](/docs/multi-select) is the same primitive in `multiple` mode, with chips.",
    },
  ],
  api: [
    {
      name: "Combobox",
      description: "Re-export of the Base UI root: `items`, `value`, `defaultValue`, `onValueChange`, `filter`, `disabled` and so on.",
      extends: "Base UI Combobox.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "ComboboxInput",
      description: "Search input in an inset well with optional search icon, clear and chevron buttons.",
      extends: "Base UI Combobox.Input",
      extendsHref: `${BASE}#input`,
      props: [
        { name: "size", type: `"sm" | "default"`, default: `"default"`, description: "Height: 28px or 32px." },
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
        { name: "data-size", description: "On the input group: the `size` value." },
        { name: "data-disabled", description: "On the input group while disabled." },
      ],
    },
    {
      name: "ComboboxTrigger",
      description: "Raised button showing the chosen value, like `SelectTrigger`. Put `ComboboxValue` inside.",
      extends: "Base UI Combobox.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [{ name: "size", type: `"sm" | "default"`, default: `"default"`, description: "Height: 28px or 32px." }],
      dataAttributes: [{ name: "data-popup-open", description: "Present while the list is open." }],
    },
    {
      name: "ComboboxValue",
      description: "Re-export. Renders the selected value, or `placeholder` when empty.",
      extends: "Base UI Combobox.Value",
      extendsHref: `${BASE}#value`,
      props: [],
    },
    {
      name: "ComboboxSearch",
      description: "Search field styled for the top of the popup.",
      extends: "Base UI Combobox.Input",
      extendsHref: `${BASE}#input`,
      props: [],
    },
    {
      name: "ComboboxContent",
      description: "Portal, positioner and popup in one. As wide as its anchor.",
      extends: "Base UI Combobox.Popup",
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
      extends: "Base UI Combobox.List",
      extendsHref: `${BASE}#list`,
      props: [],
    },
    {
      name: "ComboboxItem",
      description: "Option row with a check indicator on the right when selected.",
      extends: "Base UI Combobox.Item",
      extendsHref: `${BASE}#item`,
      props: [],
      dataAttributes: [
        { name: "data-highlighted", description: "Present on the keyboard / pointer highlighted item." },
        { name: "data-disabled", description: "Present when the item is disabled." },
      ],
    },
    { name: "ComboboxGroup", extends: "Base UI Combobox.Group", extendsHref: `${BASE}#group`, props: [] },
    { name: "ComboboxLabel", extends: "Base UI Combobox.GroupLabel", extendsHref: `${BASE}#group-label`, props: [] },
    { name: "ComboboxSeparator", extends: "Base UI Combobox.Separator", extendsHref: `${BASE}#separator`, props: [] },
    {
      name: "ComboboxEmpty",
      description: "Shown only when the filter leaves nothing to pick.",
      extends: "Base UI Combobox.Empty",
      extendsHref: `${BASE}#empty`,
      props: [],
    },
    {
      name: "ComboboxCollection",
      description: "Re-export. Renders a group's `items` with a render function.",
      extends: "Base UI Combobox.Collection",
      extendsHref: `${BASE}#collection`,
      props: [],
    },
    {
      name: "useComboboxFilter",
      description: "Re-export of `Combobox.useFilter`: locale-aware `contains`, `startsWith` and `endsWith` matchers to pass to `filter`.",
      extends: "Base UI Combobox.useFilter",
      extendsHref: BASE,
      props: [],
    },
  ],
} satisfies ComponentDoc
