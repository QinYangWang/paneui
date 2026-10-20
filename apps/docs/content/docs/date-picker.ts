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
      "body": "Picking a date closes the popup and returns focus to the trigger; pass `keepOpen` to leave it open. Inside a sized `Field` the trigger follows the field's size."
    }
  ],
  "api": [
    {
      "name": "DatePicker",
      "description": "Every `Calendar` prop except `mode` passes through to the calendar.",
      "extends": "Calendar",
      "extendsHref": "/docs/calendar#api-reference",
      "props": [
        {
          "name": "value",
          "type": "Date | null",
          "description": "Controlled date."
        },
        {
          "name": "onValueChange",
          "type": "(date: Date | null) => void",
          "description": "Called when a date is picked."
        },
        {
          "name": "placeholder",
          "type": "string",
          "description": "Trigger text with no date.",
          "default": "\"Pick a date\""
        },
        {
          "name": "formatOptions",
          "type": "Intl.DateTimeFormatOptions",
          "description": "How the date reads on the trigger.",
          "default": "{ dateStyle: \"medium\" }"
        },
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"default\" | \"lg\"",
          "description": "Trigger height (24 / 28 / 32 / 36px).",
          "default": "\"default\""
        },
        {
          "name": "keepOpen",
          "type": "boolean",
          "description": "Stay open after a pick.",
          "default": "false"
        }
      ]
    }
  ]
} satisfies ComponentDoc
