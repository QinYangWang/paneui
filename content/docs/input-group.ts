import type { ComponentDoc } from "@/lib/doc-types"

export default {
  "usage": {
    "imports": "import {\n  InputGroup,\n  InputGroupAddon,\n  InputGroupButton,\n  InputGroupInput,\n  InputGroupText,\n} from \"@/components/ui/input-group\"",
    "code": "<InputGroup>\n  <InputGroupAddon>\n    <SearchIcon />\n  </InputGroupAddon>\n  <InputGroupInput placeholder=\"Search\" />\n  <InputGroupAddon align=\"inline-end\">\n    <InputGroupButton>Go</InputGroupButton>\n  </InputGroupAddon>\n</InputGroup>"
  },
  "composition": "InputGroup\n├── InputGroupAddon (inline-start | inline-end | block-start | block-end)\n│   ├── InputGroupText\n│   └── InputGroupButton\n└── InputGroupInput  (or InputGroupTextarea)",
  "examples": [
    {
      "id": "textarea",
      "title": "Textarea",
      "description": "Use `block-end` addons for a composer toolbar under the text."
    },
    {
      "id": "sizes",
      "title": "Sizes"
    },
    {
      "id": "rtl",
      "title": "RTL",
      "description": "For right-to-left languages, wrap the tree in `DirectionProvider` and set `dir=\"rtl\"` on its root."
    }
  ],
  "notes": [
    {
      "title": "Behaviour",
      "body": "The group draws the well and the focus ring; the input inside is bare. Clicking an addon (not its buttons) focuses the input. Buttons inside are concentric with the well at every size."
    }
  ],
  "api": [
    {
      "name": "InputGroup",
      "extends": "div",
      "props": [
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"default\" | \"lg\"",
          "description": "Height (24 / 28 / 32 / 36px); also sizes buttons inside. Follows a sized `Field`.",
          "default": "\"default\""
        }
      ]
    },
    {
      "name": "InputGroupAddon",
      "extends": "div",
      "props": [
        {
          "name": "align",
          "type": "\"inline-start\" | \"inline-end\" | \"block-start\" | \"block-end\"",
          "description": "Where the addon sits. Block addons make the group a column.",
          "default": "\"inline-start\""
        }
      ]
    },
    {
      "name": "InputGroupButton",
      "extends": "Button",
      "extendsHref": "/docs/button#api-reference",
      "props": [
        {
          "name": "variant",
          "type": "Button variant",
          "description": "",
          "default": "\"ghost\""
        },
        {
          "name": "size",
          "type": "Button size",
          "description": "Use `icon-xs` for an icon-only button.",
          "default": "\"xs\""
        }
      ]
    },
    {
      "name": "InputGroupInput",
      "extends": "input",
      "props": []
    },
    {
      "name": "InputGroupTextarea",
      "description": "Grows with its content.",
      "extends": "textarea",
      "props": []
    },
    {
      "name": "InputGroupText",
      "extends": "span",
      "props": []
    }
  ]
} satisfies ComponentDoc
