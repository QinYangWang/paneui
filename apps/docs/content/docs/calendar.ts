import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Month grid for picking a date or a range.", "zh": "在月历中选择日期。"},
  "usage": {
    "imports": "import { Calendar } from \"@/components/ui/calendar\"",
    "code": "const [date, setDate] = React.useState<Date | null>(new Date())\n\n<Calendar value={date} onValueChange={setDate} />"
  },
  "examples": [
    {
      "id": "range",
      "title": {"en":"Range","zh":"范围"}
    },
    {
      "id": "disabled-days",
      "title": {"en":"Disabled Days","zh":"不可选日期"},
      "description": {"en":"Use when only some days can be booked.","zh":"适用于只有部分日期可预约的场景。"}
    },
    {
      "id": "rtl",
      "title": {"en":"RTL","zh":"从右到左"},
    }
  ],
  "notes": [
    {
      "title": "Keyboard",
      "body": "Arrow keys move by day and week, Home/End to the edges of the week, PageUp/PageDown by month and Shift+PageUp/PageDown by year. One day in the grid is tabbable."
    },
    {
      "title": "Locale",
      "body": "Month names, weekday initials and the first day of the week follow `locale` (the browser's by default). Set `weekStartsOn` to override the week."
    }
  ],
  "api": [
    {
      "name": "Calendar",
      "extends": "div",
      "props": [
        {
          "name": "mode",
          "type": "\"single\" | \"range\"",
          "description": "Pick one date or a range.",
          "default": "\"single\""
        },
        {
          "name": "value",
          "type": "Date | null  ·  { from?: Date; to?: Date }",
          "description": "Controlled selection (shape follows `mode`)."
        },
        {
          "name": "defaultValue",
          "type": "same as value",
          "description": "Initial selection when uncontrolled."
        },
        {
          "name": "onValueChange",
          "type": "(value) => void",
          "description": "Called with the new date or range. Clicking the selected date clears a single selection."
        },
        {
          "name": "month",
          "type": "Date",
          "description": "Controlled first visible month."
        },
        {
          "name": "defaultMonth",
          "type": "Date",
          "description": "First visible month when uncontrolled.",
          "default": "the selection's month or today"
        },
        {
          "name": "onMonthChange",
          "type": "(month: Date) => void",
          "description": "Called when the visible month changes."
        },
        {
          "name": "numberOfMonths",
          "type": "number",
          "description": "Months side by side.",
          "default": "1"
        },
        {
          "name": "min",
          "type": "Date",
          "description": "Earliest selectable day."
        },
        {
          "name": "max",
          "type": "Date",
          "description": "Latest selectable day."
        },
        {
          "name": "disabled",
          "type": "(date: Date) => boolean",
          "description": "Extra unavailable days."
        },
        {
          "name": "weekStartsOn",
          "type": "0–6",
          "description": "First weekday (0 = Sunday).",
          "default": "the locale's"
        },
        {
          "name": "locale",
          "type": "string",
          "description": "BCP 47 locale for names and week start."
        },
        {
          "name": "showOutsideDays",
          "type": "boolean",
          "description": "Show neighbouring months' days (one month only).",
          "default": "true"
        }
      ]
    }
  ]
} satisfies ComponentDoc
