import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Toolbar", href: "https://base-ui.com/react/components/toolbar" },
  usage: {
    imports: `import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarToggle } from "@/components/ui/toolbar"`,
    code: `<Toolbar variant="floating" aria-label="Format">
  <ToolbarToggle aria-label="Bold" pressed={bold} onPressedChange={setBold}>
    <BoldIcon />
  </ToolbarToggle>
  <ToolbarSeparator />
  <ToolbarButton aria-label="Link"><LinkIcon /></ToolbarButton>
</Toolbar>`,
  },
  composition: `Toolbar
├── ToolbarGroup
│   ├── ToolbarButton
│   └── ToolbarToggle
├── ToolbarSeparator
├── ToolbarLink
└── ToolbarInput`,
  examples: [
    { id: "document-bar", title: "Document Bar", description: "The default variant inside a card header: undo / redo, a count and labelled actions (`size=\"label\"`)." },
    { id: "inset", title: "Inset", description: "`variant=\"inset\"` puts the items in a well, for a compact control group." },
  ],
  notes: [
    { title: "Keyboard", body: "The toolbar is one tab stop. Arrow keys move between items (looping), `Home` / `End` jump to the ends. Menu and popover triggers join the loop with `render={<ToolbarButton />}`." },
    { title: "Radii", body: "`floating` is `rounded-xl` with `p-1`, so its 28px items take `rounded-inner` (10px). The plain variant falls back to `rounded-lg` items." },
  ],
  api: [
    { name: "Toolbar", extends: "Base UI Toolbar.Root", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [{ name: "variant", type: `"default" | "floating" | "inset"`, default: `"default"`, description: "`floating` is the popover surface for selection bubbles; `inset` sits in a well." }] },
    { name: "ToolbarButton", extends: "Base UI Toolbar.Button", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [{ name: "size", type: `"icon" | "label"`, default: `"icon"`, description: "`icon` is a 28px square; `label` adds padding for text." }], dataAttributes: [{ name: "data-pressed", description: "Set it yourself for a toggled look on a non-toggle (an active link)." }] },
    { name: "ToolbarToggle", description: "A Base UI Toggle inside the toolbar.", extends: "Base UI Toolbar.Button", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [
      { name: "pressed", type: "boolean", description: "Controlled pressed state." },
      { name: "defaultPressed", type: "boolean", description: "Uncontrolled initial state." },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Called when toggled." },
      { name: "size", type: `"icon" | "label"`, default: `"icon"`, description: "As on ToolbarButton." },
    ] },
    { name: "ToolbarSeparator", extends: "Base UI Toolbar.Separator", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [] },
    { name: "ToolbarGroup", extends: "Base UI Toolbar.Group", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [] },
    { name: "ToolbarInput", extends: "Base UI Toolbar.Input", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [] },
    { name: "ToolbarLink", extends: "Base UI Toolbar.Link", extendsHref: "https://base-ui.com/react/components/toolbar#api-reference", props: [] },
  ],
} satisfies ComponentDoc
