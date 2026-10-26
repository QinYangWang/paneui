import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Previews a linked item while it is hovered.", "zh": "悬停时预览链接内容。"},
  "baseUi": {
    "name": "Preview Card",
    "href": "https://base-ui.com/react/components/preview-card"
  },
  "usage": {
    "imports": "import { HoverCard, HoverCardContent, HoverCardTrigger } from \"@/components/ui/hover-card\"",
    "code": "<HoverCard>\n  <HoverCardTrigger href=\"/people/mira\">@mira</HoverCardTrigger>\n  <HoverCardContent>…</HoverCardContent>\n</HoverCard>"
  },
  "composition": "HoverCard\n├── HoverCardTrigger\n└── HoverCardContent",
  "examples": [
    {
      "id": "sides",
      "title": {"en":"Sides","zh":"方向"}
    }
  ],
  "notes": [
    {
      "title": "When to use",
      "body": { en: "For a glance at a linked thing (a person, a repo, an issue) before following the link. Content must be optional: touch users never see it, so never put actions only here.", zh: "用于在访问链接前快速查看链接对象（人员、仓库、issue）。内容必须是可选的：触屏用户永远看不到它，所以绝不要把操作只放在这里。" }
    }
  ],
  "api": [
    {
      "name": "HoverCard",
      "description": { en: "Re-export of the primitive root.", zh: "重新导出 primitive 根。" },
      "extends": "PreviewCard.Root",
      "extendsHref": "https://base-ui.com/react/components/preview-card#root",
      "props": []
    },
    {
      "name": "HoverCardTrigger",
      "description": { en: "A link by default.", zh: "默认为链接。" },
      "extends": "PreviewCard.Trigger",
      "extendsHref": "https://base-ui.com/react/components/preview-card#trigger",
      "props": [
        {
          "name": "delay",
          "type": "number",
          "description": { en: "ms before opening.", zh: "打开前的毫秒数。" },
          "default": "500"
        },
        {
          "name": "closeDelay",
          "type": "number",
          "description": { en: "ms before closing.", zh: "关闭前的毫秒数。" },
          "default": "200"
        },
        {
          "name": "variant",
          "type": "\"link\" | \"plain\"",
          "description": { en: "`plain` drops the link styling when `render` passes a Button.", zh: "当 `render` 传入 Button 时，`plain` 会去掉链接样式。" },
          "default": "\"link\""
        }
      ]
    },
    {
      "name": "HoverCardContent",
      "extends": "PreviewCard.Popup",
      "extendsHref": "https://base-ui.com/react/components/preview-card#popup",
      "props": [
        {
          "name": "side",
          "type": "\"top\" | \"right\" | \"bottom\" | \"left\"",
          "description": "",
          "default": "\"bottom\""
        },
        {
          "name": "align",
          "type": "\"start\" | \"center\" | \"end\"",
          "description": "",
          "default": "\"center\""
        },
        {
          "name": "sideOffset",
          "type": "number",
          "description": "",
          "default": "8"
        }
      ]
    }
  ]
} satisfies ComponentDoc
