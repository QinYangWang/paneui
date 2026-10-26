import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Lists entries in time order along a line.", "zh": "按时间顺序展示记录。"},
  usage: {
    imports: `import { Timeline, TimelineDescription, TimelineItem, TimelineTitle } from "@/components/ui/timeline"`,
    code: `<Timeline>
  <TimelineItem time="08:00" action={<Button variant="ghost" size="icon-xs" aria-label="Delete"><TrashIcon /></Button>}>
    <TimelineTitle>Morning brief</TimelineTitle>
    <TimelineDescription>Weather, calendar and headlines</TimelineDescription>
  </TimelineItem>
</Timeline>`,
  },
  composition: `Timeline
└── TimelineItem
    ├── TimelineTitle
    └── TimelineDescription`,
  examples: [{ id: "cards", title: { en: "Cards", zh: "卡片" }, description: { en: "Use cards when each entry carries more than two lines.", zh: "适用于每条记录内容较长的时间线。" } }],
  notes: [
    { title: "Time column", body: { en: "The column is 3.5rem wide; set `--timeline-time` on the `Timeline` for longer labels. Leave `time` out on every item to drop the column.", zh: "时间列宽 3.5rem；更长的标签可在 `Timeline` 上设置 `--timeline-time`。若每个条目都省略 `time`，则去掉该列。" } },
    { title: "Hairline", body: { en: "The line starts at the first dot and ends at the last, so a single entry shows a dot alone.", zh: "线条从第一个圆点开始、到最后一个圆点结束，因此只有一个条目时仅显示一个圆点。" } },
  ],
  api: [
    { name: "Timeline", extends: "ol", props: [] },
    {
      name: "TimelineItem",
      extends: "li",
      props: [
        { name: "time", type: "ReactNode", description: { en: "Text in the time column.", zh: "时间列中的文本。" } },
        { name: "timeDetail", type: "ReactNode", description: { en: "Quieter second line under the time, such as a date.", zh: "时间下方更低调的第二行，例如日期。" } },
        { name: "tone", type: `"default" | "primary" | "success" | "warning" | "destructive"`, default: `"default"`, description: { en: "Dot colour; `primary` marks the current or next entry.", zh: "圆点颜色；`primary` 标记当前或下一个条目。" } },
        { name: "action", type: "ReactNode", description: { en: "Trailing control aligned with the first line.", zh: "与第一行对齐的尾部控件。" } },
      ],
      dataAttributes: [{ name: "data-tone", description: { en: "The item's tone.", zh: "条目的色调。" } }],
    },
    { name: "TimelineTitle", extends: "div", props: [] },
    { name: "TimelineDescription", extends: "div", props: [] },
  ],
} satisfies ComponentDoc
