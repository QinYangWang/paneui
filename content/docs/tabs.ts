import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Tabs",
    href: "https://base-ui.com/react/components/tabs",
  },
  usage: {
    imports: `import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"`,
    code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTab value="account">Account</TabsTab>
    <TabsTab value="billing">Billing</TabsTab>
  </TabsList>
  <TabsPanel value="account">Your profile and sign-in.</TabsPanel>
  <TabsPanel value="billing">Invoices and payment.</TabsPanel>
</Tabs>`,
  },
  composition: `Tabs
├── TabsList
│   └── TabsTab
└── TabsPanel`,
  examples: [
    {
      id: "controlled",
      title: "Controlled",
      description: "Use when the URL or other UI decides which tab is open.",
    },
    {
      id: "disabled",
      title: "Disabled",
    },
    {
      id: "full-width",
      title: "Full Width",
      description: "Use as a segmented control, with `w-full` on `TabsList` and `flex-1` on each `TabsTab`.",
    },
    {
      id: "vertical",
      title: "Vertical",
      description: "Use for settings pages with many sections.",
    },
    {
      id: "icon-only",
      title: "Icon Only",
      description: "Use in tight toolbars, giving each icon-only tab an `aria-label`.",
    },
    { id: "sizes", title: "Sizes", description: "Match the toolbar the tabs sit in." },
    { id: "underline", title: "Underline", description: "Use for page-level sections, where a filled track would compete with the content." },
  ],
  notes: [
    {
      title: "Motion",
      body: "The indicator slides over 300ms ease-out. Under `prefers-reduced-motion: reduce` it jumps without sliding.",
    },
    {
      title: "Keyboard",
      body: "`ArrowLeft` / `ArrowRight` (or `ArrowUp` / `ArrowDown` when vertical) move focus between tabs (looping), `Home` / `End` jump to the ends, and `Enter` or `Space` activates the focused tab.",
    },
  ],
  api: [
    {
      name: "Tabs",
      description: "Column wrapper with a 12px gap between list and panels; a row when vertical.",
      extends: "Tabs.Root",
      extendsHref: "https://base-ui.com/react/components/tabs#root",
      props: [
        { name: "defaultValue", type: "any", default: "0", description: "Tab selected on first render." },
        { name: "value", type: "any", description: "Controlled selected tab." },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Lays the list out as a row or a column; the indicator and arrow keys follow it.",
        },
        {
          name: "onValueChange",
          type: "(value: any, eventDetails) => void",
          description: "Called when the selected tab changes.",
        },
      ],
    },
    {
      name: "TabsList",
      description: "Segmented track. Renders the sliding indicator after its children.",
      extends: "Tabs.List",
      extendsHref: "https://base-ui.com/react/components/tabs#list",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Height 24 / 28 / 32 / 36px for the list, the Button heights. Applies to every tab." },
        { name: "variant", type: `"default" | "underline"`, default: `"default"`, description: "`default` is a raised indicator on a well; `underline` is a 2px bar on a hairline." },
        {
          name: "activateOnFocus",
          type: "boolean",
          default: "false",
          description: "Select a tab as soon as it receives keyboard focus.",
        },
        { name: "loopFocus", type: "boolean", default: "true", description: "Wrap arrow-key focus at the ends." },
      ],
      dataAttributes: [{ name: "data-size", description: "The `size` value." }, { name: "data-variant", description: "The `variant` value." }],
    },
    {
      name: "TabsTab",
      description: "Sizes its icons to 16px.",
      extends: "Tabs.Tab",
      extendsHref: "https://base-ui.com/react/components/tabs#tab",
      props: [
        { name: "value", type: "any", description: "Matches the `TabsPanel` it shows.", required: true },
        { name: "disabled", type: "boolean", default: "false", description: "Dim the tab, block selection and skip it in the keyboard order." },
      ],
      dataAttributes: [
        { name: "data-active", description: "Present on the selected tab." },
        { name: "data-disabled", description: "Present when disabled." },
        { name: "data-orientation", description: "`horizontal` or `vertical`, from the root." },
      ],
    },
    {
      name: "TabsPanel",
      extends: "Tabs.Panel",
      extendsHref: "https://base-ui.com/react/components/tabs#panel",
      props: [
        { name: "value", type: "any", description: "The `TabsTab` value that shows this panel.", required: true },
        { name: "keepMounted", type: "boolean", default: "false", description: "Keep the panel in the DOM while hidden." },
      ],
    },
  ],
} satisfies ComponentDoc
