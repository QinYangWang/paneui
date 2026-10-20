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
      "body": "The group has `role=\"group\"`; give it an `aria-label`. For a set where one option is chosen, use `ToggleGroup` instead."
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
          "description": "Direction of the joined buttons.",
          "default": "\"horizontal\""
        }
      ]
    },
    {
      "name": "ButtonGroupSeparator",
      "description": "A hairline between filled buttons.",
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
      "description": "A label on the group's fill.",
      "extends": "div",
      "props": []
    }
  ]
} satisfies ComponentDoc
