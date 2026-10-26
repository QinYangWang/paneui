import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Field that opens a calendar to pick one date.", "zh": "打开日历选择日期。"},
  "usage": {
    "imports": "import { DatePicker } from \"@/components/ui/date-picker\"",
    "code": "const [date, setDate] = React.useState<Date | null>(null)\n\n<DatePicker value={date} onValueChange={setDate} />"
  },
  "examples": [
    {
      "id": "sizes",
      "title": {"en":"Sizes","zh":"尺寸"}
    }
  ],
  "notes": [
    {
      "title": "Behaviour",
      "body": { en: "Picking a date closes the popup and returns focus to the trigger; pass `keepOpen` to leave it open. Inside a sized `Field` the trigger follows the field's size.", zh: "选择日期后关闭弹出层并将焦点返回触发器；传入 `keepOpen` 可保持打开。在设定尺寸的 `Field` 内，触发器跟随字段的尺寸。" }
    }
  ],
  "api": [
    {
      "name": "DatePicker",
      "description": { en: "Every `Calendar` prop except `mode` passes through to the calendar.", zh: "除 `mode` 外，每个 `Calendar` prop 都透传给日历。" },
      "extends": "Calendar",
      "extendsHref": "/docs/calendar#api-reference",
      "props": [
        {
          "name": "value",
          "type": "Date | null",
          "description": { en: "Controlled date.", zh: "受控日期。" }
        },
        {
          "name": "onValueChange",
          "type": "(date: Date | null) => void",
          "description": { en: "Called when a date is picked.", zh: "选择日期时调用。" }
        },
        {
          "name": "placeholder",
          "type": "string",
          "description": { en: "Trigger text with no date.", zh: "无日期时的触发器文本。" },
          "default": "\"Pick a date\""
        },
        {
          "name": "formatOptions",
          "type": "Intl.DateTimeFormatOptions",
          "description": { en: "How the date reads on the trigger.", zh: "日期在触发器上的显示方式。" },
          "default": "{ dateStyle: \"medium\" }"
        },
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"default\" | \"lg\"",
          "description": { en: "Trigger height (24 / 28 / 32 / 36px).", zh: "触发器高度（24 / 28 / 32 / 36px）。" },
          "default": "\"default\""
        },
        {
          "name": "keepOpen",
          "type": "boolean",
          "description": { en: "Stay open after a pick.", zh: "选择后保持打开。" },
          "default": "false"
        }
      ]
    }
  ]
} satisfies ComponentDoc
