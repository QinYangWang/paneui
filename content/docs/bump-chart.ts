import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { BumpChart } from "@/components/ui/bump-chart"`,
    code: `<BumpChart
  label="Team rankings"
  periods={["Wk 1", "Wk 2", "Wk 3"]}
  series={[
    { id: "a", name: "Lakers", ranks: [2, 1, 1] },
    { id: "b", name: "Celtics", ranks: [1, 2, 3] },
    { id: "c", name: "Knicks", ranks: [3, 3, 2] },
  ]}
/>`,
  },
  examples: [
    {
      id: "pinned",
      title: "Pinned",
      description: "Clicking a line, dot or legend item pins it; `defaultActiveId` pins one on load.",
    },
    {
      id: "gaps",
      title: "Gaps",
      description: "A `null` rank breaks the line, for periods where a series dropped off the ranking.",
    },
    {
      id: "compact",
      title: "Compact",
      description: "Lower `rowHeight` for long rankings, and hide the in-dot numbers and legend with `showRankLabels={false}` and `showLegend={false}`.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "`activeId` and `onActiveChange` let other controls pin a series. Series take a `color` too.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Focus the plot, then `ArrowLeft` / `ArrowRight` move between periods, `ArrowUp` / `ArrowDown` move between ranks, `Enter` or `Space` pins the series under the cursor and `Esc` clears the cursor.",
    },
  ],
  api: [
    {
      name: "BumpChart",
      extends: "div",
      props: [
        {
          name: "series",
          type: "{ id: string; name: string; ranks: (number | null)[]; color?: string }[]",
          required: true,
          description: "One rank per period, 1 = top. `null` leaves a gap.",
        },
        { name: "periods", type: "string[]", required: true, description: "Period labels, oldest first." },
        { name: "label", type: "string", default: `"Rankings over time"`, description: "Accessible name." },
        { name: "rowHeight", type: "number", default: "40", description: "Vertical distance between ranks in px." },
        { name: "activeId", type: "string | null", description: "Controlled pinned series id." },
        { name: "defaultActiveId", type: "string | null", description: "Series pinned on first render." },
        { name: "onActiveChange", type: "(id: string | null) => void", description: "Called when a series is pinned or unpinned." },
        { name: "active", type: "string | null", description: "Deprecated alias of `activeId`." },
        { name: "defaultActive", type: "string | null", description: "Deprecated alias of `defaultActiveId`." },
        { name: "showLegend", type: "boolean", default: "true", description: "Show the legend pills." },
        { name: "showRankLabels", type: "boolean", default: "true", description: "Show the rank number inside each dot." },
      ],
    },
  ],
} satisfies ComponentDoc
