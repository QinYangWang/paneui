import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows a service's status history and uptime.", "zh": "展示服务状态历史。"},
  usage: {
    imports: `import { StatusBar } from "@/components/ui/status-bar"`,
    code: `<StatusBar
  title="API"
  label="API status, last 3 days"
  data={[
    { id: "d1", label: "Oct 11", status: "operational" },
    { id: "d2", label: "Oct 12", status: "degraded", description: "Slow p95" },
    { id: "d3", label: "Oct 13", status: "operational" },
  ]}
/>`,
  },
  examples: [
    {
      id: "custom-statuses",
      title: { en: "Custom Statuses", zh: "自定义状态" },
      description: { en: "Use when your states differ from the defaults.", zh: "适用于需要自定义状态的服务。" },
    },
    {
      id: "hourly",
      title: { en: "Hourly", zh: "每小时" },
      description: { en: "Use for short windows such as the last 24 hours.", zh: "适用于最近一天等较短的时间窗口。" },
    },
    {
      id: "compact",
      title: { en: "Compact", zh: "紧凑" },
      description: { en: "Use when stacking several services in one view.", zh: "适用于同屏查看多个服务。" },
    },
    {
      id: "no-data",
      title: { en: "No Data", zh: "无数据" },
      description: { en: "Use for periods before monitoring started.", zh: "适用于监控开始前的时间段。" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Focus the bars, then `ArrowLeft` / `ArrowRight` move between periods, `Home` / `End` jump to the ends and `Esc` clears. On touch, tapping a bar shows its tooltip.", zh: "聚焦条形，然后 `ArrowLeft` / `ArrowRight` 在周期之间移动，`Home` / `End` 跳到两端，`Esc` 清除。在触摸设备上，轻按条形显示其提示。" },
    },
    {
      title: "Motion",
      body: { en: "With reduced motion the bars don't stagger in and the status dot doesn't pulse.", zh: "在减少动态效果下，条形不会交错进入，状态点也不会脉动。" },
    },
  ],
  api: [
    {
      name: "StatusBar",
      extends: "section",
      props: [
        {
          name: "data",
          type: "{ id: string; label: string; status: string; description?: string }[]",
          required: true,
          description: { en: "One bar per period, oldest first. `status` is a key of `statuses`.", zh: "每个周期一根条形，最早的在前。`status` 是 `statuses` 的键。" },
        },
        {
          name: "statuses",
          type: "Record<string, { label: string; color: string; weight?: number | null }>",
          default: "STATUS_BAR_STATUSES",
          description: { en: "Status definitions. Each `weight` feeds the uptime figure (1 up, 0 down, `null` not counted); `nodata` is left out of uptime. Defaults to `STATUS_BAR_STATUSES`.", zh: "状态定义。每个 `weight` 影响正常运行时间数值（1 为正常，0 为故障，`null` 不计入）；`nodata` 不计入正常运行时间。默认为 `STATUS_BAR_STATUSES`。" },
        },
        { name: "label", type: "string", default: `"Status history"`, description: { en: "Accessible name; also the header title fallback.", zh: "无障碍名称；也是标题回退。" } },
        { name: "title", type: "React.ReactNode", description: { en: "Service name in the header row; any node (e.g. name plus a badge). Replaces the HTML `title` tooltip attribute.", zh: "标题行中的服务名称；任意节点（例如名称加徽章）。替换 HTML `title` 提示属性。" } },
        { name: "height", type: "number", default: "36", description: { en: "Bar height in px.", zh: "条形高度，单位为 px。" } },
        { name: "gap", type: "number", default: "3", description: { en: "Gap between bars in px.", zh: "条形间距，单位为 px。" } },
        { name: "showHeader", type: "boolean", default: "true", description: { en: "Show the status dot, title, current status and uptime.", zh: "显示状态点、标题、当前状态和正常运行时间。" } },
        { name: "showLegend", type: "boolean", default: "true", description: { en: "Show counts per status that appears.", zh: "显示出现的每个状态的数量。" } },
        { name: "startLabel", type: "string", default: "`${n} periods ago`", description: { en: "Caption under the left end.", zh: "左端下方的说明。" } },
        { name: "endLabel", type: "string", default: `"Today"`, description: { en: "Caption under the right end.", zh: "右端下方的说明。" } },
        { name: "activeId", type: "string | null", description: { en: "Controlled inspected period.", zh: "受控的检查周期。" } },
        { name: "defaultActiveId", type: "string | null", description: { en: "Initially inspected period.", zh: "初始检查周期。" } },
        { name: "onActiveChange", type: "(id: string | null) => void", description: { en: "Called when the inspected period changes.", zh: "检查周期变化时调用。" } },
      ],
    },
    {
      name: "STATUS_BAR_STATUSES",
      description: { en: "The default `statuses` map. Spread it to add your own: `{ ...STATUS_BAR_STATUSES, partial: { … } }`.", zh: "默认的 `statuses` 映射。展开它以添加你自己的：`{ ...STATUS_BAR_STATUSES, partial: { … } }`。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
