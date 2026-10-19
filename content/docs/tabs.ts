import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Switches between related panels of content in one place.", "zh": "在相关内容面板间切换。"},
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
      title: { en: "Controlled", zh: "受控" },
      description: { en: "Use when the URL or other UI decides which tab is open.", zh: "适用于标签页由网址或其他控件决定的场景。" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    {
      id: "full-width",
      title: { en: "Full Width", zh: "全宽" },
    },
    {
      id: "vertical",
      title: { en: "Vertical", zh: "纵向" },
      description: { en: "Use for settings pages with many sections.", zh: "适用于包含多个分区的设置页。" },
    },
    {
      id: "icon-only",
      title: { en: "Icon Only", zh: "仅图标" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" }, description: { en: "Match the toolbar the tabs sit in.", zh: "与所在工具栏的样式保持一致。" } },
    { id: "underline", title: { en: "Underline", zh: "下划线" }, description: { en: "Use for page-level sections, where a filled track would compete with the content.", zh: "适用于页面级分区。" } },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
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
        { name: "typeset", type: 'boolean | "docs" | "reading" | "chat"', default: "false", description: "Turn prose styles back on for the panel content inside a `typeset` container, or name a preset when it stands alone." },
      ],
    },
  ],
} satisfies ComponentDoc
