import type { ComponentDoc } from "@/lib/doc-types"

export default {
  "usage": {
    "imports": "import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from \"@/components/ui/button-group\"",
    "code": "<ButtonGroup aria-label=\"Alignment\">\n  <Button variant=\"outline\">Left</Button>\n  <Button variant=\"outline\">Center</Button>\n  <Button variant=\"outline\">Right</Button>\n</ButtonGroup>"
  },
  "examples": [
    {
      "id": "vertical",
      "title": "Vertical"
    },
    {
      "id": "nested",
      "title": "Nested",
      "description": "Nest groups to space clusters apart in one toolbar."
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
