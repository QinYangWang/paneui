import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { IconChip } from "@/components/ui/icon-chip"`,
    code: `<IconChip tone="primary">
  <SparklesIcon />
</IconChip>`,
  },
  examples: [
    {
      id: "tones",
      title: "Tones",
      description:
        "Use `neutral` by default, a tinted tone when the icon carries a status, and `solid` for a brand mark.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Use one `size` per list so the icons line up.",
    },
    {
      id: "card-header",
      title: "Card Header",
      description: "Use next to `CardTitle` for title-level icons, so headers read as one family.",
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "The chip is always `aria-hidden`, so it is decoration only. Put the meaning in the text next to it.",
    },
  ],
  api: [
    {
      name: "IconChip",
      description: "A small rounded frame that holds one icon.",
      extends: "span",
      props: [
        {
          name: "tone",
          type: `"neutral" | "primary" | "success" | "warning" | "destructive" | "solid"`,
          default: `"neutral"`,
          description: "Surface and icon color.",
        },
        {
          name: "size",
          type: `"sm" | "default" | "lg" | "xl"`,
          default: `"default"`,
          description: "Chip size (24 / 32 / 40 / 48px); the icon scales with it.",
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: "Replace the rendered `<span>` with another element.",
        },
      ],
    },
    {
      name: "iconChipVariants",
      description: "The `cva` function behind `IconChip`, for styling other elements like a chip.",
      props: [
        { name: "tone", type: "same as IconChip", description: "" },
        { name: "size", type: "same as IconChip", description: "" },
      ],
    },
  ],
} satisfies ComponentDoc
