import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { TabBar, TabBarItem } from "@/components/ui/tab-bar"`,
    code: `<TabBar aria-label="App" className="fixed inset-x-0 bottom-0">
  <TabBarItem icon={<HomeIcon />} activeIcon={<HomeFilledIcon />} label="Home" active />
  <TabBarItem icon={<ChatIcon />} activeIcon={<ChatFilledIcon />} label="Chats" badge={3} />
  <TabBarItem icon={<SettingsIcon />} activeIcon={<SettingsFilledIcon />} label="Settings" />
</TabBar>`,
  },
  composition: `TabBar
└── TabBarItem`,
  examples: [{ id: "links", title: "Links", description: "Use with your router: pass its link to `render`." }],
  notes: [
    { title: "Phones", body: "The bar adds the bottom safe-area inset as padding, so it can sit flush with the screen edge; add `viewport-fit=cover` to the viewport meta tag for the inset to apply. Labels show under each icon, so there are no tooltips." },
    { title: "Active glyph", body: "The bar has no row fill, so the active item swaps to the filled glyph as well as the foreground colour. Every nav icon has a `<Name>FilledIcon` pair." },
    { title: "Wider screens", body: "Swap to `IconRail` from `md` up, where a column of icons with tooltips fits better." },
    { title: "Accessibility", body: "The active item gets `aria-current=\"page\"`. The keyboard focus ring draws around the icon pill, so it never clashes with rounded screen corners. Give the `TabBar` an `aria-label` when the page has more than one navigation region." },
  ],
  api: [
    { name: "TabBar", extends: "nav", props: [] },
    {
      name: "TabBarItem",
      extends: "button (useRender)",
      props: [
        { name: "icon", type: "ReactNode", required: true, description: "Outline icon, drawn at 20px." },
        { name: "activeIcon", type: "ReactNode", description: "Filled glyph shown while active, such as `HomeFilledIcon` for `HomeIcon`." },
        { name: "label", type: "ReactNode", required: true, description: "Text under the icon; also the accessible name." },
        { name: "active", type: "boolean", default: "false", description: "Current destination: foreground colour and `aria-current`." },
        { name: "badge", type: "number | boolean", description: "A count (capped at 99+) or an attention dot (`true`)." },
        { name: "render", type: "ReactElement", description: "Render as another element, such as a router link." },
      ],
      dataAttributes: [{ name: "data-active", description: "Present on the active item." }],
    },
  ],
} satisfies ComponentDoc
