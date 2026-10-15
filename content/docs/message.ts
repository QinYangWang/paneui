import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Avatars",
      description: "Use `placeholder` on follow-up rows to keep them aligned without repeating the avatar.",
    },
    {
      id: "hover-actions",
      title: "Hover Actions",
      description: "Leave out `visible` when actions should appear only on hover or focus; touch screens always show them.",
    },
    {
      id: "system",
      title: "System Rows",
      description: "Use `from=\"system\"` for notes between turns, with a `muted` bubble or a `MessageMarker`.",
    },
    {
      id: "compact",
      title: "Compact Spacing",
      description: "Use `spacing=\"compact\"` for dense threads.",
    },
    {
      id: "animate-in",
      title: "Animate In",
      description: "Set `animateIn` only on rows that were just sent, not on loaded history.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Under reduced motion `animateIn` becomes a 150ms fade and the typing dots pulse their opacity instead of bouncing.",
    },
    {
      title: "Accessibility",
      body: 'Each row is an `<article>` labelled "{from} message" unless you pass `aria-label`. `MessageActions` is a `role="toolbar"`, every `MessageAction` gets its `label` as `aria-label` and tooltip, and `MessageMarker` is a `role="separator"`.',
    },
  ],
  api: [
    {
      name: "MessageList",
      description: "Vertical stack of rows.",
      extends: "div",
      props: [{ name: "spacing", type: `"compact" | "default"`, default: `"default"`, description: "Gap between rows: 8px or 20px." }],
    },
    {
      name: "Message",
      description: "One conversation row. `user` rows hug the right edge.",
      extends: "motion.article",
      props: [
        { name: "from", type: `"user" | "assistant" | "system"`, default: `"assistant"`, description: "Sender; sets the side for every bubble inside." },
        { name: "animateIn", type: "boolean", default: "false", description: "Pop up from the sender's corner once on mount." },
      ],
      dataAttributes: [{ name: "data-from", description: "`user`, `assistant` or `system`; children style off `group-data-[from=user]/message`." }],
    },
    {
      name: "MessageAvatar",
      description: "Round 32px avatar slot.",
      extends: "div",
      props: [{ name: "placeholder", type: "boolean", default: "false", description: "Render an invisible spacer instead of the avatar." }],
    },
    {
      name: "MessageContent",
      description: "Column for bubbles, header, meta and actions; groups bubbles to the row's side.",
      extends: "MessageBubbleGroup",
      extendsHref: "/docs/message-bubble",
      props: [],
    },
    { name: "MessageHeader", description: "Sender name or model above the bubbles.", extends: "div", props: [] },
    { name: "MessageMeta", description: "Timestamp or delivery status below the bubbles; tabular numerals.", extends: "div", props: [] },
    {
      name: "MessageActions",
      description: "Toolbar of quiet icon actions.",
      extends: "div",
      props: [{ name: "visible", type: "boolean", default: "false", description: "Keep shown instead of revealing on hover / focus." }],
      dataAttributes: [{ name: "data-visible", description: "Present when `visible`." }],
    },
    {
      name: "MessageAction",
      description: "Ghost icon button with a tooltip.",
      extends: "Button",
      extendsHref: "/docs/button",
      props: [{ name: "label", type: "string", required: true, description: "Tooltip text and `aria-label`." }],
    },
    {
      name: "MessageTyping",
      description: "Three-dot typing indicator in a bubble-shaped chip.",
      extends: "div",
      props: [{ name: "label", type: "string", default: `"Typing"`, description: "Accessible label of the status." }],
    },
    { name: "MessageMarker", description: "Centred divider between turns, such as a date, \"New\" or a note.", extends: "div", props: [] },
    {
      name: "MessageBubble",
      description: "Re-exported from [Message Bubble](/docs/message-bubble), along with `MessageBubbleGroup` and `MessageBubbleCollapsible`.",
      props: [],
    },
  ],
} satisfies ComponentDoc
