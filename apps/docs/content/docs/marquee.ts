import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Scrolls content past in an endless loop.", "zh": "循环滚动内容。"},
  usage: {
    imports: `import { Marquee } from "@/components/ui/marquee"`,
    code: `<Marquee>
  <span>Dinner booked for Friday</span>
  <span>Flight to Tokyo held</span>
</Marquee>`,
  },
  examples: [
    {
      id: "posts",
      title: { en: "Social Posts", zh: "社交帖子" },
      description: { en: "Use for testimonials.", zh: "适合展示用户评价。" },
    },
    {
      id: "vertical",
      title: { en: "Vertical", zh: "纵向" },
    },
    {
      id: "no-fade",
      title: { en: "Without Fade", zh: "无淡入淡出" },
    },
    {
      id: "repeat",
      title: { en: "Repeat", zh: "重复" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: { en: "Only the first copy of the content is exposed; the repeats are `aria-hidden` and `inert`. By default the loop pauses on hover and while anything inside has keyboard focus.", zh: "只有第一份内容被暴露；重复项为 `aria-hidden` 和 `inert`。默认情况下，悬停时以及内部有任何东西获得键盘焦点时循环暂停。" },
    },
    {
      title: "Motion",
      body: { en: "Under `prefers-reduced-motion: reduce` the track is paused in place.", zh: "在 `prefers-reduced-motion: reduce` 下，轨道就地暂停。" },
    },
  ],
  api: [
    {
      name: "Marquee",
      description: { en: "Loops its children endlessly along one axis with a CSS animation.", zh: "用 CSS 动画沿一个轴无限循环其子元素。" },
      extends: "div",
      props: [
        {
          name: "direction",
          type: `"left" | "right" | "up" | "down"`,
          default: `"left"`,
          description: { en: "Scroll direction.", zh: "滚动方向。" },
        },
        { name: "duration", type: "number", default: "30", description: { en: "Seconds for one full loop of the content.", zh: "内容完整循环一次所需的秒数。" } },
        { name: "gap", type: "string", default: `"1rem"`, description: { en: "Space between items (any CSS length).", zh: "项目之间的间距（任意 CSS 长度）。" } },
        {
          name: "pauseOnHover",
          type: "boolean",
          default: "true",
          description: { en: "Pause while hovered or while something inside has focus.", zh: "悬停时或内部有东西获得焦点时暂停。" },
        },
        { name: "fade", type: "boolean", default: "true", description: { en: "Fade the leading and trailing edges with a mask.", zh: "用遮罩淡化前缘和后缘。" } },
        {
          name: "repeat",
          type: "number",
          default: "2",
          description: { en: "Copies of the content in the track (minimum 2).", zh: "轨道中内容的副本数（最少 2）。" },
        },
      ],
      dataAttributes: [
        { name: "data-orientation", description: { en: "\"horizontal\" or \"vertical\", from `direction`.", zh: "`direction` 的取值 \"horizontal\" 或 \"vertical\"。" } },
        { name: "data-slot", description: { en: "\"marquee\" on the root (unclipped, so a border or ring on it stays visible), \"marquee-viewport\" on the inner element that clips and fades, \"marquee-track\" on each copy.", zh: "根元素上加 \"marquee\"（不裁剪，因此其上的边框或焦点环保持可见），内部负责裁剪和渐隐的元素上加 \"marquee-viewport\"，每份拷贝上加 \"marquee-track\"。" } },
      ],
    },
  ],
} satisfies ComponentDoc
