import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "A text field that grows with your writing.", "zh": "输入多行文本并随内容增高。"},
  usage: {
    imports: `import { Textarea } from "@/components/ui/textarea"`,
    code: `<Textarea placeholder="Anything the agent should know?" />`,
  },
  examples: [
    { id: "disabled", title: { en: "Disabled", zh: "禁用" } },
    {
      id: "invalid",
      title: { en: "Invalid", zh: "无效" },
    },
    {
      id: "with-counter",
      title: { en: "With Counter", zh: "带计数" },
    },
    { id: "with-button", title: { en: "With Button", zh: "带按钮" }, description: { en: "Use for short forms that submit straight from the field.", zh: "适用于直接从输入框提交的短表单。" } },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" } },
  ],
  notes: [
    {
      title: "Auto height",
      body: "The field uses `field-sizing: content`, so it grows with its text from an 80px minimum in browsers that support it.",
    },
    {
      title: "Text size on phones",
      body: "Text matches Input on every screen. iOS Safari zooms into a focused field whose text is under 16px; mount [iOS Zoom Lock](/docs/ios-zoom-lock) to stop it, or add `max-md:text-base` for 16px text on phones.",
    },
  ],
  api: [
    {
      name: "Textarea",
      description: "Multi-line text field. It adds no props of its own.",
      extends: "textarea",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Padding, minimum height (48 / 56 / 64 / 80px) and text size, matching Input. Inside a sized `Field` it takes the field's size." },
      ],
      dataAttributes: [{ name: "data-size", description: "The resolved size." }],
    },
  ],
} satisfies ComponentDoc
