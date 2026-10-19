import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Compact section navigation that previews each destination.", "zh": "在导航中预览目标内容。"},
  usage: {
    imports: `import { PreviewRail } from "@/components/ui/preview-rail"`,
    code: `<PreviewRail
  items={[
    { id: "intro", label: "Introduction", description: "What it is and who it is for." },
    { id: "install", label: "Installation" },
  ]}
  label="On this page"
/>`,
  },
  examples: [
    {
      id: "horizontal",
      title: { en: "Horizontal", zh: "横向" },
    },
    {
      id: "render-preview",
      title: { en: "Icons and Custom Preview", zh: "图标与自定义预览" },
      description: { en: "Use when the preview needs icons or your own contents.", zh: "适用于需要自定义预览内容的导航。" },
    },
    {
      id: "side-start",
      title: { en: "Compact, Preview on Start", zh: "紧凑，起始侧预览" },
      description: { en: "Use when the rail sits on the right edge and space is tight.", zh: "适用于靠近右侧边缘的紧凑导航。" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "Each tick is a button (or a link with `href`) named by its `label`; the selected one gets `aria-current`. Keyboard focus drives the same highlight and preview as hover. On touch, the first tap on a link reveals its preview and the second follows it.",
    },
    {
      title: "Motion",
      body: "Under reduced motion the ticks change without animating and the card only fades.",
    },
  ],
  api: [
    {
      name: "PreviewRail",
      description: "A rail of ticks with a preview card for the pointed or focused item. Children render beside the rail.",
      extends: "div",
      props: [
        { name: "items", type: "PreviewRailItem[]", required: true, description: "The destinations, in order." },
        { name: "value", type: "string", description: "Controlled selected id." },
        { name: "defaultValue", type: "string", default: "items[0].id", description: "Initial selection when uncontrolled." },
        { name: "onValueChange", type: "(id: string, item: PreviewRailItem) => void", description: "Called when a tick is clicked." },
        { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: "Rail direction." },
        { name: "side", type: `"start" | "end"`, default: `"end"`, description: "Which side of the rail the preview appears on." },
        { name: "renderPreview", type: "(item: PreviewRailItem) => ReactNode", description: "Custom preview contents; return `null` to show nothing for an item." },
        { name: "preview", type: "boolean", default: "true", description: "Show the preview card at all (ticks still form the pyramid)." },
        { name: "showActive", type: "boolean", default: "true", description: "Keep the selected tick tall and tinted while nothing is pointed at." },
        { name: "itemSize", type: "number", default: "22", description: "Pitch between ticks, px." },
        { name: "tickLength", type: "number", default: "40", description: "Length of a fully grown tick, px." },
        { name: "label", type: "string", default: `"Sections"`, description: "Accessible name of the nav." },
        { name: "railClassName", type: "string", description: "Class for the rail `nav`." },
        { name: "previewClassName", type: "string", description: "Class for the preview card." },
      ],
      dataAttributes: [
        { name: "data-orientation", description: "`vertical` or `horizontal`, on the root." },
        { name: "data-highlighted", description: "On the tick that is pointed at, focused, or selected at rest." },
      ],
    },
    {
      name: "PreviewRailItem",
      description: "Type of each entry in `items`.",
      props: [
        { name: "id", type: "string", required: true, description: "Unique id." },
        { name: "label", type: "string", required: true, description: "Accessible name and preview title." },
        { name: "description", type: "ReactNode", description: "Preview body text." },
        { name: "icon", type: "ReactNode", description: "Leading icon, shown in an `IconChip` in the default preview." },
        { name: "href", type: "string", description: "Render the tick as a link." },
        { name: "target", type: "HTMLAttributeAnchorTarget", description: "Link target." },
        { name: "rel", type: "string", description: "Link rel. Defaults to `noreferrer noopener` for `_blank`." },
        { name: "disabled", type: "boolean", description: "Dim the tick and ignore it." },
      ],
    },
  ],
} satisfies ComponentDoc
