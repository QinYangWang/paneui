import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows that something is loading.", "zh": "提示内容正在加载。"},
  usage: {
    imports: `import { Loader } from "@/components/ui/loader"`,
    code: `<Loader variant="dots" />`,
  },
  examples: [
    {
      id: "speed",
      title: { en: "Speed", zh: "速度" },
    },
    {
      id: "colors",
      title: { en: "Colors", zh: "颜色" },
    },
    {
      id: "in-context",
      title: { en: "In Context", zh: "实际场景" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" },  },
  ],
  notes: [
    {
      title: "Accessibility",
      body: { en: "Renders `role=\"status\"` with `aria-label` from `label` (default `\"Loading\"`).", zh: "渲染 `role=\"status\"`，`aria-label` 来自 `label`（默认 `\"Loading\"`）。" },
    },
    {
      title: "Motion",
      body: { en: "Loops are CSS keyframes shipped with the component, so they don't stall on a busy page or restart on re-render. With reduced motion every variant swaps movement, rotation and scale for a soft opacity fade and drops the extra `pulse` and `ripple` rings; `spinner` is opacity-only already.", zh: "循环是随组件提供的 CSS 关键帧，因此它们不会在繁忙的页面上停滞，也不会在重新渲染时重启。在减少动态效果下，每个变体将移动、旋转和缩放替换为柔和的透明度渐变，并去掉额外的 `pulse` 和 `ripple` 环；`spinner` 已经只有透明度。" },
    },
  ],
  api: [
    {
      name: "Loader",
      description: { en: "Loading indicator in eight styles.", zh: "八种样式的加载指示器。" },
      extends: "span",
      props: [
        {
          name: "variant",
          type: `"spinner" | "ring" | "dots" | "bars" | "pulse" | "ripple" | "orbit" | "typing"`,
          default: `"spinner"`,
          description: { en: "Animation style.", zh: "动画样式。" },
        },
        { name: "size", type: `"xs" | "sm" | "md" | "default" | "lg"`, default: `"md"`, description: { en: "12, 16, 24 or 32px; `default` is the same as `md`.", zh: "12、16、24 或 32px；`default` 与 `md` 相同。" } },
        { name: "speed", type: "number", default: "1", description: { en: "Multiplier on animation speed; 2 is twice as fast.", zh: "动画速度的乘数；2 是两倍快。" } },
        { name: "label", type: "string", default: `"Loading"`, description: { en: "Announced to screen readers.", zh: "向屏幕阅读器播报。" } },
      ],
      dataAttributes: [
        { name: "data-variant", description: { en: "The `variant` value.", zh: "`variant` 值。" } },
        { name: "data-size", description: { en: "The `size` value.", zh: "`size` 值。" } },
      ],
    },
  ],
} satisfies ComponentDoc
