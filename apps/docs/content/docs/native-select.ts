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
      "body": { en: "Prefer it to `Select` on touch devices, in long forms and wherever the platform picker helps. Use `Select` when options need icons or custom rows.", zh: "在触摸设备、长表单以及平台选择器更有帮助的场景中，优先使用它而非 `Select`。需要图标或自定义行时使用 `Select`。" }
    }
  ],
  "api": [
    {
      "name": "NativeSelect",
      "description": { en: "`className` goes on the wrapper, so width utilities apply to the field.", zh: "`className` 作用于外层容器，因此宽度工具类会应用到字段上。" },
      "extends": "select",
      "props": [
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"default\" | \"lg\"",
          "description": { en: "Height (24 / 28 / 32 / 36px). Follows a sized `Field`.", zh: "高度（24 / 28 / 32 / 36px）。跟随设置了尺寸的 `Field`。" },
          "default": "\"default\""
        },
        {
          "name": "htmlSize",
          "type": "number",
          "description": { en: "The native `size` attribute.", zh: "原生 `size` 属性。" }
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
