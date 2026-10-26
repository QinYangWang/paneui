import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows daily activity on a calendar.", "zh": "在日历中展示每日活动量。"},
  usage: {
    imports: `import { HeatCalendar } from "@/components/ui/heat-calendar"`,
    code: `<HeatCalendar
  label="Commit activity"
  unit="commits"
  weeks={12}
  data={[
    { date: "2026-10-12", count: 4 },
    { date: "2026-10-13", count: 9 },
  ]}
/>`,
  },
  composition: `HeatCalendar
├── HeatCalendarGrid
│   └── HeatCalendarTooltip
├── HeatCalendarSummary
└── HeatCalendarLegend`,
  examples: [
    {
      id: "monday-start",
      title: { en: "Monday Start", zh: "周一开始" },
    },
    {
      id: "full-year",
      title: { en: "Full Year", zh: "全年" },
    },
    {
      id: "custom-composition",
      title: { en: "Custom Composition", zh: "自定义组合" },
      description: { en: "Arrange the parts yourself when you need another layout or your own tooltip body.", zh: "适用于需要自定义布局或提示内容的场景。" },
    },
    {
      id: "default-selection",
      title: { en: "Default Selection", zh: "默认选择" },
    },
  ],
  notes: [
    {
      title: "Selecting ranges",
      body: { en: "Drag across days with the pointer. With the keyboard, the arrow keys move between days, `Enter` or `Space` starts and then ends a range, `Shift` + arrows extend it and `Esc` clears.", zh: "用指针在日期间拖拽。使用键盘时，方向键在日期间移动，`Enter` 或 `Space` 开始然后结束范围，`Shift` + 方向键扩展范围，`Esc` 清除。" },
    },
    {
      title: "Dates",
      body: { en: "All dates are UTC `YYYY-MM-DD` strings. Days after `endDate` render as empty placeholders, and the grid starts scrolled to the latest week.", zh: "所有日期都是 UTC `YYYY-MM-DD` 字符串。`endDate` 之后的日期渲染为空占位符，网格初始滚动到最新一周。" },
    },
  ],
  api: [
    {
      name: "HeatCalendar",
      description: { en: "Root and context. Without children it renders the grid with tooltip, then summary and legend.", zh: "根和上下文。没有 children 时渲染带提示的网格，然后是摘要和图例。" },
      extends: "div",
      props: [
        { name: "data", type: "{ date: string; count: number }[]", required: true, description: { en: "Daily counts; duplicates are summed.", zh: "每日计数；重复项会求和。" } },
        { name: "endDate", type: "string", default: "latest date in data", description: { en: "Last UTC day shown.", zh: "显示的最后 UTC 日期。" } },
        { name: "weeks", type: "number", default: "26", description: { en: "Number of week columns.", zh: "周列数。" } },
        { name: "weekStartsOn", type: "0 | 1", default: "0", description: { en: "0 = Sunday, 1 = Monday.", zh: "0 = 周日，1 = 周一。" } },
        { name: "unit", type: "string", default: "the locale's", description: { en: "Noun after every count.", zh: "每个计数后的名词。" } },
        { name: "color", type: "string", default: `"var(--chart-4, var(--success))"`, description: { en: "The single hue; strength maps to count.", zh: "单一色相；强度映射到计数。" } },
        { name: "maxCount", type: "number", default: "visible maximum", description: { en: "Count that maps to the strongest level.", zh: "映射到最强级别的计数。" } },
        { name: "cellSize", type: "number", default: "12", description: { en: "Cell size in px.", zh: "单元格尺寸，单位 px。" } },
        { name: "gap", type: "number", default: "3", description: { en: "Gap between cells in px.", zh: "单元格之间的间距，单位 px。" } },
        { name: "label", type: "string", default: "the locale's", description: { en: "Accessible name.", zh: "无障碍名称。" } },
        { name: "selection", type: "{ start: string; end?: string } | null", description: { en: "Controlled selected range.", zh: "受控的选中范围。" } },
        { name: "defaultSelection", type: "{ start: string; end?: string } | null", default: "null", description: { en: "Initially selected range.", zh: "初始选中的范围。" } },
        { name: "onSelectionChange", type: "(selection) => void", description: { en: "Called when a range is started, finished or cleared.", zh: "范围开始、结束或清除时调用。" } },
        { name: "children", type: "ReactNode", description: { en: "Custom composition of parts.", zh: "各部分的自定义组合。" } },
      ],
    },
    {
      name: "HeatCalendarGrid",
      description: { en: "The scrollable day grid with month and weekday labels.", zh: "可滚动的日期网格，带月份和星期标签。" },
      props: [
        { name: "children", type: "ReactNode", default: "<HeatCalendarTooltip />", description: { en: "Overlay rendered over the grid.", zh: "叠加在网格上的弹出层。" } },
        { name: "className", type: "string", description: { en: "Classes for the outer element.", zh: "外层元素的 class。" } },
      ],
      dataAttributes: [
        { name: "data-level", description: { en: "On each cell: 0 (empty) to 4 (strongest).", zh: "在每个单元格上：0（空）到 4（最强）。" } },
        { name: "data-selected", description: { en: "On cells inside the selected range.", zh: "在选中范围内的单元格上。" } },
      ],
    },
    {
      name: "HeatCalendarTooltip",
      props: [
        {
          name: "children",
          type: "(day: { date: string; time: number; count: number; level: number }) => ReactNode",
          description: { en: "Custom body for the hovered or focused day.", zh: "悬停或聚焦日期的自定义内容。" },
        },
        { name: "className", type: "string", description: { en: "Classes for the tooltip.", zh: "提示的 class。" } },
      ],
    },
    { name: "HeatCalendarSummary", description: { en: "Total for the period, or for the selected range with active days and Clear.", zh: "该周期的总计，或选中范围的总计，带活跃天数和 Clear。" }, extends: "div", props: [] },
    { name: "HeatCalendarLegend", description: { en: "Less-to-more swatch scale.", zh: "从少到多的色块刻度。" }, extends: "div", props: [] },
    {
      name: "useHeatCalendar",
      description: { en: "Reads the root context (days, totals, selection, colours) to build your own parts.", zh: "读取根上下文（日期、总计、选择、颜色）以构建你自己的部分。" },
      props: [],
    },
    {
      name: "generateHeatCalendarData",
      description: { en: "Deterministic demo data with quieter weekends, called as `generateHeatCalendarData(rand, options)`.", zh: "确定性的演示数据，周末更安静，以 `generateHeatCalendarData(rand, options)` 调用。" },
      props: [
        { name: "rand", type: "() => number", required: true, description: { en: "Random source (first argument).", zh: "随机源（第一个参数）。" } },
        { name: "endDate", type: "string", default: `"2026-10-13"`, description: { en: "Last day generated.", zh: "生成的最后一天。" } },
        { name: "days", type: "number", default: "371", description: { en: "Number of days.", zh: "天数。" } },
        { name: "intensity", type: "number", default: "9", description: { en: "Rough maximum daily count.", zh: "每日计数的大致最大值。" } },
      ],
    },
  ],
} satisfies ComponentDoc
