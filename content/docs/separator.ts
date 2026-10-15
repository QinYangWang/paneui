import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      "title": "List"
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
          "description": "A vertical one stretches to its row's height.",
          "default": "\"horizontal\""
        }
      ]
    }
  ]
} satisfies ComponentDoc
