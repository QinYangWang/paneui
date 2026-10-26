import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows how long an agent has been working.", "zh": "显示助手的运行时间。"},
  usage: {
    imports: `import { AgentProgress } from "@/components/ui/agent-progress"`,
    code: `<AgentProgress label="Searching" />`,
  },
  examples: [
    {
      id: "with-meta",
      title: { en: "With Meta", zh: "附加信息" },
    },
    {
      id: "controlled",
      title: { en: "Controlled Elapsed", zh: "受控计时" },
    },
    {
      id: "stopped",
      title: { en: "Stopped", zh: "已停止" },
    },
    {
      id: "formats",
      title: { en: "Timer Formats", zh: "计时格式" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Under reduced motion the 3×3 glyph stops scaling and only fades its opacity while running.", zh: "在减少动态效果下，3×3 字形停止缩放，运行时仅淡入淡出透明度。" },
    },
    {
      title: "Accessibility",
      body: { en: "The readout is `role=\"status\"` with an `aria-label` of the `label` plus \", in progress\" while running; the ticking timer is hidden from screen readers.", zh: "读数是带有 `label` 加 \", in progress\" 的 `aria-label` 的 `role=\"status\"`；运行中，跳动的计时器对屏幕阅读器隐藏。" },
    },
  ],
  api: [
    {
      name: "AgentProgress",
      description: { en: "Working readout with an activity glyph, an action verb and a live timer.", zh: "带有活动字形、动作动词和实时计时器的工作读数。" },
      extends: "span",
      props: [
        { name: "label", type: "string", default: `"Working"`, description: { en: "Verb for what the agent is doing.", zh: "表示 agent 正在做什么的动词。" } },
        { name: "elapsed", type: "number", description: { en: "Controlled elapsed time in seconds. When set, the internal clock is ignored.", zh: "受控的已用时间，以秒为单位。设置后忽略内部时钟。" } },
        { name: "initialElapsed", type: "number", default: "0", description: { en: "Where the internal clock starts, in seconds.", zh: "内部时钟的起始值，以秒为单位。" } },
        { name: "running", type: "boolean", default: "true", description: { en: "Whether the internal clock runs. When `false` the glyph rests and the timer freezes.", zh: "内部时钟是否运行。当为 `false` 时，字形静止，计时器冻结。" } },
        { name: "meta", type: "ReactNode", description: { en: "Optional trailing detail, e.g. a token count.", zh: "可选的尾部细节，例如 token 数量。" } },
      ],
      dataAttributes: [{ name: "data-running", description: { en: "Present while `running` is `true`.", zh: "当 `running` 为 `true` 时显示。" } }],
    },
    {
      name: "formatElapsed",
      description: { en: "The formatter behind the timer, `(seconds: number) => string`. It shows tenths under a minute, minutes and seconds under an hour, then hours and minutes, e.g. `8.4s`, `1m 23s`, `1h 05m`.", zh: "计时器背后的格式化函数，`(seconds: number) => string`。它在不到一分钟时显示十分之一秒，不到一小时时显示分和秒，之后显示小时和分钟，例如 `8.4s`、`1m 23s`、`1h 05m`。" },
      props: [{ name: "total", type: "number", required: true, description: { en: "Elapsed seconds; negatives clamp to 0.", zh: "已用秒数；负值会被限制为 0。" } }],
    },
  ],
} satisfies ComponentDoc
