import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows how far a task has come.", "zh": "显示任务完成进度。"},
  "baseUi": {
    "name": "Progress",
    "href": "https://base-ui.com/react/components/progress"
  },
  "usage": {
    "imports": "import { Progress, ProgressLabel, ProgressValue } from \"@/components/ui/progress\"",
    "code": "<Progress value={64}>\n  <ProgressLabel>Uploading</ProgressLabel>\n  <ProgressValue />\n</Progress>"
  },
  "examples": [
    {
      "id": "tones",
      "title": {"en":"Tones","zh":"色调"},
      "description": {"en":"Use when a bar reports a storage or quota limit.","zh":"适用于提示存储或配额上限的进度条。"}
    },
    {
      "id": "rtl",
      "title": {"en":"RTL","zh":"从右到左"},
    }
  ],
  "notes": [
    {
      "title": "Motion",
      "body": "The fill eases to each new value over 300ms. With `value={null}` the bar is indeterminate: it slides across the track, and pulses in place under reduced motion."
    }
  ],
  "api": [
    {
      "name": "Progress",
      "extends": "Progress.Root",
      "extendsHref": "https://base-ui.com/react/components/progress#root",
      "props": [
        {
          "name": "value",
          "type": "number | null",
          "description": "Current value; `null` is indeterminate.",
          "required": true
        },
        {
          "name": "size",
          "type": "\"sm\" | \"default\" | \"lg\"",
          "description": "Track height (4 / 6 / 8px).",
          "default": "\"default\""
        },
        {
          "name": "tone",
          "type": "\"default\" | \"success\" | \"warning\" | \"destructive\"",
          "description": "Fill colour.",
          "default": "\"default\""
        },
        {
          "name": "children",
          "type": "ReactNode",
          "description": "Label and value row above the track."
        }
      ]
    },
    {
      "name": "ProgressLabel",
      "extends": "Progress.Label",
      "extendsHref": "https://base-ui.com/react/components/progress#label",
      "props": []
    },
    {
      "name": "ProgressValue",
      "description": "Formatted percentage by default.",
      "extends": "Progress.Value",
      "extendsHref": "https://base-ui.com/react/components/progress#value",
      "props": []
    }
  ]
} satisfies ComponentDoc
