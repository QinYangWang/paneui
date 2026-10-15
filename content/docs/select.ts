import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Select",
    href: "https://base-ui.com/react/components/select",
  },
  usage: {
    imports: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`,
    code: `<Select items={fruits} defaultValue="apple">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="pear">Pear</SelectItem>
  </SelectContent>
</Select>`,
  },
  composition: `Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   └── SelectItem
    ├── SelectSeparator
    └── SelectItem`,
  examples: [
    {
      id: "placeholder",
      title: "Placeholder",
      description: "Add an item with `value: null` to `items` and leave the select empty; `SelectValue` shows its label in muted text.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "`SelectTrigger` comes in `sm` (28px) and `default` (32px).",
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Put an icon before the label in `SelectItem`, and pass a function child to `SelectValue` to show it in the trigger too.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disable one option with `disabled` on `SelectItem`, or the whole control with `disabled` on `Select`.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use `value` and `onValueChange` to react to the choice elsewhere in the UI.",
    },
  ],
  notes: [
    {
      title: "Positioning",
      body: "By default the popup opens over the trigger with the selected item aligned to it (`alignItemWithTrigger`), like a native select. Set it to `false` to drop the list below instead.",
    },
    {
      title: "Keyboard",
      body: "`Space`, `Enter` or the arrow keys open the list. Arrow keys move, typing jumps to a matching item, `Enter` selects and `Esc` closes.",
    },
  ],
  api: [
    {
      name: "Select",
      description: "Re-export of the primitive root.",
      extends: "Select.Root",
      extendsHref: "https://base-ui.com/react/components/select#root",
      props: [
        {
          name: "items",
          type: "{ value: any; label: ReactNode }[] | Record<string, ReactNode>",
          description: "Lets `SelectValue` show the label for the current value.",
        },
        { name: "value", type: "any", description: "Controlled value." },
        { name: "defaultValue", type: "any", description: "Initial value when uncontrolled." },
        { name: "onValueChange", type: "(value: any, eventDetails) => void", description: "Called when an item is chosen." },
        { name: "multiple", type: "boolean", default: "false", description: "Allow several values." },
        { name: "disabled", type: "boolean", default: "false", description: "Disable the whole control." },
      ],
    },
    {
      name: "SelectTrigger",
      description: "Raised button with a trailing up/down chevron. Full width with a 10rem minimum.",
      extends: "Select.Trigger",
      extendsHref: "https://base-ui.com/react/components/select#trigger",
      props: [
        { name: "size", type: `"default" | "sm"`, default: `"default"`, description: "Height: 32px or 28px." },
      ],
      dataAttributes: [
        { name: "data-popup-open", description: "Present while the list is open." },
        { name: "data-size", description: "`default` or `sm`." },
      ],
    },
    {
      name: "SelectValue",
      description: "Shows the selected label, truncated.",
      extends: "Select.Value",
      extendsHref: "https://base-ui.com/react/components/select#value",
      props: [
        {
          name: "children",
          type: "ReactNode | (value: any) => ReactNode",
          description: "Custom rendering of the selected value.",
        },
      ],
      dataAttributes: [{ name: "data-placeholder", description: "Present when nothing is selected (muted text)." }],
    },
    {
      name: "SelectContent",
      description: "Portal, positioner, popup and scrollable list with scroll arrows.",
      extends: "Select.Popup",
      extendsHref: "https://base-ui.com/react/components/select#popup",
      props: [
        {
          name: "side",
          type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
          default: `"bottom"`,
          description: "Side to open on when not aligned with the trigger.",
        },
        { name: "sideOffset", type: "number", default: "6", description: "Gap from the trigger in px." },
        { name: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: "Alignment against the trigger." },
        {
          name: "alignItemWithTrigger",
          type: "boolean",
          default: "true",
          description: "Overlay the trigger so the selected item sits on top of it.",
        },
      ],
    },
    {
      name: "SelectItem",
      description: "Option row with a check on the right when selected.",
      extends: "Select.Item",
      extendsHref: "https://base-ui.com/react/components/select#item",
      props: [
        { name: "value", type: "any", description: "Value chosen by this item." },
        { name: "disabled", type: "boolean", default: "false", description: "Dim the item and skip it." },
      ],
      dataAttributes: [
        { name: "data-highlighted", description: "Present on the item under the pointer or keyboard focus." },
        { name: "data-selected", description: "Present on the selected item." },
      ],
    },
    {
      name: "SelectGroup",
      description: "Re-export. Groups items under a `SelectLabel`.",
      extends: "Select.Group",
      extendsHref: "https://base-ui.com/react/components/select#group",
      props: [],
    },
    {
      name: "SelectLabel",
      description: "Small muted heading for a group.",
      extends: "Select.GroupLabel",
      extendsHref: "https://base-ui.com/react/components/select#group-label",
      props: [],
    },
    {
      name: "SelectSeparator",
      extends: "Select.Separator",
      extendsHref: "https://base-ui.com/react/components/select#separator",
      props: [],
    },
  ],
} satisfies ComponentDoc
