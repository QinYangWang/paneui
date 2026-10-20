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
      body: "Field text matches the control size on every screen (13px at the default size), the same as the button beside it. iOS Safari zooms into a focused field whose text is under 16px. To stop that, mount [iOS Zoom Lock](/docs/ios-zoom-lock) once (recommended, opt-in); or add `max-md:text-base` to a field to give it 16px text on phones.",
    },
  ],
  api: [
    {
      name: "Input",
      description: "Text field that takes any native `type`. It adds no props of its own.",
      extends: "Input",
      extendsHref: "https://base-ui.com/react/components/input#api-reference",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Height 24 / 28 / 32 / 36px, the Button heights. Inside a sized `Field` it takes the field's size." },
        { name: "htmlSize", type: "number", description: "The native `size` attribute (width in characters)." },
      ],
      dataAttributes: [{ name: "data-size", description: "The resolved size." }],
    },
  ],
} satisfies ComponentDoc
