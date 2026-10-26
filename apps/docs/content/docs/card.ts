import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Groups related content and actions on one surface.", "zh": "将相关内容与操作放在一起。"},
  usage: {
    imports: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"`,
    code: `<Card>
  <CardHeader>
    <CardTitle>Weekly digest</CardTitle>
    <CardDescription>Every Monday at 9:00.</CardDescription>
  </CardHeader>
  <CardContent>Sales, stock and open tasks.</CardContent>
</Card>`,
  },
  composition: `Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter

Card variant="inset"
├── CardPanel
│   ├── CardHeader
│   └── CardContent
└── CardFooter`,
  examples: [
    { id: "variants", title: { en: "Variants", zh: "样式" },  },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" },  },
    {
      id: "with-form",
      title: { en: "With Form", zh: "带表单" },
    },
    {
      id: "inset-media",
      title: { en: "Inset With Media", zh: "内嵌媒体" },
    },
    {
      id: "link-cards",
      title: { en: "Link Cards", zh: "链接卡片" },
    },
    {
      id: "inset-code",
      title: { en: "Inset With Code", zh: "内嵌代码" },
    },
  ],
  api: [
    {
      name: "Card",
      extends: "div",
      props: [
        {
          name: "size",
          type: `"sm" | "default" | "lg"`,
          default: `"default"`,
          description: { en: "Sets `--card-spacing` (12, 16 or 24px), used by every part for padding and gaps.", zh: "设置 `--card-spacing`（12、16 或 24px），每个部件用于内边距和间隙。" },
        },
        {
          name: "interactive",
          type: "boolean",
          default: "false",
          description: { en: "The whole card is one link or button: the shadow steps up on hover and focus shows the ring.", zh: "整个卡片是一个链接或按钮：悬停时阴影增强，聚焦时显示焦点环。" },
        },
        {
          name: "render",
          type: "React.ReactElement | (props, state) => React.ReactElement",
          description: { en: "Render the card as another element, such as `<a href>` or your router's link.", zh: "将卡片渲染为另一个元素，例如 `<a href>` 或你的路由器链接。" },
        },
        {
          name: "variant",
          type: `"default" | "outline" | "ghost" | "inset"`,
          default: `"default"`,
          description: { en: "`outline` is a 1px border with no fill or shadow, `ghost` has no surface, and `inset` turns the card into a tinted frame (4px padding) that holds a `CardPanel`.", zh: "`outline` 是 1px 边框，无填充或阴影；`ghost` 无表面；`inset` 将卡片变为带色调的框架（4px 内边距），其中包含 `CardPanel`。" },
        },
      ],
      dataAttributes: [
        { name: "data-size", description: { en: "The `size` value.", zh: "`size` 值。" } },
        { name: "data-variant", description: { en: "The `variant` value.", zh: "`variant` 值。" } },
      ],
    },
    {
      name: "CardPanel",
      description: { en: "The raised inner surface of an inset card.", zh: "嵌入卡片凸起的内表面。" },
      extends: "div",
      props: [],
    },
    {
      name: "CardHeader",
      description: { en: "Title, description and an optional `CardAction` in the top-right corner.", zh: "标题、描述和可选的右上角 `CardAction`。" },
      extends: "div",
      props: [],
    },
    { name: "CardTitle", extends: "div", props: [] },
    { name: "CardDescription", extends: "div", props: [] },
    {
      name: "CardAction",
      description: { en: "Placed in the header's right column, spanning the title and description rows.", zh: "放在标题的右列，跨标题和描述行。" },
      extends: "div",
      props: [],
    },
    {
      name: "CardContent",
      extends: "div",
      props: [
        { name: "typeset", type: 'boolean | "docs" | "reading" | "chat"', default: "false", description: { en: "Turn prose styles back on for the content inside a `typeset` container, or name a preset when it stands alone.", zh: "为 `typeset` 容器内的内容重新启用散文样式，或单独使用时指定一个预设。" } },
      ],
    },
    { name: "CardFooter", description: { en: "A row with a 8px gap between items.", zh: "项目之间间隔 8px 的行。" }, extends: "div", props: [] },
  ],
} satisfies ComponentDoc
