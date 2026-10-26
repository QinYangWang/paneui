import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Eases scrolling for a page or a scroll container.", "zh": "让页面或容器平滑滚动。"},
  usage: {
    imports: `import { SmoothScroll } from "@/components/ui/smooth-scroll"`,
    code: `<SmoothScroll className="h-80">
  <Article />
</SmoothScroll>`,
  },
  examples: [
    {
      id: "horizontal",
      title: { en: "Horizontal", zh: "横向" },
      description: { en: "Use for galleries and timelines that scroll sideways.", zh: "适用于横向画廊或时间线。" },
    },
    {
      id: "easing",
      title: { en: "Lerp vs Duration", zh: "插值与时长" },
    },
    {
      id: "scroll-to-section",
      title: { en: "Scroll to Section", zh: "滚动到分节" },
    },
  ],
  notes: [
    {
      title: "Scrollbars",
      body: { en: "Contained mode scrolls in a [Scroll Area](/docs/scroll-area): thin overlay bars inside the frame that follow the eased position. `container` points at its viewport.", zh: "Contained 模式在 [Scroll Area](/docs/scroll-area) 中滚动：框架内细小的覆盖条跟随缓动位置。`container` 指向其视口。" },
    },
    {
      title: "Motion",
      body: { en: "Under reduced motion nothing is eased, so scrolling is native and `scrollTo` jumps instead of animating. Touch scrolling stays native unless you set `touch`.", zh: "在减少动态效果下没有任何缓动，因此滚动是原生的，`scrollTo` 直接跳转而不是动画。触摸滚动保持原生，除非你设置 `touch`。" },
    },
    {
      title: "Related",
      body: { en: "[Scroll Progress](/docs/scroll-progress), [Scroll To](/docs/scroll-to) and [Scroll Reveal](/docs/scroll-reveal) read this provider.", zh: "[Scroll Progress](/docs/scroll-progress)、[Scroll To](/docs/scroll-to) 和 [Scroll Reveal](/docs/scroll-reveal) 读取此 provider。" },
    },
  ],
  api: [
    {
      name: "SmoothScroll",
      description: { en: "Eased scroll container (or, with `root`, a provider that eases the window).", zh: "缓动滚动容器（或者，使用 `root` 时，缓动窗口的 provider）。" },
      extends: "div",
      props: [
        {
          name: "root",
          type: "boolean",
          default: "false",
          description: { en: "`true` eases the whole page and renders only the provider. `false` renders its own scroll container; give it a height.", zh: "`true` 缓动整个页面且只渲染 provider。`false` 渲染自己的滚动容器；给它一个高度。" },
        },
        { name: "lerp", type: "number", default: "0.1", description: { en: "Smoothing per frame, 0–1. Lower is heavier. Ignored when `duration` is set.", zh: "每帧平滑度，0–1。越低越重。设置 `duration` 时忽略。" } },
        { name: "duration", type: "number", description: { en: "Fixed ease duration in seconds for wheel and programmatic scrolls.", zh: "滚轮和程序化滚动的固定缓动时长，单位为秒。" } },
        { name: "orientation", type: `"vertical" | "horizontal"`, default: `"vertical"`, description: { en: "Scroll axis.", zh: "滚动轴。" } },
        { name: "wheelMultiplier", type: "number", default: "1", description: { en: "Multiplies wheel deltas.", zh: "乘数作用于滚轮增量。" } },
        { name: "touch", type: "boolean", default: "false", description: { en: "Ease touch scrolling too. Off by default so phones keep native momentum.", zh: "也缓动触摸滚动。默认关闭，以便手机保持原生惯性。" } },
        { name: "contentClassName", type: "string", description: { en: "Class for the inner content element (contained mode only).", zh: "内部内容元素的类名（仅 contained 模式）。" } },
      ],
      dataAttributes: [{ name: "data-smooth", description: { en: "Present on the container while it is eased.", zh: "容器缓动时存在。" } }],
    },
    {
      name: "useSmoothScroll",
      description: { en: "Scroll state for the nearest `SmoothScroll`. Outside a provider it falls back to the window's native scroll.", zh: "最近 `SmoothScroll` 的滚动状态。在 provider 外回退到窗口的原生滚动。" },
      props: [
        { name: "lenis", type: "Lenis | null", description: { en: "The easing instance, or `null` on the native or reduced-motion path.", zh: "缓动实例，或在原生或减少动态效果路径上为 `null`。" } },
        { name: "smooth", type: "boolean", description: { en: "Whether scrolling is currently eased.", zh: "滚动当前是否缓动。" } },
        { name: "container", type: "RefObject<HTMLElement | null> | null", description: { en: "The scroll container, or `null` for the window.", zh: "滚动容器，窗口时为 `null`。" } },
        { name: "offset", type: "MotionValue<number>", description: { en: "Current scroll offset in px.", zh: "当前滚动偏移，单位为 px。" } },
        { name: "progress", type: "MotionValue<number>", description: { en: "Scroll position from 0 (start) to 1 (end).", zh: "滚动位置，从 0（起点）到 1（终点）。" } },
        { name: "velocity", type: "MotionValue<number>", description: { en: "Signed scroll velocity in px per frame.", zh: "带符号的滚动速度，单位为 px 每帧。" } },
        {
          name: "scrollTo",
          type: "(target: number | string | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => void",
          description: { en: "Scroll to a px offset, selector or element. Jumps under reduced motion.", zh: "滚动到 px 偏移、选择器或元素。在减少动态效果下跳转。" },
        },
      ],
    },
    {
      name: "useSmoothScrollContainer",
      description: { en: "The nearest `SmoothScroll`'s container ref, or `null` for the window or no provider. Pass it to motion's `useScroll({ container })`.", zh: "最近 `SmoothScroll` 的容器 ref，窗口或无 provider 时为 `null`。传给 motion 的 `useScroll({ container })`。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
