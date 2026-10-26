import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Divides groups of content with a hairline.", "zh": "分隔相关内容组。"},
  "baseUi": {
    "name": "Separator",
    "href": "https://base-ui.com/react/components/separator"
  },
  "usage": {
    "imports": "import { Separator } from \"@/components/ui/separator\"",
    "code": "<Separator />\n<Separator orientation=\"vertical\" />"
  },
  "examples": [
    {
      "id": "list",
      "title": {"en":"List","zh":"列表"}
    }
  ],
  "api": [
    {
      "name": "Separator",
      "extends": "Separator",
      "extendsHref": "https://base-ui.com/react/components/separator",
      "props": [
        {
          "name": "orientation",
          "type": "\"horizontal\" | \"vertical\"",
          "description": { en: "A vertical one stretches to its row's height.", zh: "垂直的会拉伸到其行的高度。" },
          "default": "\"horizontal\""
        }
      ]
    }
  ]
} satisfies ComponentDoc
