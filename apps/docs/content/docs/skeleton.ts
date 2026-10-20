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
      "body": "Skeletons are `aria-hidden`. Mark the loading region with `aria-busy` and a label. The pulse stops under reduced motion."
    }
  ],
  "api": [
    {
      "name": "Skeleton",
      "description": "Size comes from `className`.",
      "extends": "div",
      "props": [
        {
          "name": "shape",
          "type": "\"default\" | \"circle\" | \"card\"",
          "description": "Corner shape; round suits avatars and `rounded-xl` suits media.",
          "default": "\"default\""
        }
      ]
    }
  ]
} satisfies ComponentDoc
