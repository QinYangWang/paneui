import type { ComponentDoc } from "@/lib/doc-types"

const POPOVER = "https://base-ui.com/react/components/popover"

export default {
  summary: {"en": "Picks a start and end date from a calendar.", "zh": "在日历中选择起止日期。"},
  baseUi: { name: "Popover", href: POPOVER },
  usage: {
    imports: `import { DateRangePicker, DateRangePickerCalendar, DateRangePickerContent, DateRangePickerTrigger } from "@/components/ui/date-range-picker"`,
    code: `<DateRangePicker>
  <DateRangePickerTrigger />
  <DateRangePickerContent>
    <DateRangePickerCalendar />
  </DateRangePickerContent>
</DateRangePicker>`,
  },
  composition: `DateRangePicker
├── DateRangePickerTrigger
└── DateRangePickerContent
    ├── DateRangePickerPresets
    │   └── DateRangePickerPreset
    ├── DateRangePickerCalendar
    │   └── DateRangePickerGrid (one per month)
    └── DateRangePickerFooter
        ├── DateRangePickerSummary
        └── DateRangePickerClear`,
  examples: [
    {
      id: "inline",
      title: { en: "Inline", zh: "行内" },
      description: { en: "Leave out the trigger and content when the calendar should sit in the page instead of a popup.", zh: "适用于日历直接放在页面中的场景。" },
    },
    {
      id: "unavailable-dates",
      title: { en: "Unavailable Dates", zh: "不可选日期" },
    },
    {
      id: "locale",
      title: { en: "Locale", zh: "语言" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Each month is a `grid` with one tab stop. Arrows move by day and week, Home/End to the week's edges, PageUp/PageDown by month (with Shift, by year). Enter or Space picks the start, then the end; while choosing the end the range previews.", zh: "每个月是一个 `grid`，只有一个 Tab 停靠点。方向键按天和按周移动，Home/End 到一周的边缘，PageUp/PageDown 按月（配合 Shift 按年）。Enter 或 Space 先选开始，再选结束；选择结束时预览范围。" },
    },
    {
      title: "Motion",
      body: { en: "With reduced motion, month changes cross-fade instead of sliding.", zh: "启用减少动态效果时，月份切换为交叉淡入而非滑动。" },
    },
    {
      title: "Related",
      body: { en: "See also [Wheel Picker](/docs/wheel-picker) and [Color Picker](/docs/color-picker).", zh: "另见 [Wheel Picker](/docs/wheel-picker) 和 [Color Picker](/docs/color-picker)。" },
    },
  ],
  api: [
    {
      name: "DateRangePicker",
      description: { en: "Range state plus the popover root. Dates are local-midnight `Date`s.", zh: "范围状态以及弹出层根节点。日期为本地午夜的 `Date`。" },
      extends: "Popover.Root",
      extendsHref: `${POPOVER}#root`,
      props: [
        { name: "value", type: "{ from?: Date; to?: Date }", description: { en: "Controlled range.", zh: "受控范围。" } },
        { name: "defaultValue", type: "{ from?: Date; to?: Date }", default: "{}", description: { en: "Initial range when uncontrolled.", zh: "非受控时的初始范围。" } },
        { name: "onValueChange", type: "(range: DateRange) => void", description: { en: "Called on every pick, clear or preset.", zh: "每次选择、清除或使用预设时调用。" } },
        { name: "locale", type: "string", default: "the browser's", description: { en: "BCP 47 locale for names and formatting.", zh: "用于名称和格式化的 BCP 47 区域设置。" } },
        {
          name: "weekStartsOn",
          type: "number",
          default: "the locale's",
          description: { en: "First column: `0` Sunday … `6` Saturday.", zh: "第一列：`0` 周日至 `6` 周六。" },
        },
        { name: "numberOfMonths", type: "1 | 2", default: "1", description: { en: "Months shown side by side.", zh: "并排显示的月份数。" } },
        { name: "min", type: "Date", description: { en: "Earliest selectable day.", zh: "最早可选日期。" } },
        { name: "max", type: "Date", description: { en: "Latest selectable day.", zh: "最晚可选日期。" } },
        { name: "isDateDisabled", type: "(date: Date) => boolean", description: { en: "Extra rule for unavailable days.", zh: "不可用日期的额外规则。" } },
        { name: "closeOnComplete", type: "boolean", default: "false", description: { en: "Close the popover once both ends are picked.", zh: "两端都选好后关闭弹出层。" } },
      ],
    },
    {
      name: "DateRangePickerTrigger",
      description: { en: "Button that shows the formatted range (`Intl.formatRange`).", zh: "显示格式化范围的按钮（`Intl.formatRange`）。" },
      extends: "Popover.Trigger",
      extendsHref: `${POPOVER}#trigger`,
      props: [
        { name: "placeholder", type: "string", default: `"Pick dates"`, description: { en: "Shown while nothing is selected.", zh: "未选择任何内容时显示。" } },
        {
          name: "formatOptions",
          type: "Intl.DateTimeFormatOptions",
          default: `{ month: "short", day: "numeric", year: "numeric" }`,
          description: { en: "How the range is formatted.", zh: "范围的格式化方式。" },
        },
      ],
      dataAttributes: [{ name: "data-placeholder", description: { en: "Present while showing the placeholder.", zh: "显示占位符时存在。" } }],
    },
    {
      name: "DateRangePickerContent",
      description: { en: "The library `PopoverContent` with tighter padding and auto width.", zh: "组件库的 `PopoverContent`，内边距更紧凑且自动宽度。" },
      extends: "PopoverContent",
      extendsHref: "/docs/popover",
      props: [{ name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: { en: "Trigger edge the panel lines up with.", zh: "面板对齐的触发器边缘。" } }],
    },
    {
      name: "DateRangePickerCalendar",
      description: { en: "Month titles, previous/next buttons and one grid per visible month.", zh: "月份标题、上一个/下一个按钮及每个可见月份一个网格。" },
      extends: "div",
      props: [],
    },
    {
      name: "DateRangePickerGrid",
      description: { en: "One month's day grid with roving focus. Used by the calendar; render it yourself for custom layouts.", zh: "单个月份的日期网格，带漫游焦点。由日历使用；需自定义布局时自行渲染。" },
      extends: "div",
      props: [
        { name: "month", type: "Date", required: true, description: { en: "Any day in the month to show.", zh: "要显示的月份中的任意一天。" } },
        { name: "hideOutsideDays", type: "boolean", default: "false", description: { en: "Leave days of neighbouring months blank.", zh: "相邻月份的日期留空。" } },
      ],
      dataAttributes: [
        { name: "data-selected", description: { en: "On a day button that is the start or end.", zh: "在作为开始或结束的日期按钮上。" } },
        { name: "data-in-range", description: { en: "On days between start and end.", zh: "在开始和结束之间的日期上。" } },
        { name: "data-preview-end", description: { en: "On the hovered or focused end while choosing.", zh: "在选择时悬停或聚焦的结束日期上。" } },
        { name: "data-outside", description: { en: "On days from a neighbouring month.", zh: "在相邻月份的日期上。" } },
      ],
    },
    {
      name: "DateRangePickerSummary",
      description: { en: "The range and its length (\"Mar 3 – 9 · 6 nights\"), or a prompt for the next pick, announced in a polite live region.", zh: "范围及其长度（“Mar 3 – 9 · 6 nights”），或下一次选择的提示，通过礼貌的实时区域播报。" },
      extends: "p",
      props: [
        {
          name: "unit",
          type: "[string, string] | null",
          default: `["night", "nights"]`,
          description: { en: "Singular and plural for the length; `null` hides it.", zh: "长度的单数和复数形式；`null` 则隐藏。" },
        },
        { name: "formatOptions", type: "Intl.DateTimeFormatOptions", default: `{ month: "short", day: "numeric" }`, description: { en: "How the range is formatted.", zh: "范围的格式化方式。" } },
      ],
    },
    { name: "DateRangePickerFooter", description: { en: "Row under the calendar, separated by a hairline.", zh: "日历下方的行，用细线分隔。" }, extends: "div", props: [] },
    {
      name: "DateRangePickerClear",
      description: { en: "Clears the range. Disabled while nothing is selected.", zh: "清除范围。未选择任何内容时禁用。" },
      extends: "button",
      props: [{ name: "children", type: "ReactNode", default: `"Clear"`, description: { en: "Button label.", zh: "按钮标签。" } }],
    },
    { name: "DateRangePickerPresets", description: { en: "Vertical group of presets, labelled `Presets`.", zh: "预设的垂直分组，标签为 `Presets`。" }, extends: "div", props: [] },
    {
      name: "DateRangePickerPreset",
      description: { en: "Quick range button; `aria-pressed` when it matches the selection.", zh: "快速范围按钮；与选择匹配时带 `aria-pressed`。" },
      extends: "button",
      props: [
        {
          name: "range",
          type: "DateRange | (() => DateRange)",
          required: true,
          description: { en: "The range to apply. A function is evaluated at click time, e.g. for \"Last 7 days\".", zh: "要应用的范围。函数在点击时求值，例如用于“Last 7 days”。" },
        },
      ],
    },
    {
      name: "useDateRangePicker",
      description: { en: "Picker state and actions for custom parts. Use inside `DateRangePicker`.", zh: "供自定义部件使用的选择器状态和操作。在 `DateRangePicker` 内使用。" },
      props: [
        { name: "range", type: "DateRange", description: { en: "Current range.", zh: "当前范围。" } },
        { name: "setRange", type: "(next: DateRange) => void", description: { en: "Replace the range.", zh: "替换范围。" } },
        { name: "selectDate", type: "(date: Date) => void", description: { en: "Pick a day as if clicked.", zh: "如同点击一样选择某一天。" } },
        { name: "clear", type: "() => void", description: { en: "Clear the range.", zh: "清除范围。" } },
        { name: "month", type: "Date", description: { en: "First visible month.", zh: "第一个可见月份。" } },
        { name: "setMonth", type: "(month: Date) => void", description: { en: "Page to a month.", zh: "翻页到某个月。" } },
        { name: "isDisabled", type: "(date: Date) => boolean", description: { en: "Whether a day is unavailable.", zh: "某一天是否不可用。" } },
        { name: "close", type: "() => void", description: { en: "Close the popover (no-op inline).", zh: "关闭弹出层（内联时为空操作）。" } },
      ],
    },
  ],
} satisfies ComponentDoc
