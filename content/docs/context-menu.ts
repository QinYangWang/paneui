import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Context Menu",
    href: "https://base-ui.com/react/components/context-menu",
  },
  usage: {
    imports: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"`,
    code: `<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Rename</ContextMenuItem>
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  composition: `ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   └── ContextMenuItem
    │       └── ContextMenuShortcut
    ├── ContextMenuSeparator
    ├── ContextMenuCheckboxItem
    ├── ContextMenuRadioGroup
    │   └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent`,
  examples: [
    {
      id: "basic",
      title: "Basic",
      description: "Items with icons and `ContextMenuShortcut`; `variant=\"destructive\"` tints the last one.",
    },
    {
      id: "checkboxes",
      title: "Checkboxes",
      description: "`ContextMenuCheckboxItem` toggles with `checked` and `onCheckedChange` and keeps the menu open.",
    },
    {
      id: "radio-group",
      title: "Radio Group",
      description: "Wrap `ContextMenuRadioItem`s in a `ContextMenuRadioGroup` with `value` and `onValueChange`.",
    },
    {
      id: "inset",
      title: "Inset",
      description: "`inset` on an item or label indents it to line up with checkbox and radio items.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The menu grows out of the exact point that was clicked. With reduced motion it fades without scaling.",
    },
    {
      title: "Keyboard",
      body: "Opens on right-click or long-press. Arrow keys move between items, Enter selects, Arrow Right opens a submenu and Esc closes.",
    },
    {
      title: "Related",
      body: "The items are shared with [Menu](/docs/menu), so both menus always look the same.",
    },
  ],
  api: [
    {
      name: "ContextMenu",
      extends: "ContextMenu.Root",
      extendsHref: "https://base-ui.com/react/components/context-menu#root",
      props: [],
    },
    {
      name: "ContextMenuTrigger",
      description: "The area that opens the menu. Unstyled apart from disabling text selection and the iOS callout.",
      extends: "ContextMenu.Trigger",
      extendsHref: "https://base-ui.com/react/components/context-menu#trigger",
      props: [],
    },
    {
      name: "ContextMenuContent",
      description: "The popup, already wrapped in a portal and positioner.",
      extends: "ContextMenu.Popup",
      extendsHref: "https://base-ui.com/react/components/context-menu#popup",
      props: [
        {
          name: "side",
          type: `"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"`,
          description: "Side of the pointer it opens on.",
        },
        { name: "sideOffset", type: "number", default: "4", description: "Gap to the pointer in px." },
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Alignment against the pointer." },
        { name: "alignOffset", type: "number", default: "4", description: "Shift along the alignment axis in px." },
      ],
    },
    {
      name: "ContextMenuItem",
      extends: "ContextMenu.Item",
      extendsHref: "https://base-ui.com/react/components/context-menu#item",
      props: [
        {
          name: "variant",
          type: `"default" | "destructive"`,
          default: `"default"`,
          description: "`destructive` tints the text, icon and highlight.",
        },
        { name: "inset", type: "boolean", default: "false", description: "Indent to line up with checkbox and radio items." },
      ],
      dataAttributes: [{ name: "data-highlighted", description: "Present on the item under the pointer or keyboard focus." }],
    },
    {
      name: "ContextMenuCheckboxItem",
      description: "Item with a check mark on the left.",
      extends: "ContextMenu.CheckboxItem",
      extendsHref: "https://base-ui.com/react/components/context-menu#checkboxitem",
      props: [],
    },
    {
      name: "ContextMenuRadioGroup",
      extends: "ContextMenu.RadioGroup",
      extendsHref: "https://base-ui.com/react/components/context-menu#radiogroup",
      props: [],
    },
    {
      name: "ContextMenuRadioItem",
      description: "Item with a primary dot on the left when selected.",
      extends: "ContextMenu.RadioItem",
      extendsHref: "https://base-ui.com/react/components/context-menu#radioitem",
      props: [],
    },
    {
      name: "ContextMenuGroup",
      extends: "ContextMenu.Group",
      extendsHref: "https://base-ui.com/react/components/context-menu#group",
      props: [],
    },
    {
      name: "ContextMenuLabel",
      description: "Small muted heading for a group. Place it inside a `ContextMenuGroup`.",
      extends: "ContextMenu.GroupLabel",
      extendsHref: "https://base-ui.com/react/components/context-menu#grouplabel",
      props: [{ name: "inset", type: "boolean", default: "false", description: "Indent to line up with checkbox and radio items." }],
    },
    {
      name: "ContextMenuSeparator",
      extends: "ContextMenu.Separator",
      extendsHref: "https://base-ui.com/react/components/context-menu#separator",
      props: [],
    },
    {
      name: "ContextMenuShortcut",
      description: "Right-aligned monospace hint, e.g. `⌘D`. Visual only.",
      extends: "span",
      props: [],
    },
    {
      name: "ContextMenuSub",
      extends: "ContextMenu.SubmenuRoot",
      extendsHref: "https://base-ui.com/react/components/context-menu#submenuroot",
      props: [],
    },
    {
      name: "ContextMenuSubTrigger",
      description: "Item with a trailing chevron that opens the submenu.",
      extends: "ContextMenu.SubmenuTrigger",
      extendsHref: "https://base-ui.com/react/components/context-menu#submenutrigger",
      props: [],
      dataAttributes: [{ name: "data-popup-open", description: "Present while its submenu is open." }],
    },
    {
      name: "ContextMenuSubContent",
      description: "The submenu popup. Opens to the right by default; takes the same props as `MenuContent`.",
      extends: "Menu.Popup",
      extendsHref: "https://base-ui.com/react/components/menu#popup",
      props: [],
    },
  ],
} satisfies ComponentDoc
