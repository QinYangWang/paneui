import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Frames an icon so card and section headers match.", "zh": "为标题图标提供统一的底框。"},
  usage: {
    imports: `import { IconChip } from "@/components/ui/icon-chip"`,
    code: `<IconChip tone="primary">
  <SparklesIcon />
</IconChip>`,
  },
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
      id: "card-header",
      title: { en: "Card Header", zh: "卡片标题栏" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: { en: "The chip is always `aria-hidden`, so it is decoration only. Put the meaning in the text next to it.", zh: "该 chip 始终为 `aria-hidden`，因此只是装饰。把含义放在它旁边的文本中。" },
    },
  ],
  api: [
    {
      name: "IconChip",
      description: { en: "A small rounded frame that holds one icon.", zh: "一个包含单个图标的小圆角框。" },
      extends: "span",
      props: [
        {
          name: "tone",
          type: `"neutral" | "primary" | "success" | "warning" | "destructive" | "solid"`,
          default: `"neutral"`,
          description: { en: "Surface and icon color.", zh: "表面和图标颜色。" },
        },
        {
          name: "size",
          type: `"sm" | "default" | "lg" | "xl"`,
          default: `"default"`,
          description: { en: "Chip size (24 / 32 / 40 / 48px); the icon scales with it.", zh: "chip 尺寸（24 / 32 / 40 / 48px）；图标随之缩放。" },
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: { en: "Replace the rendered `<span>` with another element.", zh: "用另一个元素替换渲染的 `<span>`。" },
        },
      ],
    },
    {
      name: "iconChipVariants",
      description: { en: "The `cva` function behind `IconChip`, for styling other elements like a chip.", zh: "`IconChip` 背后的 `cva` 函数，用于给其他元素应用 chip 样式。" },
      props: [
        { name: "tone", type: "same as IconChip", description: "" },
        { name: "size", type: "same as IconChip", description: "" },
      ],
    },
  ],
} satisfies ComponentDoc
