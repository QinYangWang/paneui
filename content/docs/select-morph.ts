import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/select"

export default {
  baseUi: { name: "Select", href: BASE },
  usage: {
    imports: `import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@/components/ui/select-morph"`,
    code: `<MorphSelect items={items} defaultValue="tpe">
  <MorphSelectTrigger>
    <MorphSelectValue />
  </MorphSelectTrigger>
  <MorphSelectContent>
    <MorphSelectItem value="tpe">Taipei</MorphSelectItem>
    <MorphSelectItem value="tyo">Tokyo</MorphSelectItem>
  </MorphSelectContent>
</MorphSelect>`,
  },
  composition: `MorphSelect
├── MorphSelectTrigger
│   └── MorphSelectValue
└── MorphSelectContent
    ├── MorphSelectItem
    ├── MorphSelectSeparator
    └── MorphSelectGroup
        ├── MorphSelectLabel
        └── MorphSelectItem`,
  examples: [
    {
      id: "placeholder",
      title: "Placeholder",
      description: "Add an item with `value: null` to `items` and leave out `defaultValue`; its label shows in muted text until something is picked.",
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Put icons in items and the trigger. Pass the same row to `header` so the popup's mirrored first row matches the trigger.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disable single options with `disabled` on `MorphSelectItem`, or the whole select with `disabled` on `MorphSelect`.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Drive the selection with `value` / `onValueChange` and the popup with `open` / `onOpenChange`.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The popup starts as a box the exact size of the trigger and grows to its content height over 450ms, so the outline stays continuous; options fade and settle in after it. With reduced motion the popup cross-fades at full size.",
    },
    {
      title: "Keyboard",
      body: "Base UI Select: Space, Enter and the arrow keys open it, arrows move between options, typing jumps to a match, Enter selects and Escape closes.",
    },
    {
      title: "Related",
      body: "Other morphing surfaces: [Popover Morph](/docs/popover-morph), [Morphing Modal](/docs/morphing-modal), [Center Morph Modal](/docs/center-morph-modal), [Morphing Lightbox](/docs/morphing-lightbox), [Morphing Search](/docs/morphing-search), [Morphing Search Chips](/docs/morphing-search-chips), [Morphing Tabs](/docs/morphing-tabs).",
    },
  ],
  api: [
    {
      name: "MorphSelect",
      description: "Base UI `Select.Root`, re-exported unchanged.",
      extends: "Base UI Select.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "MorphSelectTrigger",
      description: "The raised 40px trigger the popup grows out of. Renders a chevron after its children.",
      extends: "Base UI Select.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "MorphSelectValue",
      description: "The selected label, truncated; muted while showing the placeholder.",
      extends: "Base UI Select.Value",
      extendsHref: `${BASE}#value`,
      props: [],
    },
    {
      name: "MorphSelectContent",
      description: "Portal, positioner and popup laid over the trigger, with a mirrored header row and a scrollable list (max 18rem).",
      extends: "Base UI Select.Popup",
      extendsHref: `${BASE}#popup`,
      props: [
        {
          name: "header",
          type: "ReactNode",
          default: "the current value",
          description: "What the mirrored first row shows. Match it to your trigger's content.",
        },
      ],
      dataAttributes: [
        { name: "data-side", description: "`bottom` or `top` (after a collision flip); on `top` the box grows upward." },
        { name: "data-starting-style / data-ending-style", description: "Present while the morph opens or closes." },
      ],
    },
    {
      name: "MorphSelectItem",
      description: "An option row with a check indicator on the right.",
      extends: "Base UI Select.Item",
      extendsHref: `${BASE}#item`,
      props: [],
      dataAttributes: [
        { name: "data-highlighted", description: "Present on the keyboard or pointer highlighted row." },
        { name: "data-selected", description: "Present on the selected row." },
      ],
    },
    {
      name: "MorphSelectGroup",
      extends: "Base UI Select.Group",
      extendsHref: `${BASE}#group`,
      props: [],
    },
    {
      name: "MorphSelectLabel",
      description: "Small muted heading for a group.",
      extends: "Base UI Select.GroupLabel",
      extendsHref: `${BASE}#grouplabel`,
      props: [],
    },
    {
      name: "MorphSelectSeparator",
      extends: "Base UI Select.Separator",
      extendsHref: `${BASE}#separator`,
      props: [],
    },
  ],
} satisfies ComponentDoc
