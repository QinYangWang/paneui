import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Labels an item with a short status or category.", "zh": "标记状态或分类。"},
  usage: {
    imports: `import { Badge } from "@/components/ui/badge"`,
    code: `<Badge variant="success">Paid</Badge>`,
  },
  examples: [
    {
      id: "sizes",
      title: { en: "Sizes", zh: "尺寸" },
    },
    {
      id: "with-icon",
      title: { en: "With Icon", zh: "带图标" },
      description: { en: "Put an icon first when the badge marks a status or category.", zh: "适用于需要快速识别状态或分类的标记。" },
    },
    {
      id: "with-avatar",
      title: { en: "With Avatar", zh: "带头像" },
    },
    {
      id: "as-link",
      title: { en: "As Link", zh: "用作链接" },
    },
  ],
  api: [
    {
      name: "Badge",
      extends: "span",
      props: [
        {
          name: "variant",
          type: `"chip" | "primary" | "success" | "warning" | "destructive" | "outline"`,
          default: `"chip"`,
          description: "Visual style. `chip` is neutral; the tinted variants carry status.",
        },
        {
          name: "size",
          type: `"default" | "sm"`,
          default: `"default"`,
          description: "Height, padding and text size. `default` is 28px tall and `sm` 20px; icons are 14px, or 12px at `sm`.",
        },
        {
          name: "render",
          type: "ReactElement | (props, state) => ReactElement",
          description: "Replace the rendered `<span>`, e.g. with `<a />` or a router `Link`.",
        },
      ],
    },
    {
      name: "BadgeAvatar",
      description: "Small round mark at the start of a badge, e.g. a vendor initial.",
      extends: "span",
      props: [],
    },
    {
      name: "badgeVariants",
      description: "The `cva` function behind `Badge`, for styling other elements like a badge.",
      props: [
        { name: "variant", type: "same as Badge", description: "" },
        { name: "size", type: "same as Badge", description: "" },
      ],
    },
  ],
} satisfies ComponentDoc
