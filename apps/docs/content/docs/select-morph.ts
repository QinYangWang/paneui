import type { ComponentDoc } from "@/lib/doc-types"

const BASE = "https://base-ui.com/react/components/select"

export default {
  summary: {"en": "Select whose trigger unfolds into its option list.", "zh": "将选择控件展开为选项列表。"},
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
      title: { en: "Placeholder", zh: "占位内容" },
    },
    {
      id: "with-icons",
      title: { en: "With Icons", zh: "带图标" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
      description: { en: "Use when other UI sets the value or opens the popup.", zh: "适用于选择值或展开状态与其他界面联动的场景。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The popup grows from the trigger's size to its content height over 450ms. With reduced motion it cross-fades at full size.",
    },
    {
      title: "Keyboard",
      body: "Space, Enter and the arrow keys open it, arrows move between options, typing jumps to a match, Enter selects and Escape closes.",
    },
    {
      title: "Related",
      body: "See also [Popover Morph](/docs/popover-morph), [Morphing Modal](/docs/morphing-modal), [Morphing Search](/docs/morphing-search) and [Morphing Tabs](/docs/morphing-tabs).",
    },
  ],
  api: [
    {
      name: "MorphSelect",
      description: "`Select.Root`, re-exported unchanged.",
      extends: "Select.Root",
      extendsHref: `${BASE}#root`,
      props: [],
    },
    {
      name: "MorphSelectTrigger",
      description: "The raised 40px trigger the popup grows out of. Renders a chevron after its children.",
      extends: "Select.Trigger",
      extendsHref: `${BASE}#trigger`,
      props: [],
    },
    {
      name: "MorphSelectValue",
      description: "The selected label, truncated; muted while showing the placeholder.",
      extends: "Select.Value",
      extendsHref: `${BASE}#value`,
      props: [],
    },
    {
      name: "MorphSelectContent",
      description: "Portal, positioner and popup laid over the trigger, with a mirrored header row and a scrollable list (max 18rem).",
      extends: "Select.Popup",
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
      extends: "Select.Item",
      extendsHref: `${BASE}#item`,
      props: [],
      dataAttributes: [
        { name: "data-highlighted", description: "Present on the keyboard or pointer highlighted row." },
        { name: "data-selected", description: "Present on the selected row." },
      ],
    },
    {
      name: "MorphSelectGroup",
      extends: "Select.Group",
      extendsHref: `${BASE}#group`,
      props: [],
    },
    {
      name: "MorphSelectLabel",
      description: "Small muted heading for a group.",
      extends: "Select.GroupLabel",
      extendsHref: `${BASE}#grouplabel`,
      props: [],
    },
    {
      name: "MorphSelectSeparator",
      extends: "Select.Separator",
      extendsHref: `${BASE}#separator`,
      props: [],
    },
  ],
} satisfies ComponentDoc
