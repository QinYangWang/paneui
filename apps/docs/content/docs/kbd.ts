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
      "body": { en: "`TooltipKbd` is a small `Kbd` on the tooltip's own fill, so shortcuts read the same in tooltips, menus and buttons.", zh: "`TooltipKbd` 是提示自身填充上的小号 `Kbd`，因此快捷键在提示、菜单和按钮中读起来一致。" }
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
          "description": { en: "Key height (16 / 20 / 24px).", zh: "按键高度（16 / 20 / 24px）。" },
          "default": "\"default\""
        }
      ]
    },
    {
      "name": "KbdGroup",
      "description": { en: "Keys pressed together or in sequence.", zh: "一起或按顺序按下的键。" },
      "extends": "kbd",
      "props": []
    }
  ]
} satisfies ComponentDoc
