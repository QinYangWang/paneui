import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Placeholder shape while content loads.", "zh": "在加载时预留内容位置。"},
  "usage": {
    "imports": "import { Skeleton } from \"@/components/ui/skeleton\"",
    "code": "<Skeleton className=\"h-4 w-32\" />"
  },
  "examples": [
    {
      "id": "card",
      "title": {"en":"Card","zh":"卡片"}
    }
  ],
  "notes": [
    {
      "title": "Accessibility",
      "body": { en: "Skeletons are `aria-hidden`. Mark the loading region with `aria-busy` and a label. The pulse stops under reduced motion.", zh: "骨架为 `aria-hidden`。用 `aria-busy` 和标签标记加载区域。在减少动态效果下脉冲停止。" }
    }
  ],
  "api": [
    {
      "name": "Skeleton",
      "description": { en: "Size comes from `className`.", zh: "尺寸来自 `className`。" },
      "extends": "div",
      "props": [
        {
          "name": "shape",
          "type": "\"default\" | \"circle\" | \"card\"",
          "description": { en: "Corner shape; round suits avatars and `rounded-xl` suits media.", zh: "角落形状；圆角适合头像，`rounded-xl` 适合媒体。" },
          "default": "\"default\""
        }
      ]
    }
  ]
} satisfies ComponentDoc
