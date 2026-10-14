import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Tones",
      description: "`tone` covers sender (`primary`), reply (`default`), system (`muted`), quiet (`outline`), error (`destructive`) and unframed (`ghost`) messages.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "`size=\"sm\"` tightens padding and type for chips like status lines and quick replies.",
    },
    {
      id: "align-and-tail",
      title: "Alignment and Tail",
      description: "`align` picks the side the bubble hugs; set `tail={false}` to round the corner toward the sender.",
    },
    {
      id: "grouped",
      title: "Grouped",
      description: "Bubbles in a `MessageBubbleGroup` inherit its `align` and tighten the corners where they join.",
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Pass `render={<button />}` to make the whole bubble pressable, e.g. quick-reply suggestions.",
    },
    {
      id: "collapsible",
      title: "Collapsible",
      description: "`MessageBubbleCollapsible` clips long content to `collapsedHeight`, with custom `moreLabel` and `lessLabel`; `defaultExpanded` starts it open.",
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
          description: "Visual style.",
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
