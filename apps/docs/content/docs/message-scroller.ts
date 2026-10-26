import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Follows new messages until the reader scrolls up.", "zh": "在阅读历史消息前跟随新消息。"},
  usage: {
    imports: `import { MessageScroller } from "@/components/ui/message-scroller"`,
    code: `<MessageScroller className="h-96">
  {messages.map((m) => <Message key={m.id} from={m.from}>…</Message>)}
</MessageScroller>`,
  },
  examples: [
    {
      id: "labels",
      title: { en: "Pill Labels", zh: "提示标签" },
    },
    {
      id: "custom-jump",
      title: { en: "Custom Jump Control", zh: "自定义跳转控件" },
    },
    {
      id: "live-edge-change",
      title: { en: "Live Edge Callback", zh: "最新位置回调" },
    },
    {
      id: "start-at-top",
      title: { en: "Start at Top", zh: "从顶部开始" },
    },
    {
      id: "no-follow",
      title: { en: "No Follow", zh: "不跟随" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "The viewport is focusable. `ArrowUp`, `PageUp`, `Home` and `Shift+Space` release it from the live edge; `End` jumps back to the latest message.", zh: "视口可获得焦点。`ArrowUp`、`PageUp`、`Home` 和 `Shift+Space` 将其从实时边缘释放；`End` 跳回最新消息。" },
    },
    {
      title: "Motion",
      body: { en: "Under reduced motion the viewport jumps instead of gliding to the bottom, and the pill fades instead of blurring and lifting.", zh: "减少动态效果时，视口直接跳到底部而非滑动，胶囊渐隐而非模糊上浮。" },
    },
  ],
  api: [
    {
      name: "MessageScroller",
      description: { en: "A conversation viewport pinned to the live edge while output streams.", zh: "输出流式生成时保持在实时边缘的对话视口。" },
      extends: "div",
      props: [
        { name: "threshold", type: "number", default: "48", description: { en: "Distance from the bottom (px) still treated as at the live edge.", zh: "距底部仍视为处于实时边缘的距离（px）。" } },
        { name: "startAtEnd", type: "boolean", default: "true", description: { en: "Start scrolled to the bottom on mount.", zh: "挂载时初始滚动到底部。" } },
        { name: "follow", type: "boolean", default: "true", description: { en: "Follow new content while at the live edge.", zh: "处于实时边缘时跟随新内容。" } },
        { name: "showJumpButton", type: "boolean", default: "true", description: { en: "Show the floating jump-to-latest pill when released.", zh: "释放时显示浮动的跳转到最新胶囊。" } },
        { name: "jumpButton", type: `"pill" | "icon"`, default: `"pill"`, description: { en: "`icon` renders a round arrow-only button (label kept for screen readers), as in desktop chat apps.", zh: "`icon` 渲染为仅含箭头的圆形按钮（为屏幕阅读器保留标签），如桌面聊天应用。" } },
        { name: "jumpLabel", type: "string", default: `"Jump to latest"`, description: { en: "Pill label when nothing new is below.", zh: "下方无新内容时的胶囊标签。" } },
        { name: "newLabel", type: "string", default: `"New messages"`, description: { en: "Pill label once content arrived below the reader.", zh: "读者下方有内容到达后的胶囊标签。" } },
        { name: "viewportClassName", type: "string", description: { en: "Classes for the scrolling viewport.", zh: "滚动视口的类名。" } },
        { name: "contentClassName", type: "string", description: { en: "Classes for the content column inside the viewport (default `flex flex-col p-4`).", zh: "视口内内容列的类名（默认 `flex flex-col p-4`）。" } },
        { name: "onLiveEdgeChange", type: "(atLiveEdge: boolean) => void", description: { en: "Called when the viewport attaches to or releases the live edge.", zh: "视口连接到或释放实时边缘时调用。" } },
        { name: "footer", type: "ReactNode", description: { en: "Rendered below the viewport, outside the scrolling content (a composer, a jump bar). Can call `useMessageScroller()`.", zh: "渲染在视口下方、滚动内容之外（输入框、跳转栏）。可调用 `useMessageScroller()`。" } },
        { name: "overlay", type: "ReactNode", description: { en: "Rendered over the viewport, outside the scrolling content, in a `relative` frame; position it yourself. Can call `useMessageScroller()`.", zh: "在 `relative` 框架中渲染在视口上方、滚动内容之外；位置需自行设置。可调用 `useMessageScroller()`。" } },
      ],
      dataAttributes: [
        { name: "data-live-edge", description: { en: "On the root while pinned to the newest content.", zh: "固定到最新内容时加在根上。" } },
        { name: "data-new", description: { en: "On the jump pill once new content arrived below.", zh: "读者下方有新内容到达后加在跳转胶囊上。" } },
      ],
    },
    {
      name: "useMessageScroller",
      description: { en: "Reads the nearest `MessageScroller` from its children, `footer` or `overlay`. Throws outside one.", zh: "从子元素、`footer` 或 `overlay` 中读取最近的 `MessageScroller`。在外部会抛错。" },
      props: [
        { name: "atLiveEdge", type: "boolean", description: { en: "Returned. True while pinned to the newest content.", zh: "返回值。固定到最新内容时为 true。" } },
        { name: "hasNew", type: "boolean", description: { en: "Returned. True once content arrived below a reader who scrolled up.", zh: "返回值。读者向上滚动后下方有内容到达时为 true。" } },
        { name: "scrollToLatest", type: "(behavior?: ScrollBehavior) => void", description: { en: "Returned. Scroll to the newest content and re-attach; `\"smooth\"` by default.", zh: "返回值。滚动到最新内容并重新连接；默认 `\"smooth\"`。" } },
      ],
    },
  ],
} satisfies ComponentDoc
