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
      "body": { en: "The fill eases to each new value over 300ms. With `value={null}` the bar is indeterminate: it slides across the track, and pulses in place under reduced motion.", zh: "填充在 300ms 内缓动到每个新值。使用 `value={null}` 时，进度条为不确定状态：它在轨道上滑动，并在减少动态效果下原地脉冲。" }
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
          "description": { en: "Current value; `null` is indeterminate.", zh: "当前值；`null` 表示不确定。" },
          "required": true
        },
        {
          "name": "size",
          "type": "\"sm\" | \"default\" | \"lg\"",
          "description": { en: "Track height (4 / 6 / 8px).", zh: "轨道高度（4 / 6 / 8px）。" },
          "default": "\"default\""
        },
        {
          "name": "tone",
          "type": "\"default\" | \"success\" | \"warning\" | \"destructive\"",
          "description": { en: "Fill colour.", zh: "填充颜色。" },
          "default": "\"default\""
        },
        {
          "name": "children",
          "type": "ReactNode",
          "description": { en: "Label and value row above the track.", zh: "轨道上方的标签和值行。" }
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
      "description": { en: "Formatted percentage by default.", zh: "默认格式化为百分比。" },
      "extends": "Progress.Value",
      "extendsHref": "https://base-ui.com/react/components/progress#value",
      "props": []
    }
  ]
} satisfies ComponentDoc
