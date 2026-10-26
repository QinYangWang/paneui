import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows an action’s progress and result.", "zh": "显示操作的进度与结果。"},
  usage: {
    imports: `import { StatefulButton } from "@/components/ui/button-stateful"`,
    code: `<StatefulButton state={state} onClick={save} successText="Saved">
  Save
</StatefulButton>`,
  },
  examples: [
    {
      id: "states",
      title: { en: "States", zh: "状态" },
      description: { en: "Use for async actions like saving, where the reader needs to see the result.", zh: "适用于保存等需要反馈结果的异步操作。" },
    },
    {
      id: "variants",
      title: { en: "Variants", zh: "样式" },
    },
    {
      id: "no-tint",
      title: { en: "Without Tint", zh: "无色调反馈" },
    },
    {
      id: "sizes",
      title: { en: "Sizes", zh: "尺寸" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: { en: "While `loading` the button is disabled but stays focusable (`focusableWhenDisabled`) and sets `aria-busy`. The current label is announced through a polite live region.", zh: "当 `loading` 时，按钮被禁用但仍可聚焦（`focusableWhenDisabled`）并设置 `aria-busy`。当前标签通过礼貌的实时区域宣布。" },
    },
    {
      title: "Motion",
      body: { en: "With reduced motion the faces cross-fade and the width changes instantly.", zh: "在减少动态效果下，面交叉淡入淡出，宽度立即变化。" },
    },
    {
      title: "Related",
      body: { en: "See also [Button](/docs/button).", zh: "另请参阅 [Button](/docs/button)。" },
    },
  ],
  api: [
    {
      name: "StatefulButton",
      description: { en: "A Button that swaps between idle, loading, success and error faces.", zh: "在空闲、加载、成功和错误面之间切换的 Button。" },
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        {
          name: "state",
          type: `"idle" | "loading" | "success" | "error"`,
          default: `"idle"`,
          description: { en: "Which face the button shows. `idle` shows the children and `icon`; `loading` disables it (it stays focusable).", zh: "按钮显示哪个面。`idle` 显示子元素和 `icon`；`loading` 禁用它（但仍可聚焦）。" },
        },
        { name: "children", type: "ReactNode", required: true, description: { en: "Idle label.", zh: "空闲标签。" } },
        { name: "loadingText", type: "ReactNode", default: `"Working"`, description: { en: "Label while loading, after a spinner.", zh: "加载时的标签，位于加载指示器之后。" } },
        { name: "successText", type: "ReactNode", default: `"Done"`, description: { en: "Label on success, after a check.", zh: "成功时的标签，位于对勾之后。" } },
        { name: "errorText", type: "ReactNode", default: `"Try again"`, description: { en: "Label on error, after a cross.", zh: "错误时的标签，位于叉号之后。" } },
        { name: "icon", type: "ReactNode", description: { en: "Trailing icon shown only while idle.", zh: "仅在空闲时显示的尾随图标。" } },
        {
          name: "tint",
          type: "boolean",
          default: "true",
          description: { en: "Tint the surface green / red on success / error (`default` variant only).", zh: "成功/错误时将表面染成绿色/红色（仅 `default` 变体）。" },
        },
        { name: "variant", type: "Button variant", default: `"default"`, description: { en: "Passed to Button.", zh: "透传给 Button。" } },
      ],
      dataAttributes: [{ name: "data-state", description: { en: "The current `state`.", zh: "当前的 `state`。" } }],
    },
  ],
} satisfies ComponentDoc
