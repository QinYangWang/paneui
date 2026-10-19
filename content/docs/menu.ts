import type { ComponentDoc } from "@/lib/doc-types"

const positioning = [
  {
    name: "side",
    type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
    default: `"bottom"`,
    description: "Side of the trigger to open on.",
  },
  { name: "sideOffset", type: "number", default: "6", description: "Gap from the trigger in px." },
  { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Alignment against the trigger." },
  { name: "alignOffset", type: "number", default: "0", description: "Shift along the alignment axis in px." },
]

export default {
  summary: {"en": "Dropdown of actions or options opened from a trigger.", "zh": "打开操作或选项菜单。"},
  baseUi: {
    name: "Menu",
    href: "https://base-ui.com/react/components/menu",
  },
  usage: {
    imports: `import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"`,
    code: `<Menu>
  <MenuTrigger render={<Button variant="secondary" />}>Options</MenuTrigger>
  <MenuContent>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem variant="destructive">Delete</MenuItem>
  </MenuContent>
</Menu>`,
  },
  composition: `Menu
├── MenuTrigger
└── MenuContent
    ├── MenuGroup
    │   ├── MenuLabel
    │   └── MenuItem
    │       └── MenuShortcut
    ├── MenuCheckboxItem
    ├── MenuRadioGroup
    │   └── MenuRadioItem
    ├── MenuSeparator
    └── MenuSub
        ├── MenuSubTrigger
        └── MenuSubContent`,
  examples: [
    {
      id: "checkbox-items",
      title: { en: "Checkbox Items", zh: "复选菜单项" },
    },
    {
      id: "radio-items",
      title: { en: "Radio Items", zh: "单选菜单项" },
    },
    {
      id: "disabled-and-destructive",
      title: { en: "Disabled and Destructive", zh: "禁用与危险操作" },
    },
    {
      id: "inset",
      title: { en: "Inset", zh: "内嵌" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Arrow keys move the highlight, `Enter` or `Space` selects, `ArrowRight` opens a submenu and `ArrowLeft` or `Esc` closes it. Typing a letter jumps to the matching item.",
    },
    {
      title: "Motion",
      body: "Popups scale from 95% at the trigger's edge over 200ms. Checkbox and radio indicators pop in with a short scale.",
    },
  ],
  api: [
    {
      name: "Menu",
      description: "Re-export of the primitive root.",
      extends: "Menu.Root",
      extendsHref: "https://base-ui.com/react/components/menu#root",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        {
          name: "onOpenChange",
          type: "(open: boolean, eventDetails) => void",
          description: "Called when the menu opens or closes.",
        },
      ],
    },
    {
      name: "MenuTrigger",
      description: "Re-export. Use `render` to make a Button the trigger.",
      extends: "Menu.Trigger",
      extendsHref: "https://base-ui.com/react/components/menu#trigger",
      props: [],
    },
    {
      name: "MenuContent",
      description: "Portal, positioner and popup in one.",
      extends: "Menu.Popup",
      extendsHref: "https://base-ui.com/react/components/menu#popup",
      props: positioning,
    },
    {
      name: "MenuItem",
      extends: "Menu.Item",
      extendsHref: "https://base-ui.com/react/components/menu#item",
      props: [
        {
          name: "variant",
          type: `"default" | "destructive"`,
          default: `"default"`,
          description: "`destructive` tints the text, icon and highlight red.",
        },
        { name: "inset", type: "boolean", default: "false", description: "Left padding that matches items with an icon." },
        { name: "disabled", type: "boolean", default: "false", description: "Dim the item and skip it." },
        { name: "closeOnClick", type: "boolean", default: "true", description: "Close the menu when the item is chosen." },
      ],
      dataAttributes: [
        { name: "data-highlighted", description: "Present on the item under the pointer or keyboard focus." },
        { name: "data-variant", description: "`default` or `destructive`." },
      ],
    },
    {
      name: "MenuCheckboxItem",
      description: "Item with a check indicator in the left gutter.",
      extends: "Menu.CheckboxItem",
      extendsHref: "https://base-ui.com/react/components/menu#checkbox-item",
      props: [
        { name: "checked", type: "boolean", description: "Controlled checked state." },
        { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, eventDetails) => void",
          description: "Called when toggled.",
        },
        { name: "closeOnClick", type: "boolean", default: "false", description: "Close the menu when toggled." },
      ],
    },
    {
      name: "MenuRadioGroup",
      description: "Re-export. Holds the selected value for its `MenuRadioItem`s.",
      extends: "Menu.RadioGroup",
      extendsHref: "https://base-ui.com/react/components/menu#radio-group",
      props: [
        { name: "value", type: "any", description: "Controlled selected value." },
        { name: "defaultValue", type: "any", description: "Initial value when uncontrolled." },
        { name: "onValueChange", type: "(value: any, eventDetails) => void", description: "Called when the selection changes." },
      ],
    },
    {
      name: "MenuRadioItem",
      description: "Item with a primary dot indicator in the left gutter.",
      extends: "Menu.RadioItem",
      extendsHref: "https://base-ui.com/react/components/menu#radio-item",
      props: [{ name: "value", type: "any", description: "Value selected by this item.", required: true }],
    },
    {
      name: "MenuGroup",
      description: "Re-export. Groups items under a `MenuLabel`.",
      extends: "Menu.Group",
      extendsHref: "https://base-ui.com/react/components/menu#group",
      props: [],
    },
    {
      name: "MenuLabel",
      description: "Small muted heading for a group. Must sit inside a `MenuGroup`.",
      extends: "Menu.GroupLabel",
      extendsHref: "https://base-ui.com/react/components/menu#group-label",
      props: [{ name: "inset", type: "boolean", default: "false", description: "Indent to match inset items." }],
    },
    {
      name: "MenuSeparator",
      extends: "Menu.Separator",
      extendsHref: "https://base-ui.com/react/components/menu#separator",
      props: [],
    },
    {
      name: "MenuShortcut",
      description: "Right-aligned monospace key hint inside an item.",
      extends: "span",
      props: [],
    },
    {
      name: "MenuSub",
      description: "Re-export. Root of a nested menu.",
      extends: "Menu.SubmenuRoot",
      extendsHref: "https://base-ui.com/react/components/menu#submenu-root",
      props: [],
    },
    {
      name: "MenuSubTrigger",
      description: "Item that opens the submenu, with a trailing chevron.",
      extends: "Menu.SubmenuTrigger",
      extendsHref: "https://base-ui.com/react/components/menu#submenu-trigger",
      props: [],
      dataAttributes: [{ name: "data-popup-open", description: "Present while its submenu is open." }],
    },
    {
      name: "MenuSubContent",
      description: "`MenuContent` preset to open on the right, aligned to the trigger item.",
      extends: "MenuContent",
      extendsHref: "#api-menucontent",
      props: [
        { name: "side", type: "same as MenuContent", default: `"right"`, description: "" },
        { name: "sideOffset", type: "number", default: "4", description: "" },
        { name: "alignOffset", type: "number", default: "-6", description: "Lines the first item up with the trigger." },
      ],
    },
  ],
} satisfies ComponentDoc
