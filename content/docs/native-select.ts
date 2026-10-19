import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "The browser's own select, styled as a field.", "zh": "使用浏览器原生选择控件。"},
  "usage": {
    "imports": "import { NativeSelect, NativeSelectOption } from \"@/components/ui/native-select\"",
    "code": "<NativeSelect defaultValue=\"name\">\n  <NativeSelectOption value=\"name\">Name</NativeSelectOption>\n  <NativeSelectOption value=\"date\">Date</NativeSelectOption>\n</NativeSelect>"
  },
  "examples": [
    {
      "id": "sizes",
      "title": {"en":"Sizes","zh":"尺寸"}
    }
  ],
  "notes": [
    {
      "title": "When to use",
      "body": "Prefer it to `Select` on touch devices, in long forms and wherever the platform picker helps. Use `Select` when options need icons or custom rows."
    }
  ],
  "api": [
    {
      "name": "NativeSelect",
      "description": "`className` goes on the wrapper, so width utilities apply to the field.",
      "extends": "select",
      "props": [
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"default\" | \"lg\"",
          "description": "Height (24 / 28 / 32 / 36px). Follows a sized `Field`.",
          "default": "\"default\""
        },
        {
          "name": "htmlSize",
          "type": "number",
          "description": "The native `size` attribute."
        }
      ]
    },
    {
      "name": "NativeSelectOption",
      "extends": "option",
      "props": []
    },
    {
      "name": "NativeSelectOptGroup",
      "extends": "optgroup",
      "props": []
    }
  ]
} satisfies ComponentDoc
