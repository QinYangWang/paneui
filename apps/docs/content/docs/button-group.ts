import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Joins related buttons into one control.", "zh": "组合相关按钮。"},
  "usage": {
    "imports": "import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from \"@/components/ui/button-group\"",
    "code": "<ButtonGroup aria-label=\"Alignment\">\n  <Button variant=\"outline\">Left</Button>\n  <Button variant=\"outline\">Center</Button>\n  <Button variant=\"outline\">Right</Button>\n</ButtonGroup>"
  },
  "examples": [
    {
      "id": "vertical",
      "title": {"en":"Vertical","zh":"纵向"}
    },
    {
      "id": "nested",
      "title": {"en":"Nested","zh":"嵌套"},
    }
  ],
  "notes": [
    {
      "title": "Accessibility",
      "body": { en: "The group has `role=\"group\"`; give it an `aria-label`. For a set where one option is chosen, use `ToggleGroup` instead.", zh: "该组具有 `role=\"group\"`；请为其提供 `aria-label`。对于需要选择一个选项的集合，请改用 `ToggleGroup`。" }
    }
  ],
  "api": [
    {
      "name": "ButtonGroup",
      "extends": "div",
      "props": [
        {
          "name": "orientation",
          "type": "\"horizontal\" | \"vertical\"",
          "description": { en: "Direction of the joined buttons.", zh: "拼接按钮的方向。" },
          "default": "\"horizontal\""
        }
      ]
    },
    {
      "name": "ButtonGroupSeparator",
      "description": { en: "A hairline between filled buttons.", zh: "填充按钮之间的细线。" },
      "extends": "div",
      "props": [
        {
          "name": "orientation",
          "type": "\"horizontal\" | \"vertical\"",
          "description": "",
          "default": "\"vertical\""
        }
      ]
    },
    {
      "name": "ButtonGroupText",
      "description": { en: "A label on the group's fill.", zh: "组填充上的标签。" },
      "extends": "div",
      "props": []
    }
  ]
} satisfies ComponentDoc
