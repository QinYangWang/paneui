import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Holds one chat message in a speech bubble.", "zh": "显示一条聊天消息。"},
  usage: {
    imports: `import { MessageBubble, MessageBubbleGroup } from "@/components/ui/message-bubble"`,
    code: `<MessageBubbleGroup align="end">
  <MessageBubble tone="primary">Can we push the review to Friday?</MessageBubble>
</MessageBubbleGroup>`,
  },
  composition: `MessageBubbleGroup
└── MessageBubble
    └── MessageBubbleCollapsible`,
  examples: [
    {
      id: "tones",
      title: { en: "Tones", zh: "色调" },
    },
    {
      id: "sizes",
      title: { en: "Sizes", zh: "尺寸" },
    },
    {
      id: "align-and-tail",
      title: { en: "Alignment and Tail", zh: "对齐与尾角" },
    },
    {
      id: "grouped",
      title: { en: "Grouped", zh: "分组" },
    },
    {
      id: "interactive",
      title: { en: "Interactive", zh: "可交互" },
    },
    {
      id: "collapsible",
      title: { en: "Collapsible", zh: "可收起" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The collapsible's height transition is removed under reduced motion; interactive bubbles press to `scale-98`.", zh: "减少动态效果时移除折叠面板的高度过渡；交互式气泡按下时缩放到 `scale-98`。" },
    },
    {
      title: "Accessibility",
      body: { en: "The Show more toggle is a real `<button>` with `aria-expanded` and `aria-controls` pointing at the clipped region. It only appears when the content overflows.", zh: "Show more 切换按钮是真正的 `<button>`，带有 `aria-expanded` 和指向裁剪区域的 `aria-controls`。仅在内容溢出时出现。" },
    },
  ],
  api: [
    {
      name: "MessageBubble",
      description: { en: "A single conversational surface.", zh: "单个对话表面。" },
      extends: "div (useRender)",
      extendsHref: "https://base-ui.com/react/utils/use-render",
      props: [
        {
          name: "tone",
          type: `"default" | "primary" | "muted" | "outline" | "destructive" | "ghost"`,
          default: `"default"`,
          description: { en: "`primary` for the sender, `default` for replies, `muted` for system, `outline` for quiet, `destructive` for errors and `ghost` for unframed messages.", zh: "发送方用 `primary`，回复用 `default`，系统用 `muted`，弱化用 `outline`，错误用 `destructive`，无框消息用 `ghost`。" },
        },
        { name: "size", type: `"default" | "sm"`, default: `"default"`, description: { en: "Padding, radius and text size.", zh: "内边距、圆角与文字大小。" } },
        { name: "align", type: `"start" | "end"`, description: { en: "Side the bubble hugs. Inherited from `Message` / `MessageBubbleGroup` when omitted, else `start`.", zh: "气泡贴靠的一侧。省略时从 `Message` / `MessageBubbleGroup` 继承，否则为 `start`。" } },
        { name: "tail", type: "boolean", default: "true", description: { en: "Tighten the bottom corner toward the sender. Ignored for `ghost`.", zh: "收紧朝向发送方的底角。对 `ghost` 无效。" } },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: { en: "Render as another element, e.g. `<a />` or `<button />`; the bubble becomes pressable.", zh: "渲染为其他元素，如 `<a />` 或 `<button />`；气泡变为可点击。" },
        },
      ],
    },
    {
      name: "MessageBubbleGroup",
      description: { en: "Stacks consecutive bubbles from one sender with joined corners.", zh: "将同一发送方的连续气泡堆叠并连接圆角。" },
      extends: "div",
      props: [{ name: "align", type: `"start" | "end"`, description: { en: "Side for the whole group. Inherited from `Message` when omitted, else `start`.", zh: "整个分组的一侧。省略时从 `Message` 继承，否则为 `start`。" } }],
      dataAttributes: [{ name: "data-align", description: { en: "`start` or `end`.", zh: "`start` 或 `end`。" } }],
    },
    {
      name: "MessageBubbleCollapsible",
      description: { en: "Clips long content with a fade and a Show more toggle.", zh: "用渐隐和 Show more 切换按钮裁剪长内容。" },
      extends: "div",
      props: [
        { name: "collapsedHeight", type: "number", default: "120", description: { en: "Height in px while collapsed.", zh: "折叠时的高度，单位为 px。" } },
        { name: "defaultExpanded", type: "boolean", default: "false", description: { en: "Start expanded.", zh: "初始展开。" } },
        { name: "moreLabel", type: "string", default: `"Show more"`, description: { en: "Toggle label while collapsed.", zh: "折叠时的切换标签。" } },
        { name: "lessLabel", type: "string", default: `"Show less"`, description: { en: "Toggle label while expanded.", zh: "展开时的切换标签。" } },
      ],
    },
    {
      name: "messageBubbleVariants",
      description: { en: "The `cva` function behind `MessageBubble`.", zh: "`MessageBubble` 背后的 `cva` 函数。" },
      props: [
        { name: "tone", type: "same as MessageBubble", description: "" },
        { name: "size", type: "same as MessageBubble", description: "" },
      ],
    },
    {
      name: "MessageSideContext",
      description: { en: "React context (`\"start\" | \"end\" | null`) that `Message` provides so nested bubbles inherit their side.", zh: "`Message` 提供的 React context（`\"start\" | \"end\" | null`），使嵌套气泡继承其所在的一侧。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
