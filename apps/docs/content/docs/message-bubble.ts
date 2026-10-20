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
      body: "The collapsible's height transition is removed under reduced motion; interactive bubbles press to `scale-98`.",
    },
    {
      title: "Accessibility",
      body: "The Show more toggle is a real `<button>` with `aria-expanded` and `aria-controls` pointing at the clipped region. It only appears when the content overflows.",
    },
  ],
  api: [
    {
      name: "MessageBubble",
      description: "A single conversational surface.",
      extends: "div (useRender)",
      extendsHref: "https://base-ui.com/react/utils/use-render",
      props: [
        {
          name: "tone",
          type: `"default" | "primary" | "muted" | "outline" | "destructive" | "ghost"`,
          default: `"default"`,
          description: "`primary` for the sender, `default` for replies, `muted` for system, `outline` for quiet, `destructive` for errors and `ghost` for unframed messages.",
        },
        { name: "size", type: `"default" | "sm"`, default: `"default"`, description: "Padding, radius and text size." },
        { name: "align", type: `"start" | "end"`, description: "Side the bubble hugs. Inherited from `Message` / `MessageBubbleGroup` when omitted, else `start`." },
        { name: "tail", type: "boolean", default: "true", description: "Tighten the bottom corner toward the sender. Ignored for `ghost`." },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: "Render as another element, e.g. `<a />` or `<button />`; the bubble becomes pressable.",
        },
      ],
    },
    {
      name: "MessageBubbleGroup",
      description: "Stacks consecutive bubbles from one sender with joined corners.",
      extends: "div",
      props: [{ name: "align", type: `"start" | "end"`, description: "Side for the whole group. Inherited from `Message` when omitted, else `start`." }],
      dataAttributes: [{ name: "data-align", description: "`start` or `end`." }],
    },
    {
      name: "MessageBubbleCollapsible",
      description: "Clips long content with a fade and a Show more toggle.",
      extends: "div",
      props: [
        { name: "collapsedHeight", type: "number", default: "120", description: "Height in px while collapsed." },
        { name: "defaultExpanded", type: "boolean", default: "false", description: "Start expanded." },
        { name: "moreLabel", type: "string", default: `"Show more"`, description: "Toggle label while collapsed." },
        { name: "lessLabel", type: "string", default: `"Show less"`, description: "Toggle label while expanded." },
      ],
    },
    {
      name: "messageBubbleVariants",
      description: "The `cva` function behind `MessageBubble`.",
      props: [
        { name: "tone", type: "same as MessageBubble", description: "" },
        { name: "size", type: "same as MessageBubble", description: "" },
      ],
    },
    {
      name: "MessageSideContext",
      description: "React context (`\"start\" | \"end\" | null`) that `Message` provides so nested bubbles inherit their side.",
      props: [],
    },
  ],
} satisfies ComponentDoc
