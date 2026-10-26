import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Refreshes a scrolling list when the user pulls it down.", "zh": "下拉刷新列表。"},
  usage: {
    imports: `import { PullToRefresh } from "@/components/ui/pull-to-refresh"`,
    code: `<PullToRefresh onRefresh={() => fetchInbox()} className="h-80">
  <InboxList />
</PullToRefresh>`,
  },
  examples: [
    {
      id: "custom-labels",
      title: { en: "Labels and Distances", zh: "标签与距离" },
      description: { en: "Use to match your app's wording or change how far the pull must go.", zh: "适用于需要调整文案或触发距离的场景。" },
    },
    {
      id: "external-refreshing",
      title: { en: "External Refreshing", zh: "外部刷新" },
      description: { en: "Use when a refresh can also start elsewhere, like a Sync button, and should hold the spinner open.", zh: "适用于刷新也能由其他控件触发的场景。" },
    },
    {
      id: "status-change",
      title: { en: "Status Changes", zh: "状态变化" },
      description: { en: "Use to drive your own indicator from the gesture.", zh: "适用于根据手势驱动自定义指示器。" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
  ],
  notes: [
    {
      title: "Scrollbars",
      body: { en: "Scrolls in a [Scroll Area](/docs/scroll-area), so its scrollbar stays inside the rounded frame and holds still while the content is pulled. The pull never changes the scroll range.", zh: "在 [Scroll Area](/docs/scroll-area) 中滚动，因此其滚动条保持在圆角边框内，并在内容被拉升时保持不动。拉升不会改变滚动范围。" },
    },
    {
      title: "Motion",
      body: { en: "Content springs back once `onRefresh` resolves. With reduced motion it jumps into place and the arrow doesn't rotate.", zh: "`onRefresh` 解析后内容弹回。启用减少动态效果时，它直接跳到位，箭头不旋转。" },
    },
    {
      title: "Accessibility",
      body: { en: "The root sets `aria-busy` while refreshing and a polite live region announces `refreshingLabel`. Pull is a touch, pen and mouse gesture only, so give keyboard users another way to refresh.", zh: "根元素在刷新期间设置 `aria-busy`，礼貌的实时区域宣布 `refreshingLabel`。拉动仅适用于触摸、笔和鼠标手势，因此为键盘用户提供另一种刷新方式。" },
    },
  ],
  api: [
    {
      name: "PullToRefresh",
      description: { en: "Scroll container that arms a refresh when pulled down from the top. Give it a height.", zh: "从顶部下拉时触发刷新的滚动容器。给它设置高度。" },
      extends: "div",
      props: [
        { name: "children", type: "ReactNode", required: true, description: { en: "The scrolling content.", zh: "滚动内容。" } },
        {
          name: "onRefresh",
          type: "() => void | Promise<void>",
          required: true,
          description: { en: "Runs when the pull is released past `threshold`. Return a promise to keep the spinner until it settles, or return nothing and set `refreshing` instead.", zh: "当拉动超过 `threshold` 并释放时运行。返回 promise 以保持加载指示器直到它稳定，或者不返回任何内容并改为设置 `refreshing`。" },
        },
        { name: "refreshing", type: "boolean", description: { en: "Hold the refreshing state for a refresh managed outside the gesture. The content stays open until both this and any `onRefresh` promise are done.", zh: "为手势外部管理的刷新保持刷新状态。内容保持打开，直到此状态和任何 `onRefresh` promise 都完成。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Turn the pull gesture off.", zh: "关闭拉动手势。" } },
        { name: "threshold", type: "number", default: "64", description: { en: "Resisted pull distance (px) that arms the refresh.", zh: "触发刷新所需的阻力拉动距离（px）。" } },
        { name: "maxPull", type: "number", default: "120", description: { en: "Ceiling of the resisted pull (px).", zh: "阻力拉动的上限（px）。" } },
        { name: "holdDistance", type: "number", default: "56", description: { en: "Content offset (px) while refreshing.", zh: "刷新期间的内容偏移量（px）。" } },
        { name: "pullingLabel", type: "ReactNode", default: `"Pull to refresh"`, description: { en: "Shown while pulling, before the threshold.", zh: "在拉动过程中、达到阈值之前显示。" } },
        { name: "releaseLabel", type: "ReactNode", default: `"Release to refresh"`, description: { en: "Shown once the pull is armed.", zh: "拉动触发后显示。" } },
        { name: "refreshingLabel", type: "ReactNode", default: `"Refreshing…"`, description: { en: "Shown and announced while refreshing.", zh: "刷新期间显示并宣布。" } },
        {
          name: "onStatusChange",
          type: `(status: "idle" | "pulling" | "ready" | "refreshing") => void`,
          description: { en: "Called whenever the gesture status changes.", zh: "手势状态变化时调用。" },
        },
        { name: "contentClassName", type: "string", description: { en: "Classes for the content that moves with the pull.", zh: "随拉动移动的内容的类名。" } },
      ],
      dataAttributes: [
        { name: "data-status", description: { en: "`idle`, `pulling`, `ready` or `refreshing` on the root.", zh: "根元素上的 `idle`、`pulling`、`ready` 或 `refreshing`。" } },
      ],
    },
  ],
} satisfies ComponentDoc
