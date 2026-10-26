import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shared helpers for building and styling your own charts.", "zh": "为图表提供通用工具。"},
  usage: {
    imports: `import { chartColor, ChartLegend, ChartLegendItem } from "@/components/ui/chart-utils"`,
    code: `<ChartLegend>
  <ChartLegendItem color={chartColor(0)} value="42%">Rent</ChartLegendItem>
</ChartLegend>`,
  },
  examples: [
    {
      id: "number",
      title: { en: "Chart Number", zh: "图表数值" },
    },
    {
      id: "tooltip",
      title: { en: "Tooltip", zh: "提示" },
    },
    {
      id: "legend",
      title: { en: "Legend", zh: "图例" },
    },
    {
      id: "scales",
      title: { en: "Scales and Ticks", zh: "刻度" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "`useChartTransition`, `ChartNumber` and `ChartTooltip` all become instant under reduced motion.", zh: "减少动态效果时，`useChartTransition`、`ChartNumber` 和 `ChartTooltip` 都变为即时。" },
    },
    {
      title: "Accessibility",
      body: { en: "`ChartNumber` keeps the final value in a screen-reader-only span, `ChartTooltip` is a polite live region, and `ChartDataTable` renders an `sr-only` table mirror of a chart's data.", zh: "`ChartNumber` 把最终值保存在仅屏幕阅读器可见的 span 中，`ChartTooltip` 是 polite 实时区域，`ChartDataTable` 渲染图表数据的 `sr-only` 表格镜像。" },
    },
  ],
  api: [
    {
      name: "ChartNumber",
      description: { en: "Number that springs between values.", zh: "在数值之间做弹簧动画的数字。" },
      extends: "span",
      props: [
        { name: "value", type: "number", required: true, description: { en: "Value to show.", zh: "要显示的值。" } },
        { name: "format", type: "(value: number) => string", default: "formatNumber", description: { en: "Formatter applied to every frame.", zh: "应用于每一帧的格式化函数。" } },
      ],
    },
    {
      name: "ChartTooltip",
      description: { en: "In-chart floating surface that follows a data point. Place it inside a positioned chart container; no portal.", zh: "跟随数据点的图表内浮动层。放在已定位的图表容器内；不使用 portal。" },
      extends: "motion.div",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [
        { name: "x", type: "number", required: true, description: { en: "Anchor x in px, relative to the chart container.", zh: "锚点 x 坐标，单位 px，相对于图表容器。" } },
        { name: "y", type: "number", required: true, description: { en: "Anchor y in px.", zh: "锚点 y 坐标，单位 px。" } },
        { name: "open", type: "boolean", required: true, description: { en: "Show or hide the tooltip.", zh: "显示或隐藏提示。" } },
        { name: "bounds", type: "{ width: number; height: number }", required: true, description: { en: "Container size, used to keep the tooltip inside it.", zh: "容器尺寸，用于让提示保持在容器内。" } },
        { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"top"`, description: { en: "Preferred side.", zh: "首选方向。" } },
        { name: "offset", type: "number", default: "12", description: { en: "Gap from the anchor in px.", zh: "与锚点的间距，单位 px。" } },
        { name: "avoidCollisions", type: "boolean", default: "true", description: { en: "Flip to the opposite side when the preferred side leaves the bounds.", zh: "首选方向超出边界时翻转到相反方向。" } },
      ],
      dataAttributes: [{ name: "data-side", description: { en: "The side actually used after flipping.", zh: "翻转后实际使用的方向。" } }],
    },
    { name: "ChartTooltipTitle", extends: "div", props: [] },
    {
      name: "ChartTooltipRow",
      extends: "div",
      props: [
        { name: "label", type: "ReactNode", required: true, description: { en: "Series name.", zh: "系列名称。" } },
        { name: "value", type: "ReactNode", required: true, description: { en: "Formatted value, right-aligned.", zh: "格式化后的值，右对齐。" } },
        { name: "color", type: "string", description: { en: "Swatch colour before the label.", zh: "标签前的色块。" } },
      ],
    },
    {
      name: "ChartSwatch",
      extends: "span",
      props: [{ name: "color", type: "string", required: true, description: { en: "CSS colour of the swatch.", zh: "色块的 CSS 颜色。" } }],
    },
    { name: "ChartLegend", description: { en: "Wrapping row of legend items.", zh: "可换行的图例项行。" }, extends: "div", props: [] },
    {
      name: "ChartLegendItem",
      description: { en: "Legend entry, rendered as a button.", zh: "图例项，渲染为按钮。" },
      extends: "button",
      props: [
        { name: "color", type: "string", required: true, description: { en: "Series colour.", zh: "系列颜色。" } },
        { name: "inactive", type: "boolean", description: { en: "Dimmed with a hollow swatch (series toggled off).", zh: "变暗并显示空心色块（系列已关闭）。" } },
        { name: "highlighted", type: "boolean", description: { en: "Emphasised because the matching mark is hovered.", zh: "因对应的图形被悬停而强调。" } },
        { name: "value", type: "ReactNode", description: { en: "Optional trailing value (share, count…).", zh: "可选的尾部值（占比、数量……）。" } },
      ],
      dataAttributes: [
        { name: "data-inactive", description: { en: "Present when `inactive`.", zh: "`inactive` 时存在。" } },
        { name: "data-highlighted", description: { en: "Present when `highlighted`.", zh: "`highlighted` 时存在。" } },
      ],
    },
    {
      name: "ChartDataTable",
      description: { en: "Screen-reader-only table mirror of a chart. Takes no other props.", zh: "图表的仅屏幕阅读器可见表格镜像。不接受其他 props。" },
      props: [
        { name: "caption", type: "string", required: true, description: { en: "Table caption.", zh: "表格标题。" } },
        { name: "columns", type: "readonly string[]", required: true, description: { en: "Column headers.", zh: "列标题。" } },
        { name: "rows", type: "readonly (readonly ReactNode[])[]", required: true, description: { en: "Rows; the first cell is the row header.", zh: "行；第一个单元格是行标题。" } },
      ],
    },
    {
      name: "chartColor",
      description: { en: "`chartColor(index)` returns the series colour, `--chart-1…8` first (each falls back to a semantic token), then blends for indexes past eight. `CHART_COLORS` holds the base eight.", zh: "`chartColor(index)` 返回系列颜色，优先使用 `--chart-1…8`（各自回退到语义变量），超过八的索引则进行混合。`CHART_COLORS` 保存基础八色。" },
      props: [{ name: "index", type: "number", required: true, description: { en: "Series index.", zh: "系列索引。" } }],
    },
    {
      name: "chartAlpha",
      description: { en: "`chartAlpha(color, percent)` mixes a colour toward transparent for fills.", zh: "`chartAlpha(color, percent)` 把颜色向透明混合，用于填充。" },
      props: [
        { name: "color", type: "string", required: true, description: { en: "Any CSS colour.", zh: "任意 CSS 颜色。" } },
        { name: "percent", type: "number", required: true, description: { en: "Opacity, 0–100.", zh: "不透明度，0–100。" } },
      ],
    },
    {
      name: "onFill",
      description: { en: "`onFill(fill)` returns a readable label colour for text drawn on that fill, white on dark fills, near-black on light ones (CSS relative colour). Set it as the inline `fill` and keep a `fill-white` class as the fallback for browsers without relative colour. Used by treemap, candlestick and funnel labels.", zh: "`onFill(fill)` 返回在该填充上绘制文字的可读标签颜色，深色填充上为白色，浅色填充上为接近黑色（CSS 相对颜色）。将其设为内联 `fill`，并保留 `fill-white` 类作为不支持相对颜色的浏览器的回退。用于矩形树图、K 线图和漏斗图的标签。" },
      props: [{ name: "fill", type: "string", required: true, description: { en: "The fill colour behind the label (any CSS colour or `var(--token)`).", zh: "标签背后的填充颜色（任意 CSS 颜色或 `var(--token)`）。" } }],
    },
    {
      name: "scaleLinear",
      description: { en: "`scaleLinear(domain, range)` maps values to pixels; the result also has `domain`, `range`, `invert(px)` and `ticks(count = 5)`.", zh: "`scaleLinear(domain, range)` 把值映射为像素；结果还包含 `domain`、`range`、`invert(px)` 和 `ticks(count = 5)`。" },
      props: [
        { name: "domain", type: "readonly [number, number]", required: true, description: { en: "Input extent.", zh: "输入范围。" } },
        { name: "range", type: "readonly [number, number]", required: true, description: { en: "Output extent in px.", zh: "输出范围，单位 px。" } },
      ],
    },
    {
      name: "scaleBand",
      description: { en: "`scaleBand(count, range, padding)` returns the x of band `i`, plus `bandwidth`, `step` and `indexAt(px)`.", zh: "`scaleBand(count, range, padding)` 返回第 `i` 个带的 x，以及 `bandwidth`、`step` 和 `indexAt(px)`。" },
      props: [
        { name: "count", type: "number", required: true, description: { en: "Number of bands.", zh: "带的数量。" } },
        { name: "range", type: "readonly [number, number]", required: true, description: { en: "Output extent in px.", zh: "输出范围，单位 px。" } },
        { name: "padding", type: "number", default: "0.2", description: { en: "Share (0–1) of each step left empty.", zh: "每个步长中留空的比例（0–1）。" } },
      ],
    },
    {
      name: "niceDomain",
      description: { en: "`niceDomain([lo, hi], count = 5)` rounds a domain outward to tidy tick boundaries.", zh: "`niceDomain([lo, hi], count = 5)` 把范围向外取整到整齐的刻度边界。" },
      props: [],
    },
    {
      name: "formatCompact / formatNumber / formatPercent",
      description: { en: "`formatCompact(1284000)` → `1.3M`; `formatNumber` keeps up to 2 decimals; `formatPercent(share, digits = 1)` turns 0.42 into `42.0%`. `clamp(value, min, max)` and `seededRandom(seed)`, for deterministic demo data, are also exported.", zh: "`formatCompact(1284000)` → `1.3M`；`formatNumber` 最多保留 2 位小数；`formatPercent(share, digits = 1)` 把 0.42 变成 `42.0%`。还导出 `clamp(value, min, max)` 和 `seededRandom(seed)`，用于生成确定性的演示数据。" },
      props: [],
    },
    {
      name: "useChartSize",
      description: { en: "`const [ref, size] = useChartSize()` observes an element's content box with ResizeObserver.", zh: "`const [ref, size] = useChartSize()` 用 ResizeObserver 观察元素的内容盒。" },
      props: [{ name: "initial", type: "{ width: number; height: number }", default: "{ width: 0, height: 0 }", description: { en: "Size before the first measure.", zh: "首次测量前的大小。" } }],
    },
    {
      name: "useChartTransition",
      description: { en: "Returns the house chart spring (`CHART_SPRING`), or `{ duration: 0 }` under reduced motion.", zh: "返回内置的图表弹簧（`CHART_SPRING`），减少动态效果时返回 `{ duration: 0 }`。" },
      props: [{ name: "delay", type: "number", default: "0", description: { en: "Delay in seconds.", zh: "延迟，单位秒。" } }],
    },
    {
      name: "useActiveId",
      description: { en: "`const [active, setActive] = useActiveId(value, defaultValue, onChange)` holds the controlled or uncontrolled active id shared by the charts.", zh: "`const [active, setActive] = useActiveId(value, defaultValue, onChange)` 保存各图表共享的受控或非受控活动 id。" },
      props: [
        { name: "controlled", type: "T | null | undefined", description: { en: "Controlled value; `undefined` means uncontrolled.", zh: "受控值；`undefined` 表示非受控。" } },
        { name: "defaultValue", type: "T | null | undefined", description: { en: "Initial value when uncontrolled.", zh: "非受控时的初始值。" } },
        { name: "onChange", type: "(id: T | null) => void", description: { en: "Called on every change.", zh: "每次变化时调用。" } },
      ],
    },
    { name: "useChartId", description: { en: "`useChartId(prefix)` returns a DOM-safe id for SVG defs.", zh: "`useChartId(prefix)` 返回用于 SVG defs 的 DOM 安全 id。" }, props: [] },
    { name: "useHoverCapable", description: { en: "`true` when the device matches `(hover: hover)`, for hover-vs-tap tooltips.", zh: "设备匹配 `(hover: hover)` 时为 `true`，用于区分悬停与点按的提示。" }, props: [] },
  ],
} satisfies ComponentDoc
