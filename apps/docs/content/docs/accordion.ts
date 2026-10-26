import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Opens sections of content on demand.", "zh": "按需展开内容分节。"},
  baseUi: {
    name: "Accordion",
    href: "https://base-ui.com/react/components/accordion",
  },
  usage: {
    imports: `import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion"`,
    code: `<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionPanel>Yes. It follows the WAI-ARIA accordion pattern.</AccordionPanel>
  </AccordionItem>
</Accordion>`,
  },
  composition: `Accordion
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionPanel`,
  examples: [
    {
      id: "basic",
      title: { en: "Basic", zh: "基础" },
      description: { en: "Use for FAQs and settings where one open answer at a time is enough.", zh: "适用于每次只需查看一条答案的常见问题或设置。" },
    },
    {
      id: "multiple",
      title: { en: "Multiple", zh: "多项展开" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    {
      id: "with-icons",
      title: { en: "With icons", zh: "带图标" },
      description: { en: "Use icons when readers scan the list by topic.", zh: "适用于按主题快速查找条目的列表。" },
    },
    {
      id: "ghost",
      title: { en: "Borderless", zh: "无边框" },
      description: { en: "Use the borderless variant inside cards or panels that already have a frame.", zh: "适用于已有外框的卡片或面板。" },
    },
    {
      id: "ghost-multiple",
      title: { en: "Borderless, multiple", zh: "无边框，多项展开" },
    },
    {
      id: "ghost-disabled",
      title: { en: "Borderless, disabled", zh: "无边框，禁用" },
    },
    {
      id: "ghost-with-icons",
      title: { en: "Borderless, with icons", zh: "无边框，带图标" },
      description: { en: "Use one icon family (solid) per list so the bare glyphs line up.", zh: "同一列表使用同一图标风格。" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The panel height springs open (about 8% overshoot) and eases shut without bounce. With reduced motion the panel opens instantly.", zh: "面板高度弹开（约 8% 过冲），关闭时缓动收合、无回弹。启用减少动态效果时，面板立即展开。" },
    },
  ],
  api: [
    {
      name: "Accordion",
      description: { en: "The container. Single-open by default.", zh: "容器。默认一次只展开一项。" },
      extends: "Accordion.Root",
      extendsHref: "https://base-ui.com/react/components/accordion#root",
      props: [
        {
          name: "variant",
          type: `"default" | "ghost"`,
          default: `"default"`,
          description:
            { en: "`default` is an inset well of raised rows; `ghost` is borderless, with spacing between items and rows that fill on hover.", zh: "`default` 是凸起行组成的内嵌凹槽；`ghost` 无边框，项与项之间留间距，行在悬停时填充。" },
        },
        {
          name: "defaultValue",
          type: "any[]",
          description: { en: "Values of the items open on first render.", zh: "首次渲染时展开项的值。" },
        },
        { name: "value", type: "any[]", description: { en: "Controlled open items.", zh: "受控的展开项。" } },
        {
          name: "onValueChange",
          type: "(value: any[]) => void",
          description: { en: "Called when items open or close.", zh: "项展开或关闭时调用。" },
        },
        {
          name: "multiple",
          type: "boolean",
          default: "false",
          description: { en: "Allow more than one open item.", zh: "允许同时展开多项。" },
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: { en: "Disable every item.", zh: "禁用所有项。" },
        },
      ],
    },
    {
      name: "AccordionItem",
      extends: "Accordion.Item",
      extendsHref: "https://base-ui.com/react/components/accordion#item",
      props: [
        {
          name: "value",
          type: "any",
          description: { en: "Identifies the item in `value` / `defaultValue`.", zh: "在 `value` / `defaultValue` 中标识该项。" },
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: { en: "Disable this item.", zh: "禁用该项。" },
        },
      ],
      dataAttributes: [
        {
          name: "data-open",
          description: { en: "Present while the item is open (raised card in `default`, soft fill in `ghost`).", zh: "项展开时呈现（`default` 中为凸起卡片，`ghost` 中为柔和填充）。" },
        },
      ],
    },
    {
      name: "AccordionTrigger",
      extends: "Accordion.Trigger",
      extendsHref: "https://base-ui.com/react/components/accordion#trigger",
      props: [
        {
          name: "icon",
          type: "ReactNode",
          description:
            { en: "Leading icon. In `default` it sits in a round chip that turns primary when open; in `ghost` it is bare at 16px and muted until open. The panel text lines up with the label.", zh: "前置图标。在 `default` 中，它位于圆形底片中，展开时变为主题色；在 `ghost` 中，它是裸露的 16px 图标，展开前呈弱化色。面板文字与标签对齐。" },
        },
      ],
    },
    {
      name: "AccordionPanel",
      extends: "Accordion.Panel",
      extendsHref: "https://base-ui.com/react/components/accordion#panel",
      props: [
        {
          name: "keepMounted",
          type: "boolean",
          default: "false",
          description: { en: "Keep the content in the DOM while closed.", zh: "关闭时仍将内容保留在 DOM 中。" },
        },
        { name: "typeset", type: 'boolean | "docs" | "reading" | "chat"', default: "false", description: { en: "Turn prose styles back on for the panel content inside a `typeset` container, or name a preset when it stands alone. The content then keeps the surrounding text size and colour.", zh: "在 `typeset` 容器内为面板内容重新启用正文样式，或在该组件独立使用时指定预设。内容随后保持周围文本的字号和颜色。" } },
      ],
    },
  ],
} satisfies ComponentDoc
