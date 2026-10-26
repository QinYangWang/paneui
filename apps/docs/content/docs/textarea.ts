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
      body: { en: "The field uses `field-sizing: content`, so it grows with its text from an 80px minimum in browsers that support it.", zh: "该字段使用 `field-sizing: content`，因此在支持的浏览器中，它会从 80px 最小值开始随文本增长。" },
    },
    {
      title: "Text size on phones",
      body: { en: "Text matches Input on every screen. iOS Safari zooms into a focused field whose text is under 16px; mount [iOS Zoom Lock](/docs/ios-zoom-lock) to stop it, or add `max-md:text-base` for 16px text on phones.", zh: "Text 在所有屏幕上与 Input 匹配。iOS Safari 会放大文本小于 16px 的聚焦字段；挂载 [iOS Zoom Lock](/docs/ios-zoom-lock) 来阻止它，或添加 `max-md:text-base` 使手机上文本为 16px。" },
    },
  ],
  api: [
    {
      name: "Textarea",
      description: { en: "Multi-line text field. It adds no props of its own.", zh: "多行文本字段。它不添加自己的 props。" },
      extends: "textarea",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: { en: "Padding, minimum height (48 / 56 / 64 / 80px) and text size, matching Input. Inside a sized `Field` it takes the field's size.", zh: "内边距、最小高度（48 / 56 / 64 / 80px）和文本大小，与 Input 匹配。在指定大小的 `Field` 内，它采用字段的大小。" } },
      ],
      dataAttributes: [{ name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } }],
    },
  ],
} satisfies ComponentDoc
