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
          description: "Sets `--card-spacing` (12, 16 or 24px), used by every part for padding and gaps.",
        },
        {
          name: "interactive",
          type: "boolean",
          default: "false",
          description: "The whole card is one link or button: the shadow steps up on hover and focus shows the ring.",
        },
        {
          name: "render",
          type: "React.ReactElement | (props, state) => React.ReactElement",
          description: "Render the card as another element, such as `<a href>` or your router's link.",
        },
        {
          name: "variant",
          type: `"default" | "outline" | "ghost" | "inset"`,
          default: `"default"`,
          description: "`outline` is a 1px border with no fill or shadow, `ghost` has no surface, and `inset` turns the card into a tinted frame (4px padding) that holds a `CardPanel`.",
        },
      ],
      dataAttributes: [
        { name: "data-size", description: "The `size` value." },
        { name: "data-variant", description: "The `variant` value." },
      ],
    },
    {
      name: "CardPanel",
      description: "The raised inner surface of an inset card.",
      extends: "div",
      props: [],
    },
    {
      name: "CardHeader",
      description: "Title, description and an optional `CardAction` in the top-right corner.",
      extends: "div",
      props: [],
    },
    { name: "CardTitle", extends: "div", props: [] },
    { name: "CardDescription", extends: "div", props: [] },
    {
      name: "CardAction",
      description: "Placed in the header's right column, spanning the title and description rows.",
      extends: "div",
      props: [],
    },
    {
      name: "CardContent",
      extends: "div",
      props: [
        { name: "typeset", type: 'boolean | "docs" | "reading" | "chat"', default: "false", description: "Turn prose styles back on for the content inside a `typeset` container, or name a preset when it stands alone." },
      ],
    },
    { name: "CardFooter", description: "A row with a 8px gap between items.", extends: "div", props: [] },
  ],
} satisfies ComponentDoc
