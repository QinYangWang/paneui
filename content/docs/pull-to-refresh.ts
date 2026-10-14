import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { PullToRefresh } from "@/components/ui/pull-to-refresh"`,
    code: `<PullToRefresh onRefresh={() => fetchInbox()} className="h-80">
  <InboxList />
</PullToRefresh>`,
  },
  examples: [
    {
      id: "custom-labels",
      title: "Labels and Distances",
      description: "Change the copy with `pullingLabel`, `releaseLabel` and `refreshingLabel`, and the feel with `threshold`, `maxPull` and `holdDistance`.",
    },
    {
      id: "external-refreshing",
      title: "External Refreshing",
      description: "Pass `refreshing` to hold the spinner open for a refresh started elsewhere, like a Sync button.",
    },
    {
      id: "status-change",
      title: "Status Changes",
      description: "`onStatusChange` reports `idle`, `pulling`, `ready` and `refreshing` as the gesture moves.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "With `disabled` the gesture is off and the area scrolls normally.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The content follows the pull with rubber-band resistance and springs back after `onRefresh` resolves. With reduced motion it jumps into place and the arrow doesn't rotate.",
    },
    {
      title: "Accessibility",
      body: "The root sets `aria-busy` while refreshing and a polite live region announces `refreshingLabel`. Pull is a touch, pen and mouse gesture only, so give keyboard users another way to refresh.",
    },
  ],
  api: [
    {
      name: "PullToRefresh",
      description: "Scroll container that arms a refresh when pulled down from the top. Give it a height.",
      extends: "div",
      props: [
        { name: "children", type: "ReactNode", required: true, description: "The scrolling content." },
        {
          name: "onRefresh",
          type: "() => void | Promise<void>",
          required: true,
          description: "Runs when the pull is released past `threshold`. Return a promise to keep the spinner until it settles.",
        },
        { name: "refreshing", type: "boolean", description: "Hold the refreshing state for a refresh managed outside the gesture." },
        { name: "disabled", type: "boolean", default: "false", description: "Turn the pull gesture off." },
        { name: "threshold", type: "number", default: "64", description: "Resisted pull distance (px) that arms the refresh." },
        { name: "maxPull", type: "number", default: "120", description: "Ceiling of the resisted pull (px)." },
        { name: "holdDistance", type: "number", default: "56", description: "Content offset (px) while refreshing." },
        { name: "pullingLabel", type: "ReactNode", default: `"Pull to refresh"`, description: "Shown while pulling, before the threshold." },
        { name: "releaseLabel", type: "ReactNode", default: `"Release to refresh"`, description: "Shown once the pull is armed." },
        { name: "refreshingLabel", type: "ReactNode", default: `"Refreshing…"`, description: "Shown and announced while refreshing." },
        {
          name: "onStatusChange",
          type: `(status: "idle" | "pulling" | "ready" | "refreshing") => void`,
          description: "Called whenever the gesture status changes.",
        },
        { name: "contentClassName", type: "string", description: "Classes for the inner scrolling element." },
      ],
      dataAttributes: [
        { name: "data-status", description: "`idle`, `pulling`, `ready` or `refreshing` on the root." },
      ],
    },
  ],
} satisfies ComponentDoc
