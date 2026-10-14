import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { MessageScroller } from "@/components/ui/message-scroller"`,
    code: `<MessageScroller className="h-96">
  {messages.map((m) => <Message key={m.id} from={m.from}>…</Message>)}
</MessageScroller>`,
  },
  examples: [
    {
      id: "labels",
      title: "Pill Labels",
      description: "`jumpLabel` shows when you scroll up; `newLabel` replaces it, in primary, once content arrives below you.",
    },
    {
      id: "custom-jump",
      title: "Custom Jump Control",
      description: "Set `showJumpButton={false}` and build your own from `useMessageScroller()`; the hook only works inside the scroller, so this bar is a sticky child of the content.",
    },
    {
      id: "live-edge-change",
      title: "Live Edge Callback",
      description: "`onLiveEdgeChange` fires when the reader detaches or re-attaches, e.g. to pause read receipts.",
    },
    {
      id: "start-at-top",
      title: "Start at Top",
      description: "`startAtEnd={false}` opens at the first message, for transcripts read from the beginning.",
    },
    {
      id: "no-follow",
      title: "No Follow",
      description: "With `follow={false}` the viewport never chases new content; the pill tells the reader it arrived.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The viewport is focusable. `ArrowUp`, `PageUp`, `Home` and `Shift+Space` release it from the live edge; `End` jumps back to the latest message.",
    },
    {
      title: "Motion",
      body: "Under reduced motion the viewport jumps instead of gliding to the bottom, and the pill fades instead of blurring and lifting.",
    },
  ],
  api: [
    {
      name: "MessageScroller",
      description: "A conversation viewport pinned to the live edge while output streams.",
      extends: "div",
      props: [
        { name: "threshold", type: "number", default: "48", description: "Distance from the bottom (px) still treated as at the live edge." },
        { name: "startAtEnd", type: "boolean", default: "true", description: "Start scrolled to the bottom on mount." },
        { name: "follow", type: "boolean", default: "true", description: "Follow new content while at the live edge." },
        { name: "showJumpButton", type: "boolean", default: "true", description: "Show the floating jump-to-latest pill when released." },
        { name: "jumpLabel", type: "string", default: `"Jump to latest"`, description: "Pill label when nothing new is below." },
        { name: "newLabel", type: "string", default: `"New messages"`, description: "Pill label once content arrived below the reader." },
        { name: "viewportClassName", type: "string", description: "Classes for the scrolling viewport." },
        { name: "contentClassName", type: "string", description: "Classes for the content column inside the viewport (default `flex flex-col p-4`)." },
        { name: "onLiveEdgeChange", type: "(atLiveEdge: boolean) => void", description: "Called when the viewport attaches to or releases the live edge." },
      ],
      dataAttributes: [
        { name: "data-live-edge", description: "On the root while pinned to the newest content." },
        { name: "data-new", description: "On the jump pill once new content arrived below." },
      ],
    },
    {
      name: "useMessageScroller",
      description: "Reads the nearest `MessageScroller`. Throws outside one.",
      props: [
        { name: "atLiveEdge", type: "boolean", description: "Returned. True while pinned to the newest content." },
        { name: "scrollToLatest", type: "(behavior?: ScrollBehavior) => void", description: "Returned. Scroll to the newest content and re-attach; `\"smooth\"` by default." },
      ],
    },
  ],
} satisfies ComponentDoc
