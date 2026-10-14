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
      description: "Drive the selected tab with `value` and `onValueChange`.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Pass `disabled` to a `TabsTab` to skip it in the keyboard order and dim it.",
    },
    {
      id: "full-width",
      title: "Full Width",
      description: "Give `TabsList` `w-full` and each `TabsTab` `flex-1` for an even segmented control.",
    },
    {
      id: "icon-only",
      title: "Icon Only",
      description: "Tabs size their icons to 16px; give icon-only tabs an `aria-label`.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "A raised indicator slides between tabs (300ms ease-out) using the positions Base UI measures. The indicator is laid out for horizontal tab lists only.",
    },
    {
      title: "Keyboard",
      body: "`ArrowLeft` / `ArrowRight` move focus between tabs (looping), `Home` / `End` jump to the ends, and `Enter` or `Space` activates the focused tab.",
    },
  ],
  api: [
    {
      name: "Tabs",
      description: "Column wrapper with a 12px gap between list and panels.",
      extends: "Base UI Tabs.Root",
      extendsHref: "https://base-ui.com/react/components/tabs#root",
      props: [
        { name: "defaultValue", type: "any", default: "0", description: "Tab selected on first render." },
        { name: "value", type: "any", description: "Controlled selected tab." },
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
      extends: "Base UI Tabs.List",
      extendsHref: "https://base-ui.com/react/components/tabs#list",
      props: [
        {
          name: "activateOnFocus",
          type: "boolean",
          default: "false",
          description: "Select a tab as soon as it receives keyboard focus.",
        },
        { name: "loopFocus", type: "boolean", default: "true", description: "Wrap arrow-key focus at the ends." },
      ],
    },
    {
      name: "TabsTab",
      extends: "Base UI Tabs.Tab",
      extendsHref: "https://base-ui.com/react/components/tabs#tab",
      props: [
        { name: "value", type: "any", description: "Matches the `TabsPanel` it shows.", required: true },
        { name: "disabled", type: "boolean", default: "false", description: "Dim the tab and block selection." },
      ],
      dataAttributes: [
        { name: "data-active", description: "Present on the selected tab (foreground text)." },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
    {
      name: "TabsPanel",
      extends: "Base UI Tabs.Panel",
      extendsHref: "https://base-ui.com/react/components/tabs#panel",
      props: [
        { name: "value", type: "any", description: "The `TabsTab` value that shows this panel.", required: true },
        { name: "keepMounted", type: "boolean", default: "false", description: "Keep the panel in the DOM while hidden." },
      ],
    },
  ],
} satisfies ComponentDoc
