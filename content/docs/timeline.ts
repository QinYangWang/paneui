import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
  examples: [{ id: "cards", title: "Cards", description: "Use cards when each entry carries more than two lines." }],
  notes: [
    { title: "Time column", body: "The column is 3.5rem wide; set `--timeline-time` on the `Timeline` for longer labels. Leave `time` out on every item to drop the column." },
    { title: "Hairline", body: "The line starts at the first dot and ends at the last, so a single entry shows a dot alone." },
  ],
  api: [
    { name: "Timeline", extends: "ol", props: [] },
    {
      name: "TimelineItem",
      extends: "li",
      props: [
        { name: "time", type: "ReactNode", description: "Text in the time column." },
        { name: "timeDetail", type: "ReactNode", description: "Quieter second line under the time, such as a date." },
        { name: "tone", type: `"default" | "primary" | "success" | "warning" | "destructive"`, default: `"default"`, description: "Dot colour; `primary` marks the current or next entry." },
        { name: "action", type: "ReactNode", description: "Trailing control aligned with the first line." },
      ],
      dataAttributes: [{ name: "data-tone", description: "The item's tone." }],
    },
    { name: "TimelineTitle", extends: "div", props: [] },
    { name: "TimelineDescription", extends: "div", props: [] },
  ],
} satisfies ComponentDoc
