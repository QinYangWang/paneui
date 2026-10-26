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
      "body": { en: "Arrow keys move by day and week, Home/End to the edges of the week, PageUp/PageDown by month and Shift+PageUp/PageDown by year. One day in the grid is tabbable.", zh: "方向键按天和按周移动，Home/End 到一周的边缘，PageUp/PageDown 按月，Shift+PageUp/PageDown 按年。网格中的一天可 Tab 聚焦。" }
    },
    {
      "title": "Locale",
      "body": { en: "Month names, weekday initials and the first day of the week follow `locale` (the browser's by default). Set `weekStartsOn` to override the week.", zh: "月份名称、星期首字母和一周的第一天遵循 `locale`（默认为浏览器）。设置 `weekStartsOn` 以覆盖一周起始。" }
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
          "description": { en: "Pick one date or a range.", zh: "选择一个日期或范围。" },
          "default": "\"single\""
        },
        {
          "name": "value",
          "type": "Date | null  ·  { from?: Date; to?: Date }",
          "description": { en: "Controlled selection (shape follows `mode`).", zh: "受控选择（形状遵循 `mode`）。" }
        },
        {
          "name": "defaultValue",
          "type": "same as value",
          "description": { en: "Initial selection when uncontrolled.", zh: "非受控时的初始选择。" }
        },
        {
          "name": "onValueChange",
          "type": "(value) => void",
          "description": { en: "Called with the new date or range. Clicking the selected date clears a single selection.", zh: "以新日期或范围调用。点击已选日期会清除单选。" }
        },
        {
          "name": "month",
          "type": "Date",
          "description": { en: "Controlled first visible month.", zh: "受控的首个可见月份。" }
        },
        {
          "name": "defaultMonth",
          "type": "Date",
          "description": { en: "First visible month when uncontrolled.", zh: "非受控时的首个可见月份。" },
          "default": "the selection's month or today"
        },
        {
          "name": "onMonthChange",
          "type": "(month: Date) => void",
          "description": { en: "Called when the visible month changes.", zh: "可见月份变化时调用。" }
        },
        {
          "name": "numberOfMonths",
          "type": "number",
          "description": { en: "Months side by side.", zh: "并排的月份。" },
          "default": "1"
        },
        {
          "name": "min",
          "type": "Date",
          "description": { en: "Earliest selectable day.", zh: "最早可选日期。" }
        },
        {
          "name": "max",
          "type": "Date",
          "description": { en: "Latest selectable day.", zh: "最晚可选日期。" }
        },
        {
          "name": "disabled",
          "type": "(date: Date) => boolean",
          "description": { en: "Extra unavailable days.", zh: "额外不可用日期。" }
        },
        {
          "name": "weekStartsOn",
          "type": "0–6",
          "description": { en: "First weekday (0 = Sunday).", zh: "一周的第一天（0 = 星期日）。" },
          "default": "the locale's"
        },
        {
          "name": "locale",
          "type": "string",
          "description": { en: "BCP 47 locale for names and week start.", zh: "用于名称和周起始的 BCP 47 区域设置。" }
        },
        {
          "name": "showOutsideDays",
          "type": "boolean",
          "description": { en: "Show neighbouring months' days (one month only).", zh: "显示相邻月份的日期（仅一个月）。" },
          "default": "true"
        }
      ]
    }
  ]
} satisfies ComponentDoc
