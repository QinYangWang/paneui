import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Toggles a single option on or off.", "zh": "开启或关闭单个选项。"},
  baseUi: {
    name: "Checkbox",
    href: "https://base-ui.com/react/components/checkbox",
  },
  usage: {
    imports: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"`,
    code: `<Label>
  <Checkbox defaultChecked />
  Remember me
</Label>`,
  },
  examples: [
    {
      id: "with-description",
      title: { en: "With Description", zh: "带说明" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    {
      id: "task-list",
      title: { en: "Task List", zh: "任务列表" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" },  },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Presses squish to 86% on an overshoot curve. With reduced motion the transitions and the squish are off.", zh: "按下时以过冲曲线压缩到 86%。减少动态效果时关闭过渡和压缩。" },
    },
    {
      title: "Keyboard",
      body: { en: "Tab to focus and Space to toggle.", zh: "Tab 聚焦，Space 切换。" },
    },
  ],
  api: [
    {
      name: "Checkbox",
      description: { en: "An 18px box in an inset well. It adds no props of its own.", zh: "内嵌凹槽中的 18px 方框。它自身不接受 props。" },
      extends: "Checkbox.Root",
      extendsHref: "https://base-ui.com/react/components/checkbox#root",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: { en: "Box 14 / 16 / 20px. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`).", zh: "方框 14 / 16 / 20px。在设置了尺寸的 `Field` 内，它采用该字段的尺寸（`xs` 映射为 `sm`）。" } },
        { name: "checked", type: "boolean", description: { en: "Controlled checked state.", zh: "受控的选中状态。" } },
        { name: "defaultChecked", type: "boolean", default: "false", description: { en: "Checked state on first render.", zh: "首次渲染时的选中状态。" } },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, details) => void",
          description: { en: "Called when the box is toggled.", zh: "方框被切换时调用。" },
        },
        {
          name: "indeterminate",
          type: "boolean",
          default: "false",
          description: { en: "Shows a dash instead of the check, e.g. for a partly selected parent.", zh: "显示短横线而不是对勾，例如用于部分选中的父项。" },
        },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Dims the box and blocks interaction.", zh: "使方框变暗并阻止交互。" } },
      ],
      dataAttributes: [
        { name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } },
        { name: "data-checked", description: { en: "Present when checked (primary fill).", zh: "选中时存在（主色填充）。" } },
        { name: "data-indeterminate", description: { en: "Present when indeterminate.", zh: "不确定状态时存在。" } },
        { name: "data-disabled", description: { en: "Present when disabled.", zh: "禁用时存在。" } },
        { name: "data-invalid", description: { en: "Present when invalid inside a Field (destructive ring).", zh: "在 Field 内无效时呈现（破坏性焦点环）。" } },
      ],
    },
  ],
} satisfies ComponentDoc
