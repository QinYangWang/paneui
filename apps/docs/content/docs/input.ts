import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Single-line text field.", "zh": "输入单行文本。"},
  baseUi: {
    name: "Input",
    href: "https://base-ui.com/react/components/input",
  },
  usage: {
    imports: `import { Input } from "@/components/ui/input"`,
    code: `<Input type="email" placeholder="you@example.com" />`,
  },
  examples: [
    {
      id: "types",
      title: { en: "Types", zh: "类型" },
    },
    {
      id: "file",
      title: { en: "File", zh: "文件" },
    },
    { id: "disabled", title: { en: "Disabled", zh: "禁用" } },
    {
      id: "invalid",
      title: { en: "Invalid", zh: "无效" },
    },
    {
      id: "with-button",
      title: { en: "With Button", zh: "带按钮" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" }, description: { en: "Match the size of the button beside it.", zh: "与相邻按钮使用相同尺寸。" } },
  ],
  notes: [
    {
      title: "Text size on phones",
      body: { en: "Field text matches the control size on every screen (13px at the default size), the same as the button beside it. iOS Safari zooms into a focused field whose text is under 16px. To stop that, mount [iOS Zoom Lock](/docs/ios-zoom-lock) once (recommended, opt-in); or add `max-md:text-base` to a field to give it 16px text on phones.", zh: "字段文本在每个屏幕上与控制尺寸匹配（默认尺寸下为 13px），与其旁边的按钮相同。iOS Safari 会放大聚焦的字段，如果其文本小于 16px。要阻止这一点，请挂载一次 [iOS Zoom Lock](/docs/ios-zoom-lock)（推荐，需选择启用）；或给字段添加 `max-md:text-base` 以在手机上使用 16px 文本。" },
    },
  ],
  api: [
    {
      name: "Input",
      description: { en: "Text field that takes any native `type`. It adds no props of its own.", zh: "接受任何原生 `type` 的文本字段。它不添加自己的 props。" },
      extends: "Input",
      extendsHref: "https://base-ui.com/react/components/input#api-reference",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: { en: "Height 24 / 28 / 32 / 36px, the Button heights. Inside a sized `Field` it takes the field's size.", zh: "高度 24 / 28 / 32 / 36px，即 Button 高度。在有大小的 `Field` 内时采用字段的大小。" } },
        { name: "htmlSize", type: "number", description: { en: "The native `size` attribute (width in characters).", zh: "原生 `size` 属性（以字符为单位的宽度）。" } },
      ],
      dataAttributes: [{ name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } }],
    },
  ],
} satisfies ComponentDoc
