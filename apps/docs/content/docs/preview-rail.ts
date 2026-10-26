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
      body: { en: "Each tick is a button (or a link with `href`) named by its `label`; the selected one gets `aria-current`. Keyboard focus drives the same highlight and preview as hover. On touch, the first tap on a link reveals its preview and the second follows it.", zh: "每个刻度是一个按钮（或带 `href` 的链接），由 `label` 命名；选中的会获得 `aria-current`。键盘焦点像悬停一样驱动相同的高亮和预览。在触摸设备上，第一次点击链接会显示预览，第二次才会跟随链接。" },
    },
    {
      title: "Motion",
      body: { en: "Under reduced motion the ticks change without animating and the card only fades.", zh: "启用减少动态效果时，刻度不带动画地切换，卡片仅淡入淡出。" },
    },
  ],
  api: [
    {
      name: "PreviewRail",
      description: { en: "A rail of ticks with a preview card for the pointed or focused item. Children render beside the rail.", zh: "一列刻度及指向或聚焦项的预览卡。子元素渲染在刻度列旁边。" },
      extends: "div",
      props: [
        { name: "items", type: "PreviewRailItem[]", required: true, description: { en: "The destinations, in order.", zh: "目标项，按顺序排列。" } },
        { name: "value", type: "string", description: { en: "Controlled selected id.", zh: "受控的选中 id。" } },
        { name: "defaultValue", type: "string", default: "items[0].id", description: { en: "Initial selection when uncontrolled.", zh: "非受控时的初始选择。" } },
        { name: "onValueChange", type: "(id: string, item: PreviewRailItem) => void", description: { en: "Called when a tick is clicked.", zh: "点击刻度时调用。" } },
        { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: { en: "Rail direction.", zh: "刻度列方向。" } },
        { name: "side", type: `"start" | "end"`, default: `"end"`, description: { en: "Which side of the rail the preview appears on.", zh: "预览出现在刻度列的哪一侧。" } },
        { name: "renderPreview", type: "(item: PreviewRailItem) => ReactNode", description: { en: "Custom preview contents; return `null` to show nothing for an item.", zh: "自定义预览内容；返回 `null` 则该项不显示任何内容。" } },
        { name: "preview", type: "boolean", default: "true", description: { en: "Show the preview card at all (ticks still form the pyramid).", zh: "是否显示预览卡（刻度仍构成金字塔）。" } },
        { name: "showActive", type: "boolean", default: "true", description: { en: "Keep the selected tick tall and tinted while nothing is pointed at.", zh: "在没有指向任何项时，保持选中刻度较高并着色。" } },
        { name: "itemSize", type: "number", default: "22", description: { en: "Pitch between ticks, px.", zh: "刻度之间的间距，单位为 px。" } },
        { name: "tickLength", type: "number", default: "40", description: { en: "Length of a fully grown tick, px.", zh: "完全展开的刻度的长度，单位为 px。" } },
        { name: "label", type: "string", default: `"Sections"`, description: { en: "Accessible name of the nav.", zh: "导航的无障碍名称。" } },
        { name: "railClassName", type: "string", description: { en: "Class for the rail `nav`.", zh: "刻度列 `nav` 的类名。" } },
        { name: "previewClassName", type: "string", description: { en: "Class for the preview card.", zh: "预览卡的类名。" } },
      ],
      dataAttributes: [
        { name: "data-orientation", description: { en: "`vertical` or `horizontal`, on the root.", zh: "根元素上的 `vertical` 或 `horizontal`。" } },
        { name: "data-highlighted", description: { en: "On the tick that is pointed at, focused, or selected at rest.", zh: "当刻度被指向、聚焦或静止时选中时应用。" } },
      ],
    },
    {
      name: "PreviewRailItem",
      description: { en: "Type of each entry in `items`.", zh: "`items` 中每项的类型。" },
      props: [
        { name: "id", type: "string", required: true, description: { en: "Unique id.", zh: "唯一 id。" } },
        { name: "label", type: "string", required: true, description: { en: "Accessible name and preview title.", zh: "供无障碍使用的名称和预览标题。" } },
        { name: "description", type: "ReactNode", description: { en: "Preview body text.", zh: "预览正文文本。" } },
        { name: "icon", type: "ReactNode", description: { en: "Leading icon, shown in an `IconChip` in the default preview.", zh: "前置图标，在默认预览中显示在 `IconChip` 内。" } },
        { name: "href", type: "string", description: { en: "Render the tick as a link.", zh: "将刻度渲染为链接。" } },
        { name: "target", type: "HTMLAttributeAnchorTarget", description: { en: "Link target.", zh: "链接目标。" } },
        { name: "rel", type: "string", description: { en: "Link rel. Defaults to `noreferrer noopener` for `_blank`.", zh: "链接 rel。对于 `_blank` 默认是 `noreferrer noopener`。" } },
        { name: "disabled", type: "boolean", description: { en: "Dim the tick and ignore it.", zh: "使刻度变暗并忽略它。" } },
      ],
    },
  ],
} satisfies ComponentDoc
