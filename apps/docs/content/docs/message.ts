import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Lays out chat conversation rows by sender.", "zh": "按发送者排列对话消息。"},
  usage: {
    imports: `import { Message, MessageBubble, MessageContent, MessageList } from "@/components/ui/message"`,
    code: `<MessageList>
  <Message from="user">
    <MessageContent>
      <MessageBubble tone="primary">What's on my calendar today?</MessageBubble>
    </MessageContent>
  </Message>
</MessageList>`,
  },
  composition: `MessageList
├── MessageMarker
└── Message
    ├── MessageAvatar
    ├── MessageTyping
    └── MessageContent
        ├── MessageHeader
        ├── MessageBubble
        ├── MessageMeta
        └── MessageActions
            └── MessageAction`,
  examples: [
    {
      id: "avatars",
      title: { en: "Avatars", zh: "头像" },
    },
    {
      id: "hover-actions",
      title: { en: "Hover Actions", zh: "悬停操作" },
    },
    {
      id: "system",
      title: { en: "System Rows", zh: "系统消息" },
    },
    {
      id: "compact",
      title: { en: "Compact Spacing", zh: "紧凑间距" },
    },
    {
      id: "animate-in",
      title: { en: "Animate In", zh: "入场动画" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Under reduced motion `animateIn` becomes a 150ms fade and the typing dots pulse their opacity instead of bouncing.", zh: "减少动态效果时，`animateIn` 变为 150ms 的渐隐，输入中的圆点改为透明度脉动而非弹跳。" },
    },
    {
      title: "Accessibility",
      body: { en: "Each row is an `<article>` labelled \"{from} message\" unless you pass `aria-label`. `MessageActions` is a `role=\"toolbar\"`, every `MessageAction` gets its `label` as `aria-label` and tooltip, and `MessageMarker` is a `role=\"separator\"`.", zh: "每行是一个 `<article>`，标签为 \"{from} message\"，除非传入 `aria-label`。`MessageActions` 为 `role=\"toolbar\"`，每个 `MessageAction` 以其 `label` 作为 `aria-label` 和提示，`MessageMarker` 为 `role=\"separator\"`。" },
    },
  ],
  api: [
    {
      name: "MessageList",
      description: { en: "Vertical stack of rows.", zh: "行的纵向堆叠。" },
      extends: "div",
      props: [{ name: "spacing", type: `"compact" | "default"`, default: `"default"`, description: { en: "Gap between rows: 8px or 20px.", zh: "行间距：8px 或 20px。" } }],
    },
    {
      name: "Message",
      description: { en: "One conversation row. `user` rows hug the right edge.", zh: "一行对话。`user` 行贴靠右边缘。" },
      extends: "motion.article",
      props: [
        { name: "from", type: `"user" | "assistant" | "system"`, default: `"assistant"`, description: { en: "Sender; sets the side for every bubble inside.", zh: "发送方；为其中每个气泡设置一侧。" } },
        { name: "animateIn", type: "boolean", default: "false", description: { en: "Pop up from the sender's corner once on mount.", zh: "挂载时从发送方角落弹出一次。" } },
      ],
      dataAttributes: [{ name: "data-from", description: { en: "`user`, `assistant` or `system`; children style off `group-data-[from=user]/message`.", zh: "`user`、`assistant` 或 `system`；子元素的样式基于 `group-data-[from=user]/message`。" } }],
    },
    {
      name: "MessageAvatar",
      description: { en: "Round 32px avatar slot.", zh: "32px 的圆形头像槽位。" },
      extends: "div",
      props: [{ name: "placeholder", type: "boolean", default: "false", description: { en: "Render an invisible spacer instead of the avatar.", zh: "渲染不可见的占位元素代替头像。" } }],
    },
    {
      name: "MessageContent",
      description: { en: "Column for bubbles, header, meta and actions; groups bubbles to the row's side.", zh: "气泡、标题、元信息与操作的列；将气泡归到行的一侧。" },
      extends: "MessageBubbleGroup",
      extendsHref: "/docs/message-bubble",
      props: [],
    },
    { name: "MessageHeader", description: { en: "Sender name or model above the bubbles.", zh: "气泡上方的发送方名称或模型名。" }, extends: "div", props: [] },
    { name: "MessageMeta", description: { en: "Timestamp or delivery status below the bubbles; tabular numerals.", zh: "气泡下方的时间戳或送达状态；等宽数字。" }, extends: "div", props: [] },
    {
      name: "MessageActions",
      description: { en: "Toolbar of quiet icon actions.", zh: "弱化图标操作的工具栏。" },
      extends: "div",
      props: [{ name: "visible", type: "boolean", default: "false", description: { en: "Keep shown instead of revealing on hover / focus.", zh: "保持显示，而不是在悬停/聚焦时显示。" } }],
      dataAttributes: [{ name: "data-visible", description: { en: "Present when `visible`.", zh: "`visible` 时存在。" } }],
    },
    {
      name: "MessageAction",
      description: { en: "Ghost icon button with a tooltip.", zh: "带提示的 ghost 图标按钮。" },
      extends: "Button",
      extendsHref: "/docs/button",
      props: [{ name: "label", type: "string", required: true, description: { en: "Tooltip text and `aria-label`.", zh: "提示文本和 `aria-label`。" } }],
    },
    {
      name: "MessageTyping",
      description: { en: "Three-dot typing indicator in a bubble-shaped chip.", zh: "气泡形胶囊中的三点输入指示器。" },
      extends: "div",
      props: [{ name: "label", type: "string", default: `"Typing"`, description: { en: "Accessible label of the status.", zh: "状态的可访问标签。" } }],
    },
    { name: "MessageMarker", description: { en: "Centred divider between turns, such as a date, \"New\" or a note.", zh: "回合之间的居中分隔，如日期、\"New\" 或备注。" }, extends: "div", props: [] },
    {
      name: "MessageBubble",
      description: { en: "Re-exported from [Message Bubble](/docs/message-bubble), along with `MessageBubbleGroup` and `MessageBubbleCollapsible`.", zh: "从 [Message Bubble](/docs/message-bubble) 重新导出，同时导出 `MessageBubbleGroup` 和 `MessageBubbleCollapsible`。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
