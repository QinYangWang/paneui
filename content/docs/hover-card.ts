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
      "body": "For a glance at a linked thing (a person, a repo, an issue) before following the link. Content must be optional: touch users never see it, so never put actions only here."
    }
  ],
  "api": [
    {
      "name": "HoverCard",
      "description": "Re-export of the primitive root.",
      "extends": "PreviewCard.Root",
      "extendsHref": "https://base-ui.com/react/components/preview-card#root",
      "props": []
    },
    {
      "name": "HoverCardTrigger",
      "description": "A link by default.",
      "extends": "PreviewCard.Trigger",
      "extendsHref": "https://base-ui.com/react/components/preview-card#trigger",
      "props": [
        {
          "name": "delay",
          "type": "number",
          "description": "ms before opening.",
          "default": "500"
        },
        {
          "name": "closeDelay",
          "type": "number",
          "description": "ms before closing.",
          "default": "200"
        },
        {
          "name": "variant",
          "type": "\"link\" | \"plain\"",
          "description": "`plain` drops the link styling when `render` passes a Button.",
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
