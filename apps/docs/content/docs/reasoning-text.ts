import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Status line that shows an agent is still working.", "zh": "提示助手仍在处理。"},
  usage: {
    imports: `import { ReasoningText } from "@/components/ui/reasoning-text"`,
    code: `<ReasoningText phrases={["Thinking", "Reading the docs", "Drafting a reply"]} />`,
  },
  examples: [
    {
      id: "spinners",
      title: { en: "Spinners", zh: "加载图标" },
      description: { en: "Use to match the spinner to the tone of your interface.", zh: "让加载图标与界面风格保持一致。" },
    },
    {
      id: "controlled",
      title: { en: "Controlled Index", zh: "受控索引" },
      description: { en: "Use when you know the agent's real current step; it then stops cycling on its own.", zh: "适用于已知助手当前工作步骤的场景。" },
    },
    {
      id: "custom-indicator",
      title: { en: "Custom Indicator", zh: "自定义指示器" },
      description: { en: "Use when your product already has its own loading mark.", zh: "适用于产品已有加载标志的场景。" },
    },
    {
      id: "no-ellipsis",
      title: { en: "Without Ellipsis", zh: "无省略号" },
      description: { en: "Use when your phrases carry their own punctuation.", zh: "适用于文本自带标点的场景。" },
    },
    {
      id: "ascii-spinner",
      title: { en: "ASCII Spinner", zh: "字符加载图标" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Under reduced motion the swap mode cross-fades instead of blurring and rolling, the cascade mask stops sweeping, and `AsciiSpinner` holds its first frame with a soft pulse.", zh: "开启减少动态效果时，交换模式改为交叉淡入淡出而非模糊滚动，级联遮罩停止扫过，`AsciiSpinner` 停在第一帧并轻柔脉动。" },
    },
    {
      title: "Accessibility",
      body: { en: "The line is a polite `role=\"status\"` region. The current phrase is read from a screen-reader-only copy; the animated text and the spinner are `aria-hidden`.", zh: "该行是一个 polite 的 `role=\"status\"` 区域。当前短语由仅屏幕阅读器可见的副本朗读；动画文本和加载指示器为 `aria-hidden`。" },
    },
  ],
  api: [
    {
      name: "ReasoningText",
      description: { en: "A spinner plus a shimmering phrase that cycles while the agent works.", zh: "加载指示器加上一条闪烁的短语，在智能体工作时循环。" },
      extends: "span",
      props: [
        {
          name: "phrases",
          type: "string[]",
          default: `["Thinking", "Reading the context", "Weighing the options", "Drafting a reply"]`,
          description: { en: "Phrases cycled while the agent works. A single phrase never changes.", zh: "智能体工作时循环的短语。单个短语不会变化。" },
        },
        { name: "mode", type: `"swap" | "cascade" | "scramble"`, default: `"swap"`, description: { en: "Transition between phrases. `swap` blurs and rolls, `cascade` rolls letter by letter, `scramble` scrambles the letters.", zh: "短语之间的过渡。`swap` 模糊并滚动，`cascade` 逐字母滚动，`scramble` 打乱字母。" } },
        { name: "interval", type: "number", default: "2400", description: { en: "Milliseconds each phrase stays up.", zh: "每条短语停留的毫秒数。" } },
        { name: "index", type: "number", description: { en: "Controlled phrase index; when set, the component stops cycling on its own.", zh: "受控的短语索引；设置后组件停止自行循环。" } },
        { name: "shimmerDuration", type: "number", default: "1.8", description: { en: "Seconds per shimmer sweep.", zh: "每次闪烁扫过的秒数。" } },
        { name: "indicator", type: "ReactNode", description: { en: "Leading glyph. Defaults to an `AsciiSpinner`; pass `null` to hide.", zh: "前置字形。默认为 `AsciiSpinner`；传入 `null` 隐藏。" } },
        { name: "spinner", type: `"braille" | "dots" | "line" | "star"`, default: `"braille"`, description: { en: "Frame set used by the default indicator.", zh: "默认指示器使用的帧集。" } },
        { name: "ellipsis", type: "boolean", default: "true", description: { en: "Append an ellipsis to every phrase.", zh: "为每条短语追加省略号。" } },
      ],
      dataAttributes: [{ name: "data-mode", description: { en: "The current `mode`.", zh: "当前的 `mode`。" } }],
    },
    {
      name: "AsciiSpinner",
      description: { en: "A decorative monospace glyph that ticks through terminal spinner frames.", zh: "一个装饰性的等宽字形，逐帧显示终端加载动画。" },
      extends: "span",
      props: [
        { name: "kind", type: `"braille" | "dots" | "line" | "star"`, default: `"braille"`, description: { en: "Which frame set to cycle.", zh: "循环哪一组帧集。" } },
        { name: "interval", type: "number", default: "80", description: { en: "Milliseconds per frame.", zh: "每帧的毫秒数。" } },
      ],
    },
  ],
} satisfies ComponentDoc
