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
      description: "Use to match your app's wording or change how far the pull must go.",
    },
    {
      id: "external-refreshing",
      title: "External Refreshing",
      description: "Use when a refresh can also start elsewhere, like a Sync button, and should hold the spinner open.",
    },
    {
      id: "status-change",
      title: "Status Changes",
      description: "Use to drive your own indicator from the gesture.",
    },
    {
      id: "disabled",
      title: "Disabled",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Content springs back once `onRefresh` resolves. With reduced motion it jumps into place and the arrow doesn't rotate.",
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
          description: "Runs when the pull is released past `threshold`. Return a promise to keep the spinner until it settles, or return nothing and set `refreshing` instead.",
        },
        { name: "refreshing", type: "boolean", description: "Hold the refreshing state for a refresh managed outside the gesture. The content stays open until both this and any `onRefresh` promise are done." },
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
