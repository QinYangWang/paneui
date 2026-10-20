import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows a keyboard key or shortcut.", "zh": "显示按键或快捷键。"},
  "usage": {
    "imports": "import { Kbd, KbdGroup } from \"@/components/ui/kbd\"",
    "code": "<KbdGroup>\n  <Kbd>⌘</Kbd>\n  <Kbd>K</Kbd>\n</KbdGroup>"
  },
  "examples": [
    {
      "id": "sizes",
      "title": {"en":"Sizes","zh":"尺寸"}
    },
    {
      "id": "in-button",
      "title": {"en":"In a Button","zh":"用于按钮"}
    }
  ],
  "notes": [
    {
      "title": "Tooltips",
      "body": "`TooltipKbd` is a small `Kbd` on the tooltip's own fill, so shortcuts read the same in tooltips, menus and buttons."
    }
  ],
  "api": [
    {
      "name": "Kbd",
      "extends": "kbd",
      "props": [
        {
          "name": "size",
          "type": "\"sm\" | \"default\" | \"lg\"",
          "description": "Key height (16 / 20 / 24px).",
          "default": "\"default\""
        }
      ]
    },
    {
      "name": "KbdGroup",
      "description": "Keys pressed together or in sequence.",
      "extends": "kbd",
      "props": []
    }
  ]
} satisfies ComponentDoc
