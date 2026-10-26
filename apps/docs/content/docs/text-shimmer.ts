import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Highlights text while work is in progress.", "zh": "通过文字高亮提示正在处理。"},
  usage: {
    imports: `import { TextShimmer } from "@/components/ui/text-shimmer"`,
    code: `<TextShimmer>Checking flight prices…</TextShimmer>`,
  },
  examples: [
    {
      id: "elements",
      title: { en: "Elements", zh: "元素" },
    },
    {
      id: "speed",
      title: { en: "Speed", zh: "速度" },
    },
    {
      id: "spread",
      title: { en: "Spread", zh: "展开范围" },
    },
    {
      id: "colors",
      title: { en: "Colors", zh: "颜色" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The sweep is a CSS keyframe animation shipped with the component. The band enters and leaves fully clear of the text, so the loop has no visible reset. Under `prefers-reduced-motion: reduce` it stops with the band resting mid-text.", zh: "扫光是随组件发布的 CSS 关键帧动画。光带进出时完全避开文本，因此循环没有可见的重置。在 `prefers-reduced-motion: reduce` 下，它停止时光带停留在文本中间。" },
    },
    {
      title: "Related",
      body: { en: "[Text Scramble](/docs/text-scramble), [Text Cascade](/docs/text-cascade), [Text Reveal](/docs/text-reveal).", zh: "[文字扰乱](/docs/text-scramble)、[文字级联](/docs/text-cascade)、[文字揭示](/docs/text-reveal)。" },
    },
  ],
  api: [
    {
      name: "TextShimmer",
      description: { en: "Text with a looping highlight swept across it via a clipped background gradient.", zh: "通过裁剪的背景渐变在文本上循环扫过的高亮。" },
      extends: "HTML element (span by default)",
      props: [
        {
          name: "as",
          type: `"span" | "p" | "div" | "h1" | "h2" | "h3" | "h4"`,
          default: `"span"`,
          description: { en: "Element to render.", zh: "要渲染的元素。" },
        },
        { name: "duration", type: "number", default: "2.2", description: { en: "Seconds for one sweep.", zh: "一次扫光的秒数。" } },
        {
          name: "spread",
          type: "number",
          default: "14",
          description: { en: "Width of the bright band; 14 spans about half the text.", zh: "亮带的宽度；14 大约跨越文本的一半。" },
        },
        {
          name: "style",
          type: "CSSProperties",
          description: { en: "Merged over the generated gradient and animation; set `--shimmer-base` / `--shimmer-highlight` here.", zh: "合并到生成的渐变和动画之上；在此处设置 `--shimmer-base` / `--shimmer-highlight`。" },
        },
      ],
      dataAttributes: [{ name: "data-slot", description: { en: "\"text-shimmer\"", zh: "\"text-shimmer\"" } }],
    },
  ],
} satisfies ComponentDoc
